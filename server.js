require('dotenv').config();
const port = process.env.PORT || 2000;
const express = require('express');
const bodyParser = require('body-parser');
const dbMongoConnect = require('./models/db.connect')
const Routes = require('./routes');
const jws = require("jws")
const app = express();
dbMongoConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const secretAccessKey = process.env.JWS_ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
app.use('/', express.static('public'));
app.use('/',(req,res,next)=>{
    const path = req.path.split("/");
	if(path[1]=='auth' || req.path=='/' || (path[1]=='products'&&path[2]=='list') ){
		return next();
    }
    const accessToken = req.header('Access_Token');
    if(!accessToken) return res.status(401).send('Access token Denis !')
    try {
        const alg = process.env.ALG || 'HS256'
        const verified = jws.verify(accessToken,alg,secretAccessKey);
        console.log("verified : ",verified);
        if(verified){
            const jwsData = jws.decode(accessToken);
            const roles = jwsData.payload.roles;
            console.log("roles :",roles)
            console.log("Path: ",req.path)
            if(roles===undefined || roles==="" || roles===null){
                if(path[2]=='account' || path[1]=='orders' || (path[1]=='products'&&path[2]!='list')){
                    console.log("Path[2]:",path[2])
                    console.log("This is user")
                    return next();
                }else{
                    return res.status(401).send("What do you want !");
                }
            }else if(roles==="admin"){
                    console.log("This is Admin")
                    return next();
            }else{
                return res.status(404).send("Not found !");
            }
        }else{
            return res.status(401).send({
                code: "E_INVALID_JWT_ACCESS_TOKEN",
                message: `Invalid access token ${accessToken}`
            });
        }
    } catch (error) {
        return res.status(401).send('Invalid Token')
    }
    
});

Routes(app);

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
