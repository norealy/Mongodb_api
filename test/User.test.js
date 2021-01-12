
let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Users ********************', async function () {
    describe('+ Users list', function () {
        it('List Users is array data', function (done) {
            chai.request(server)
                .get('/users/list')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMDc2MDIxLCJleHAiOjE2MTAwNzk2MjF9.JpN5cC_ejGPZdkCx1c5uYahXe8yN-ttCdGGVAWvKjbs" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('List Users miss Access Token', function (done) {
            chai.request(server)
                .get('/users/list')
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
    describe('+ Show Users by ID', function () {
        it('Show Users by ID', function (done) {
            chai.request(server)
                .get('/users/list/5fe9f08ba3d822183d34d4a9')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Show Users by ID False', function (done) {
            chai.request(server)
                .get('/users/list/5fe9f08ba3d822183d34d4')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Show Users by ID with access token user not Users', function (done) {
            chai.request(server)
                .get('/users/list/5fe9f08ba3d822183d34d4a9')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Users Change password', function () {
        it('Users Change password true', function (done) {
            chai.request(server)
                .patch('/users/account/change-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmZkMjRhMmVjODQyNzQ4Njk3ZGU1Y2QiLCJpYXQiOjE2MTA0MjU1MDYsImV4cCI6MTYxMDQyOTEwNn0.Q22Y3etjv5ZZ0se_5ZywDuq2cVYhjgcefR6qIHzvfTM" })
                .send({
                    "password": "Password328",
                    "newPassword": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change password not token', function (done) {
            chai.request(server)
                .patch('/users/account/change-password')
                .send({
                    "password": "Password328",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change password does not exits', function (done) {
            chai.request(server)
                .patch('/users/account/change-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "password": "Password328",
                    "newPassword": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change password miss old password', function (done) {
            chai.request(server)
                .patch('/users/account/change-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "newPassword": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change password miss new password', function (done) {
            chai.request(server)
                .patch('/users/account/change-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "password": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Users Change Info', function () {
        it('Users Change info true', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I" })
                .send({
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change info miss access token', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .send({
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change info access token not Users', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0P" })
                .send({
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change info miss access token', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .send({
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change info miss full name', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I" })
                .send({
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users Change info miss phone number', function (done) {
            chai.request(server)
                .put('/users/account/update-info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I" })
                .send({
                    "avatar": "image path",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Users delete by ID', function () {
        it('Users delete by ID true', function (done) {
            chai.request(server)
                .delete('/users/delete-id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "id": "5ffc84a4515f933f6b2a756a"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users delete by ID user not Users', function (done) {
            chai.request(server)
                .delete('/users/delete-id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "id": "5fea2a46474dd34da20aa3f5"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users delete by ID does not exist', function (done) {
            chai.request(server)
                .delete('/users/delete-id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "id": "5fea2a46474dd34da20aa3"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Users delete by username', function () {
        it('Users delete by username true', function (done) {
            chai.request(server)
                .delete('/users/delete-username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "username": "ccadsa123"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users delete by username user not Admin', function (done) {
            chai.request(server)
                .delete('/users/delete-username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAxMTQ5MTgsImV4cCI6MTYxMDExODUxOH0.oDZvQxjReitwEnM0ypKjuM-cmzci5jrNWmpvkN7l14E" })
                .send({
                    "username": "nrx51"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users delete by username does not exist', function (done) {
            chai.request(server)
                .delete('/users/delete-username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "username": "userX1"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
    describe('+ Users Forget password', function () {
        it('Users Forget password true', function (done) {
            chai.request(server)
                .patch('/auth/forget-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "username": "ccadsa123",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302626",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users forget password username does not exist', function (done) {
            chai.request(server)
                .patch('/auth/forget-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "username": "ccad11",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302626",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Users forget password miss usernmae', function (done) {
            chai.request(server)
                .patch('/auth/forget-password')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTUyMDcyLCJleHAiOjE2MDk5NTU2NzJ9.NvsoD67o2E42gtZnEYY2XlRGHwWACZ3vTrg54OLxEOo" })
                .send({
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302626",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
});
