'use strict';
require('dotenv').config();
const User = require('../models/Users.model');
const Admin = require('../models/Admin.model');
const Encryption = require('../Utils/encryption');
const Token = require('../models/TokenModel');
const qs = require('qs');
const axios = require('axios');
const jws = require('jws');
const { v4: uuid_V4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT || '12');
const secretAccessKey = process.env.JWS_ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWS_DURATION || 2400);
const refreshDuration = parseInt(process.env.REFRESH_DUCATION || 2400);
/* Microsoft azure */
const processState = process.env.GOOGLE_STATE || 'RANDOMID@@--123'
const state = Buffer.from(processState).toString('base64')
const redirect_url = "http://localhost:4000/auth/microsoft";
const scope = "user.read";
const client_id = process.env.AZURE_CLIENT_ID;
const client_secret = process.env.AZURE_CLIENT_SECRET;
/* Google Api console */
const access_type_gg = "online"
const client_id_gg = process.env.GOOGLE_CLIENT_ID;
const response_type_gg = "code"
const redirect_uri_gg = "http://localhost:4000/auth/google";
const scope_gg = "openid profile email";
const processStateGG = process.env.AZURE_STATE || 'RANDOMID@@--123'
const state_gg = Buffer.from(processStateGG).toString('base64')
const client_secret_gg = process.env.GOOGLE_CLIENT_SECRET;

/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
async function checkLogin(username, password) {
	try {
		const user = await User.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if (check === true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}
/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
async function AdminLogin(username, password) {
	try {
		const user = await Admin.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if (check === true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}
exports.redirectMicrosoft = (req, res) => {
	console.log("**********Login Microsoft**********")
	console.log(state)
	const urlRequestAuthor = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_url}&response_mode=query&scope=${scope}&state=${state}`;
	return res.redirect(urlRequestAuthor)
};
exports.getDataUser = (req, res) => {
	const code = req.query.code
	console.log("code: ", code)
	const url_getToken = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
	console.log("url_getToken : ", typeof url_getToken)
	const data = {
		client_id: client_id,
		scope,
		code,
		redirect_uri: redirect_url,
		grant_type: "authorization_code",
		client_secret,
		response_mode: "form_post"
	};
	const options = {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(data),
		url: url_getToken,
	};
	try {
		axios(options)
			.then(function (response) {
				console.log("2.Data", response.data);
				const options = {
					method: 'GET',
					headers: { 'Authorization': `Bearer ${response.data.access_token}` },
					url: "https://graph.microsoft.com/v1.0/me",
				};
				try {
					axios(options)
						.then(async function (resp) {
							console.log("2.Data User ", resp.data);
							const countU = await User.countDocuments({ authType: "microsoft", authID: `M_ID${resp.data.id}` });
							console.log("countU", countU);
							if (countU > 0) {
								const user = await User.findOne({ authType: "microsoft", authID: `M_ID${resp.data.id}` });
								const uid = user._id;
								console.log(user)
								if (uid) {
									const iat = Math.floor(new Date() / 1000);
									const exp = iat + duration;
									const access_Token = jws.sign({
										header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
										payload: { uid: uid, iat, exp },
										secret: secretAccessKey,
									});
									const uid_token = uuid_V4();
									const refreshToken = Encryption.encryptoken(uid_token)
									const expCookie = refreshDuration + Date.now();
									res.cookie("Refresh-token", refreshToken, {
										maxAge: expCookie,
										httpOnly: true,
										sameSite: "Strict",
									});
									return res.send({ Access_Token: access_Token });
								} else {
									return res.send("Wrong login");
								}
							} else {
								try {
									const newuser = new User({ email: resp.data.userPrincipalName, fullname: resp.data.displayName, authType: 'microsoft', authID: `M_ID${resp.data.id}` });
									const user = await newuser.save();
									console.log(user);
									const iat = Math.floor(new Date() / 1000);
									const exp = iat + duration;
									const access_Token = jws.sign({
										header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
										payload: { uid: user._id, iat, exp },
										secret: secretAccessKey
									});
									const uid_token = uuid_V4();
									const refresh_token = Encryption.encryptoken(uid_token)
									const expCookie = refreshDuration + Date.now();
									res.cookie("Refresh-token", refresh_token, {
										maxAge: expCookie,
										httpOnly: true,
										sameSite: "Strict",
									});
									const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
									await newToken.save();
									return res.status(201).send({ user, Access_Token: access_Token, Refresh_Token: refresh_token, uid_token: uid_token });

								} catch (error) {
									console.log(error)
									return res.send("Username exist")
								}
							}
						});
				} catch (error) {
					console.log("POST FORM DATA Eroor");
					return res.status(401).send(error)
				}
			})
			.catch(function (error) {
				console.log("error");
			});
	} catch (error) {
		console.log("POST FORM DATA Eroor");
		return res.status(401).send(error)
	}
};

exports.getRidirectGG = (req, res) => {
	console.log(state)
	const urlRequestAuthor = `https://accounts.google.com/signin/oauth?access_type=${access_type_gg}&scope=${scope_gg}&response_type=${response_type_gg}&client_id=${client_id_gg}&redirect_uri=${redirect_uri_gg}&state=${state_gg}`;
	return res.redirect(urlRequestAuthor)
};

exports.getDataUser_GG = (req, res) => {
	const code = req.query.code
	console.log("code google: ", code)
	const url_getToken = "https://oauth2.googleapis.com/token";
	const data = {
		client_id: client_id_gg,
		code: code,
		redirect_uri: redirect_uri_gg,
		grant_type: "authorization_code",
		client_secret: client_secret_gg,
		state: state_gg
	};

	console.log("DATA:", data)
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: data,
		url: url_getToken,
	};
	try {
		console.log("Before : POst")
		axios(options)
			.then(function (response) {
				// console.log("2.Data", response.data);
				const options = {
					method: 'GET',
					headers: { 'Authorization': `Bearer ${response.data.access_token}` }, //id_token
					url: "https://www.googleapis.com/oauth2/v3/userinfo",
				};
				try {
					axios(options)
						.then(async function (resp) {
							console.log("2.Data User ", resp.data);
							const countU = await User.countDocuments({ authType: "google", authID: `GG_ID${resp.data.sub}` });
							console.log("countU", countU);
							if (countU > 0) {
								const user = await User.findOne({ authType: "google", authID: `GG_ID${resp.data.sub}` });
								const uid = user._id;
								console.log(uid)
								console.log(user)
								if (uid) {
									const iat = Math.floor(new Date() / 1000);
									const exp = iat + duration;
									const access_Token = jws.sign({
										header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
										payload: { uid: uid, iat, exp },
										secret: secretAccessKey,
									});
									const uid_token = uuid_V4();
									const refreshToken = Encryption.encryptoken(uid_token)
									const expCookie = refreshDuration + Date.now();
									res.cookie("Refresh-token", refreshToken, {
										maxAge: expCookie,
										httpOnly: true,
										sameSite: "Strict",
									});
									return res.send({ Access_Token: access_Token });
								} else {
									return res.send("Wrong login");
								}
							} else {
								try {
									const newuser = new User({ email: resp.data.email, fullname: resp.data.name,avatar: resp.data.picture, authType: 'google', authID: `GG_ID${resp.data.sub}` });
									const user = await newuser.save();
									console.log(user);
									const iat = Math.floor(new Date() / 1000);
									const exp = iat + duration;
									const access_Token = jws.sign({
										header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
										payload: { uid: user._id, iat, exp },
										secret: secretAccessKey
									});
									const uid_token = uuid_V4();
									const refresh_token = Encryption.encryptoken(uid_token)
									const expCookie = refreshDuration + Date.now();
									res.cookie("Refresh-token", refresh_token, {
										maxAge: expCookie,
										httpOnly: true,
										sameSite: "Strict",
									});
									const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
									await newToken.save();
									return res.status(201).send({ user, Access_Token: access_Token, Refresh_Token: refresh_token, uid_token: uid_token });

								} catch (error) {
									console.log(error)
									return res.send("Username exist")
								}
							}
						});
				} catch (error) {
					console.log("POST FORM DATA Eroor");
					return res.status(401).send(error)
				}
			})
	} catch (error) {
		console.log("POST FORM DATA Eroor");
		return res.status(401).send(error)
	}
}

exports.adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const uid = await AdminLogin(username, password);
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const access_Token = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, roles: "admin", iat, exp },
					secret: secretAccessKey,
				});
				const expCookie = refreshDuration + Date.now();
				console.log(expCookie)
				const uid_token = uuid_V4();
				const refreshToken = Encryption.encryptoken(uid_token)
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					// secure: true,
					sameSite: "Strict",
				});
				console.log('Access_Token', access_Token);
				return res.send({ access_Token: access_Token });
			} else {
				return res.send("Wrong username or password");
			}
		}
	} catch (error) {
		return res.send("Login Fail !");
	}
};
exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		console.log(req.body)
		if (username && password) {
			const uid = await checkLogin(username, password);
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const access_Token = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, iat, exp },
					secret: secretAccessKey,
				});
				const uid_token = uuid_V4();
				const refreshToken = Encryption.encryptoken(uid_token)
				const expCookie = refreshDuration + Date.now();
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					sameSite: "Strict",
				});
				return res.send({ Access_Token: access_Token });
			} else {
				return res.send("Wrong username or password");
			}
		}
	} catch (error) {
		return res.send("Login Fail !");
	}
};

exports.register = async (req, res) => {
	if (req.body.username && req.body.username && req.body.email && req.body.phone) {
		const { username, password, email, phone } = req.body;
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hashPassword = await bcrypt.hash(password, salt);
			const newuser = new User({ username, password: hashPassword, email, phone });
			const user = await newuser.save();
			console.log("user");
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const access_Token = jws.sign({
				header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
				payload: { uid: user._id, iat, exp },
				secret: secretAccessKey
			});
			const uid_token = uuid_V4();
			const refresh_token = Encryption.encryptoken(uid_token)
			const expCookie = refreshDuration + Date.now();
			res.cookie("Refresh-token", refresh_token, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
			await newToken.save();
			return res.status(201).send({ user, Access_Token: access_Token, Refresh_Token: refresh_token, uid_token: uid_token });

		} catch (error) {
			console.log(error)
			return res.send("Username exist")
		}

	} else {
		return res.send("Username or password empty !");
	}
};