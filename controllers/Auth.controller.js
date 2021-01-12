'use strict';
const ENV = require('../utils/Env');
const User = require('../models/Users.model');
const { encryptToken } = require('../utils/Encryption');
const Token = require('../models/TokenModel');
const qs = require('qs');
const axios = require('axios');
const jws = require('jws');
const { v4: uuid_V4 } = require('uuid');
const { hashPass } = require('../utils/Password');
const { userLogin, adminLogin } = require('../utils/LoginChecked');
const jwsSecret = ENV.get("JWS_SECRET",'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=');
const duration = parseInt(ENV.get("JWS_DURATION", '2400'));
const refreshDuration = parseInt(ENV.get("REFRESH_DUCATION",'2400'));
/* Microsoft azure */
const stateSecretAzure =  ENV.get("AZURE_STATE", 'RANDOMID@@--123');
const stateAzure = Buffer.from(stateSecretAzure).toString('base64')
const redirectUrlAzure =  ENV.get("AZURE_REDIRECT", "http://localhost:4000/auth/microsoft");
const scopeAzure = "user.read";
const azureIdAzure =  ENV.get("AZURE_ID");
const secretAzure =  ENV.get("AZURE_SECRET");
/* Google Api console */
const clientIdGG =  ENV.get("GOOGLE_ID");
const redirectUrlGG =  ENV.get("GOOGLE_REDIRECT","http://localhost:4000/auth/google");
const secretGG =  ENV.get("GOOGLE_SECRET");
const stateSecretGG =  ENV.get( "GOOGLE_STATE",'RANDOMID@@--123' )
const stateGG = Buffer.from(stateSecretGG).toString('base64');
const scopeGG = "openid profile email";
const responseTypeGG = "code";
const accessTypeGG = "online";
const ALG = ENV.get('JWS_ALG','HS256')

const redirectMicrosoft = (req, res) => {
	try {
		const urlRequestAuthor = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${azureIdAzure}&response_type=code&redirect_uri=${redirectUrlAzure}&response_mode=query&scope=${scopeAzure}&state=${stateAzure}`;
		return res.status(301).redirect(urlRequestAuthor)
	} catch (error) {
		return res.status(401).send("Redirect Fail")
	}
};
const getDataUserAzure = async (req, res) => {
	const code = req.query.code;
	const urlGetToken = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
	const data = {
		client_id: azureIdAzure,
		scope: scopeAzure,
		code: code,
		redirect_uri: redirectUrlAzure,
		grant_type: "authorization_code",
		client_secret: secretAzure,
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
			if (!uid) return res.status(401).send("Azure login fail !!! ")
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const accessToken = jws.sign({
				header: { alg: ALG, typ: 'JWT' },
				payload: { uid: uid, iat, exp },
				secret: jwsSecret,
			});
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			const expCookie = refreshDuration + Math.floor(new Date() / 1000);
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			return res.status(200).send({ Access_Token: accessToken, refreshToken: refreshToken });
		} else {

			const newuser = new User({ email: result2.data.userPrincipalName, fullname: result2.data.displayName, authType: 'microsoft', authID: `M_ID${result2.data.id}` });
			const user = await newuser.save();
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const accessToken = jws.sign({
				header: { alg: ALG, typ: 'JWT' },
				payload: { uid: user._id, iat, exp },
				secret: jwsSecret
			});
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			const expCookie = refreshDuration + Math.floor(new Date() / 1000);
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			const newToken = new Token({ user_uid: user._id, uid_token: uid_token, is_revoke: false, created_At: iat, updated_at: iat });
			await newToken.save();
			return res.status(200).send({  Access_Token: accessToken, Refresh_Token: refreshToken });
		}
	} catch (error) {
		return res.status(401).send("Azure login fail !!! ")
	}
};

const getRidirectGG = (req, res) => {
	try {
		const urlRequestAuthor = `https://accounts.google.com/signin/oauth?access_type=${accessTypeGG}&scope=${scopeGG}&response_type=${responseTypeGG}&client_id=${clientIdGG}&redirect_uri=${redirectUrlGG}&state=${stateGG}`;
		return res.status(301).redirect(urlRequestAuthor)
	} catch (error) {
		return res.status(401).send("Redirect Fail")
	}
};
const getDataUserGG = async (req, res) => {
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
			if (!uid) return res.status(401).send("Wrong login");
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const access_Token = jws.sign({
				header: { alg: ALG , typ: 'JWT' },
				payload: { uid: uid, iat, exp },
				secret: jwsSecret,
			});
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			const expCookie = refreshDuration + Math.floor(new Date() / 1000);
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			return res.status(200).send({ Access_Token: access_Token, refreshToken: refreshToken });
		} else {
			const newuser = new User({ email: dataUser.data.email, fullname: dataUser.data.name, avatar: dataUser.data.picture, authType: 'google', authID: `GG_ID${dataUser.data.sub}` });
			const user = await newuser.save();
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const accessToken = jws.sign({
				header: { alg: ALG , typ: 'JWT' },
				payload: { uid: user._id, iat, exp },
				secret: jwsSecret
			});
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			const expCookie = refreshDuration + Math.floor(new Date() / 1000);
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				sameSite: "Strict",
			});
			const newToken = new Token({ user_uid: user._id, uid_token: uid_token, is_revoke: false, created_At: iat, updated_at: iat });
			await newToken.save();
			return res.status(200).send({ Access_Token: accessToken, refreshToken: refreshToken });
		}
	} catch (error) {
		return res.status(401).send("Login Error")
	}
}

const adminLoginAuth = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username && password) {
			const uid = await adminLogin(username, password);
			if (!uid) return res.status(401).send("Login Fail !")
			const iat = Math.floor(new Date() / 1000);
			const exp = iat + duration;
			const accessToken = jws.sign({
				header: { alg: ALG , typ: 'JWT' },
				payload: { uid: uid, roles: "admin", iat, exp },
				secret: jwsSecret,
			});
			const expCookie = refreshDuration + Math.floor(new Date() / 1000);
			const uid_token = uuid_V4();
			const refreshToken = encryptToken(uid_token)
			res.cookie("Refresh-token", refreshToken, {
				maxAge: expCookie,
				httpOnly: true,
				secure: true,
				sameSite: "Strict",
			});
			const newToken = new Token({ user_uid: uid, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
			await newToken.save();
			return res.status(200).send({ access_Token: accessToken, refreshToken: refreshToken });
		}
	} catch (error) {
		return res.status(401).send("Login Fail !");
	}
};
const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const uid = await userLogin(username, password);
		if (!uid) return res.status(401).send("Login Fail !");
		const iat = Math.floor(new Date() / 1000);
		const exp = iat + duration;
		const accessToken = jws.sign({
			header: { alg: ALG || 'HS256', typ: 'JWT' },
			payload: { uid: uid, iat, exp },
			secret: jwsSecret,
		});
		const uid_token = uuid_V4();
		const refreshToken = encryptToken(uid_token)
		const expCookie = refreshDuration + Math.floor(new Date() / 1000);
		res.cookie("Refresh-token", refreshToken, {
			maxAge: expCookie,
			httpOnly: true,
			sameSite: "Strict",
		});
		const newToken = new Token({ user_uid: uid, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
		await newToken.save();
		return res.status(200).send({ Access_Token: accessToken, refreshToken: refreshToken });
	} catch (error) {
		return res.status(401).send("Login Fail !");
	}
};

const register = async (req, res) => {
	try {
		const { username, password, email, phone } = req.body;
		const countUsername = await User.countDocuments({"username":username});
		if(countUsername>0){
			return res.status(401).send("Username exist");
		}
		const hashPassword = await hashPass(password)
		const newuser = new User({ username, password: hashPassword, email, phone });
		const user = await newuser.save();
		let copyuser = Object.assign({},user._doc)
		delete copyuser.password;
		const iat = Math.floor(new Date() / 1000);
		const exp = iat + duration;
		const accessToken = jws.sign({
			header: { alg:ALG || 'HS256', typ: 'JWT' },
			payload: { uid: user._id, iat, exp },
			secret: jwsSecret
		});
		const uid_token = uuid_V4();
		const refreshToken = encryptToken(uid_token)
		const expCookie = refreshDuration + Math.floor(new Date() / 1000);
		res.cookie("Refresh-token", refreshToken, {
			maxAge: expCookie,
			httpOnly: true,
			sameSite: "Strict",
		});
		const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
		await newToken.save();
		return res.status(200).send({ user:copyuser, Access_Token: accessToken, refreshToken: refreshToken, uid_token: uid_token });
	} catch (error) {
		return res.status(401).send("Register Fail !")
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