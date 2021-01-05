'use strict';
const User = require('../models/Users.model');
const {encryptToken} = require('../Utils/Encryption');
const Token = require('../models/TokenModel');
const qs = require('qs');
const axios = require('axios');
const jws = require('jws');
const { v4: uuid_V4 } = require('uuid');
const {hashPass,checkPass} = require('../Utils/Password.utils');
const {userLogin,adminLogin} = require('../Utils/LoginChecked.utils');
const jwsSecret = process.env.JWS_SECRET || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWS_DURATION || 2400);
const refreshDuration = parseInt(process.env.REFRESH_DUCATION || 2400);
/* Microsoft azure */
const stateSecretAzure = process.env.AZURE_STATE || 'RANDOMID@@--123'
const stateAzure = Buffer.from(stateSecretAzure).toString('base64')
const redirectUrlAzure = process.env.AZURE_REDIRECT|| "http://localhost:4000/auth/microsoft";
const scopeAzure = "user.read";
const azureIdAzure = process.env.AZURE_ID;
const secretAzure = process.env.AZURE_SECRET;
/* Google Api console */
const accessTypeGG = "online";
const clientIdGG = process.env.GOOGLE_ID;
const responseTypeGG = "code"
const redirectUrlGG = process.env.GOOGLE_REDIRECT || "http://localhost:4000/auth/google";
const scopeGG = "openid profile email";
const stateSecretGG = process.env.AZURE_STATE || 'RANDOMID@@--123'
const stateGG = Buffer.from(stateSecretGG).toString('base64')
const secretGG = process.env.GOOGLE_SECRET;

const redirectMicrosoft = (req, res) => {
	const urlRequestAuthor = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${azureIdAzure}&response_type=code&redirect_uri=${redirectUrlAzure}&response_mode=query&scope=${scopeAzure}&state=${stateAzure}`;
	return res.redirect(urlRequestAuthor)
};
const getDataUserAzure = async (req, res) => {
	const code = req.query.code;
	const urlGetToken = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
	const data = {
		client_id: azureIdAzure,
		scope:scopeAzure,
		code:code,
		redirect_uri: redirectUrlAzure,
		grant_type: "authorization_code",
		client_secret:secretAzure,
		response_mode: "form_post"
	};
	const options1 = {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(data),
		url: urlGetToken,
	};
	try {
		const result1 = await axios(options1);
		const accessTokenAzure = result1.data.access_token;
		const options2 = {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${accessTokenAzure}` },
			url: "https://graph.microsoft.com/v1.0/me",
		};
		const result2 = await axios(options2);
		const countU = await User.countDocuments({ authType: "microsoft", authID: `M_ID${result2.data.id}` });
		console.log("countU", countU);
		if (countU > 0) {
			const user = await User.findOne({ authType: "microsoft", authID: `M_ID${result2.data.id}` });
			const uid = user._id;
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const accessToken = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, iat, exp },
					secret: jwsSecret,
				});
				const uid_token = uuid_V4();
				const refreshToken = encryptToken(uid_token)
				const expCookie = refreshDuration + Date.now();
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					sameSite: "Strict",
				});
				return res.status(201).send({ Access_Token: accessToken,Refresh_Token: refreshToken});
			} else {
				return res.send("Wrong login");
			}
		} else {
			try {
				const newuser = new User({ email: result2.data.userPrincipalName, fullname: result2.data.displayName, authType: 'microsoft', authID: `M_ID${result2.data.id}` });
				const user = await newuser.save();
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const accessToken = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: user._id, iat, exp },
					secret: jwsSecret
				});
				const uidToken = uuid_V4();
				const refreshToken = encryptToken(uidToken)
				const expCookie = refreshDuration + Date.now();
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					sameSite: "Strict",
				});
				const newToken = new Token({ user_uid: user._id, uid_token:uidToken, is_revoke: false, created_At: iat, updated_at: iat });
				await newToken.save();
				return res.status(201).send({ user, Access_Token: accessToken, Refresh_Token: refreshToken});

			} catch (error) {
				return res.send("Username exist")
			}
		}
	} catch (error) {
		console.log(error)
		return res.status(401).send("Azure login fail !!! ")
	}
};

const getRidirectGG = (req, res) => {
	const urlRequestAuthor = `https://accounts.google.com/signin/oauth?access_type=${accessTypeGG}&scope=${scopeGG}&response_type=${responseTypeGG}&client_id=${clientIdGG}&redirect_uri=${redirectUrlGG}&state=${stateGG}`;
	return res.redirect(urlRequestAuthor)
};
const getDataUserGG =async (req, res) => {
	const code = req.query.code;
	const urlGetToken = "https://oauth2.googleapis.com/token";
	const data = {
		client_id: clientIdGG,
		code: code,
		redirect_uri: redirectUrlGG,
		grant_type: "authorization_code",
		client_secret: secretGG,
		state: stateGG
	};

	const options1 = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: data,
		url: urlGetToken,
	};
	try {
		const result1 = await axios(options1);
		const options2 = {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${result1.data.access_token}` }, //id_token
			url: "https://www.googleapis.com/oauth2/v3/userinfo",
		};
		const dataUser = await axios(options2);
		const countU = await User.countDocuments({ authType: "google", authID: `GG_ID${dataUser.data.sub}` });
		if (countU > 0) {
			const user = await User.findOne({ authType: "google", authID: `GG_ID${dataUser.data.sub}` });
			const uid = user._id;
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const access_Token = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, iat, exp },
					secret: jwsSecret,
				});
				const uid_token = uuid_V4();
				const refreshToken = encryptToken(uid_token)
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
				const newuser = new User({ email: dataUser.data.email, fullname: dataUser.data.name,avatar: dataUser.data.picture, authType: 'google', authID: `GG_ID${dataUser.data.sub}` });
				const user = await newuser.save();
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const accessToken = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: user._id, iat, exp },
					secret: jwsSecret
				});
				const uid_token = uuid_V4();
				const refreshToken = encryptToken(uid_token)
				const expCookie = refreshDuration + Date.now();
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					sameSite: "Strict",
				});
				const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
				await newToken.save();
				return res.status(201).send({ user, Access_Token: accessToken, Refresh_Token: refreshToken});

			} catch (error) {
				return res.send("Username exist")
			}
		}
	} catch (error) {
		console.log(error)
		return res.status(401).send("Login Error")
	}
}

const adminLoginAuth = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const uid = await adminLogin(username, password);
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const access_Token = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, roles: "admin", iat, exp },
					secret: jwsSecret,
				});
				const expCookie = refreshDuration + Date.now();
				const uid_token = uuid_V4();
				const refreshToken = encryptToken(uid_token)
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					// secure: true,
					sameSite: "Strict",
				});
				return res.send({ access_Token: access_Token });
			} else {
				return res.send("Wrong username or password");
			}
		}
	} catch (error) {
		console.log(error)
		return res.send("Login Fail !");
	}
};
const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const uid = await userLogin(username, password);
			console.log(uid)
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const accessToken = jws.sign({
					header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
					payload: { uid: uid, iat, exp },
					secret: jwsSecret,
				});
				const uid_token = uuid_V4();
				const refreshToken = encryptToken(uid_token)
				const expCookie = refreshDuration + Date.now();
				res.cookie("Refresh-token", refreshToken, {
					maxAge: expCookie,
					httpOnly: true,
					sameSite: "Strict",
				});
				return res.send({ Access_Token: accessToken });
			} else {
				return res.send("Wrong username or password");
			}
		}
	} catch (error) {
		console.log(error)
		return res.send("Login Fail !");
	}
};

const register = async (req, res) => {
	if (req.body.username && req.body.username && req.body.email && req.body.phone) {
		const { username, password, email, phone } = req.body;
		try {
			const hashPassword = await hashPass(password)
			const newuser = new User({ username, password: hashPassword, email, phone });
			const user = await newuser.save();
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const accessToken = jws.sign({
				header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
				payload: { uid: user._id, iat, exp },
				secret: jwsSecret
			});
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			const expCookie = refreshDuration + Date.now();
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
			await newToken.save();
			return res.status(201).send({ user, Access_Token: accessToken, Refresh_Token: refreshToken, uid_token: uid_token });

		} catch (error) {
			console.log(error)
			return res.send("Username exist")
		}

	} else {
		return res.send("Username or password empty !");
	}
};

module.exports = {
	redirectMicrosoft,
	getDataUserAzure,
	getRidirectGG,
	getDataUserGG,
	adminLoginAuth,
	login,
	register,
}