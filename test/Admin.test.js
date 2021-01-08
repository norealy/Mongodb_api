process.env.NODE_ENV = 'development';


let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
describe('******************** Admin ********************',async function () {
    await new Promise(r => setTimeout(r, 25000));
    describe('+ Admin list', function () {
        it('List Admin is array data', function (done) {
            chai.request(server)
                .get('/manager-admin/list')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('List Admin miss Access Token', function (done) {
            chai.request(server)
                .get('/manager-admin/list')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
    describe('+ Show Admin by ID', function () {
        it('Show admin by ID', function (done) {
            chai.request(server)
                .get('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Show admin by ID False', function (done) {
            chai.request(server)
                .get('/manager-admin/list/5fecec28833e1a3d84f4b7')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Show admin by ID with access token user not Admin', function (done) {
            chai.request(server)
                .get('/manager-admin/list/5fecec28833e1a3d84f4b7')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Add Admin', function () {
        it('Add Admin true', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin1122",
                    "password":"Password328",
                    "email":"xdatgd@gmail.com",
                    "phone":"0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin exits username', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin1122",
                    "password":"Password328",
                    "email":"xdatgd@gmail.com",
                    "phone":"0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss username', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "password":"Password328",
                    "email":"xdatgd@gmail.com",
                    "phone":"0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss password', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin1122",
                    "email":"xdatgd@gmail.com",
                    "phone":"0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss email', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin1122",
                    "password":"Password328",
                    "phone":"0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss phone username', function (done) {
            chai.request(server)
                .post('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin1122",
                    "password":"Password328",
                    "email":"xdatgd@gmail.com",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Admin Change password', function () {
        it('Admin Change password true', function (done) {
            chai.request(server)
                .patch('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5ff6123a0fb22a234101bbe0",
                    "password": "Password328",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss id', function (done) {
            chai.request(server)
                .patch('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "password": "Password328",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change id does not exits', function (done) {
            chai.request(server)
                .patch('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5ff6123a0fb22a23410",
                    "password": "Password328",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss old password', function (done) {
            chai.request(server)
                .patch('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5ff6123a0fb22a234101bbe0",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss new password', function (done) {
            chai.request(server)
                .patch('/manager-admin/list/5feceb88fba6023cc59684c3')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5ff6123a0fb22a234101bbe0",
                    "password": "Password328",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Admin Change Info', function () {
        it('Admin Change info true', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id": "5feceb88fba6023cc59684c3",
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin Change info miss access token', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .send({
                    "id": "5feceb88fba6023cc59684c3",
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin Change info access token not admin', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "id": "5feceb88fba6023cc59684c3",
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin Change info miss id', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "fullname": "Nguyen Van Datttt",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin Change info miss full name', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id": "5feceb88fba6023cc59684c3",
                    "avatar": "image path",
                    "phone": "03323026666",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin Change info miss phone number', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id": "5feceb88fba6023cc59684c3",
                    "avatar": "image path",
                    "address": "NKT-CG-HN"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    })
    describe('+ Admin delete by ID', function () {
        it('Admin delete by ID true', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5feceb0744de923a1b334555"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin delete by ID user not admin', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "id":"5feceb0744de923a1b334555"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin delete by ID does not exist', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id":"5feceb0744de923a1b3345"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    })
    describe('+ Admin delete by username', function () {
        it('Admin delete by username true', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin112"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin delete by username user not admin', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "id":"5feceb0744de923a1b334555"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin delete by username does not exist', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username":"admin"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    })
});
