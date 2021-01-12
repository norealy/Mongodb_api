
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Admin ********************', function () {
    describe('+ Admin list', function () {
        it('List Admin miss Access Token', function (done) {
            chai.request(server)
                .get('/manager-admin/list')
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('List Admin data', function (done) {
            chai.request(server)
                .get('/manager-admin/list')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTQzOTgyLCJleHAiOjE2MDk5NDc1ODJ9.Iwvcqp1V-DYTBKgcyI-egzimiGYE0VbJHUhd-HJygtY" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('List Admin token user', function (done) {
            chai.request(server)
                .get('/manager-admin/list')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MTA0MDY2MjEsImV4cCI6MTYxMDQxMDIyMX0.pIoOG8-U3KjLoT9Y4cXHLaaoJfT4wCKgrpzj3Ujxp34" })
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
 
    describe('+ Admin Change password', function () {
        it('Admin Change password true', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwNDExNzg5LCJleHAiOjE2MTA0MTUzODl9.BKtXBBn9QPJTS8UjYAGp5hDVn4Q0PqELAwVBJ4moNcI" })
                .send({
                    "password": "Password3288",
                    "newPassword": "Password3288"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Admin Change password access token other', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
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
        it('Admin Change old password wrong !', function (done) {
            chai.request(server)
                .patch('/manager-admin/change-password')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMTE5NDExLCJleHAiOjE2MTAxMjMwMTF9.zJuEjJBGqnXtRlXBG_dVAPqs8MmgORL2_6cQ6e-b4B0" })
                .send({
                    "password": "Password123",
                    "newPassword": "Password3288"
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5MzYyMzYwLCJleHAiOjE2MDkzNjU5NjB9.Y0yKOVIpjgOtAUELT1bcHESPm72RgvHWdkdiaEHaInM" })
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
        it('Admin Change info miss access token', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
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
        it('Admin Change info access token not admin', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTg4NTUsImV4cCI6MTYxMDQyMjQ1NX0.QMi4DGL9VZG7Nt9OBNU9B2aS1I19JjBQfv581BCUE1Y" })
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
        it('Admin Change info miss full name', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5MzYyMzYwLCJleHAiOjE2MDkzNjU5NjB9.Y0yKOVIpjgOtAUELT1bcHESPm72RgvHWdkdiaEHaInM" })
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
        it('Admin Change info miss phone number', function (done) {
            chai.request(server)
                .put('/manager-admin/update/info')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5MzYyMzYwLCJleHAiOjE2MDkzNjU5NjB9.Y0yKOVIpjgOtAUELT1bcHESPm72RgvHWdkdiaEHaInM" })
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
    describe('+ Admin delete by ID', function () {
        it('Admin delete by ID true', function (done) {
            chai.request(server)
                .delete('/manager-admin/delete/id')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2MTIzYTBmYjIyYTIzNDEwMWJiZTAiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5OTYyMDk2LCJleHAiOjE2MDk5NjU2OTZ9.8N_ZQAlRt0_A167kwLqzwyA6x0hkqJw-iYyIp2kEv4k" })
                .send({
                    "id": "5ff904a57c20e6109322c208" // 5ff90540ec071f116d3a4a22
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
                    "username": "5ff91145c683e71afbcce503"
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
                    "username": "admin112222233333"
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
                    "username": "admin112222233333"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    })
});
