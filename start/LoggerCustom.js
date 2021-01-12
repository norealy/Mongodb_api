
const log = (startProcess, req, res, errorMessage, body) => {
    const { method, path, headers, httpVersion } = req;
    let processTime = new Date() - startProcess;
    const { statusCode } = res;
    console.log(`${startProcess} ${method} ${statusCode} ${path} ${httpVersion} ${processTime}`);
    console.log('Request header : ', headers);
    console.log('Error mesage : ', errorMessage);
}

const logger = (req, res, next) => {
    const startProcess = new Date();

    let errorMessage = null;
    let body = [];

    //================= Handle Request ================
    const reqError = error => { errorMessage = error.messages };
    const reqData = chunk => body.push(chunk);
    const reqEnd = () => body = Buffer.concat(body).toString();
    req.on('data', reqData)
    req.on('end', reqEnd);
    req.on('error', reqError);

    //================= Handle Response ================
    const resError = error => {
        log(startProcess, req, res, error.messages, body);
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