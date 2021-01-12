const fs = require('fs');
const pathLib = require('path');
const log = (startProcess, req, res, errorMessage, body) => {
    const { method, path, headers, httpVersion } = req;
    let processTime = new Date() - startProcess;
    const { statusCode } = res;
    let logmessage = `${startProcess} ${method} ${statusCode} ${path} ${httpVersion} ${processTime}
    Request header :  ${JSON.stringify(headers)}
    Mesage :  ${errorMessage} \n `;
    if((path === '/login'||path === '/admin/login') && statusCode ===200  && method =='POST'  ){
        fs.appendFile(pathLib.resolve(__dirname,'..','log','Info.log'), logmessage, (err) => {
            if (err) throw err;
        });
    }
    else if((path === '/microsoft'||path === '/google') && statusCode ===200  && method =='GET'  ){
        fs.appendFile(pathLib.resolve(__dirname,'..','log','Info.log'), logmessage, (err) => {
            if (err) throw err;
        });
    }
    else if( statusCode >=500){
        fs.appendFile(pathLib.resolve(__dirname,'..','log','5xxError.log'), logmessage, (err) => {
            if (err) throw err;
        });
    }
    else if( statusCode >=400 && path !== '/favicon.ico'){
        fs.appendFile(pathLib.resolve(__dirname,'..','log','4xxError.log'), logmessage, (err) => {
            if (err) throw err;
        });
    }
}

const logger = (req, res, next) => {
    const startProcess = new Date();

    let errorMessage = null;
    let body = [];

    //================= Handle Request ================
    const reqError = error => { errorMessage = error };
    const reqData = chunk => body.push(chunk);
    const reqEnd = () => body = Buffer.concat(body).toString();
    req.on('data', reqData)
    req.on('end', reqEnd);
    req.on('error', reqError);

    //================= Handle Response ================
    const resError = error => {
        log(startProcess, req, res,error.messages, body);
        removeHandle();
    };
    const resClose = () => {
        log(startProcess, req, res, "Client cancel", body);
        removeHandle();
    };
    const resFinish = () => {
        log(startProcess, req, res, errorMessage, body);
        removeHandle();
    };
    //====================================================
    res.on('close', resClose)
    res.on('error', resError);
    res.on('finish', resFinish);

    const removeHandle = () => {
        req.off('data', reqData);
        req.off('end', reqEnd);
        req.off('error', reqError);

        res.off('close', resClose);
        res.off('error', resError);
        res.off('finish', resFinish);
    }
    next();
}

module.exports = function (app) {
    app.use(logger);
}