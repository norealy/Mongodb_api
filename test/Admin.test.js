
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Admin ********************', function () {
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
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
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
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Show admin by ID with access token user not Admin', function (done) {
            chai.request(server)
                .get('/manager-admin/list/5fecec28833e1a3d84f4b7')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Add Admin', function () {
        it('Add Admin true', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin1122222",
                    "password": "Password328",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin exits username', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin112222233333",
                    "password": "Password328",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss username', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "password": "Password328",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss password', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin1122",
                    "email": "xdatgd@gmail.com",
                    "phone": "0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss email', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin1122",
                    "password": "Password328",
                    "phone": "0332302222"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Add Admin miss phone ', function (done) {
            chai.request(server)
                .post('/manager-admin/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin1122",
                    "password": "Password328",
                    "email": "xdatgd@gmail.com",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
    describe('+ Admin Change password', function () {
        it('Admin Change password true', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "id": "5ff32e4fc2ddc823d59b2526",
                    "password": "Password328",
                    "newPassword": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss id', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "password": "Password328",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change id does not exits', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "id": "5ff32e4fc2ddc823d56",
                    "password": "Password328",
                    "newPassword": "Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss old password', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "id": "5ff32e4fc2ddc823d59b2526",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password miss new password', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "id": "5ff32e4fc2ddc823d59b2526",
                    "password": "Password328",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
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
                    expect(res.body).to.be.an("Object");
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
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
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
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
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
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
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
                    expect(res.body).to.be.an("Object");
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
                    expect(res.body).to.be.an("Object");
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
                    "id": "5ff3f8013c27154d3db6f4dd"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin delete by ID user not admin', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "id": "5ff3f83e6f711e4d6760637b"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin delete by ID does not exist', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id": "5ff3f83e6f711e4d676063b"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
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
                    "username": "admin112255"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin delete by username user not admin', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwNzQzMzUsImV4cCI6MTYxMDA3NzkzNX0.Svg-S-iTw5eYYXFECd1i9HY47YdvK3S_AEJ0PGh1jvI" })
                .send({
                    "username": "admin1122"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin delete by username does not exist', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/username')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "username": "admin1122"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
});
