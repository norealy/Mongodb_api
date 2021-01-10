function Logger(app) {
    app.use('/',(req, res) => {
        // method + path,status code, error mesage, process time,headers,
        let processTime = new Date();
        // const { status, headers } = res;
        // const { ip, method, route } = req;
        console.log(processTime)
        const connect = ((req)=>{})
        process.on('connection', () => {

            console.log(req,"processTime",processTime)
        });
        process.on('error', () => {

            console.log(res)
        });
        process.on('close', () => {

            console.log(res)
        });
        process.on('exit', () => {

            console.log(res,"processTime",processTime)
        });
    })
}

module.exports = {
    Logger
}