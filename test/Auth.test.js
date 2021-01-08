process.env.NODE_ENV = 'development';


let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Auth ********************', async function () {
    describe('+ Auth Users Login', function () {
        it('User login true', function (done) {
            chai.request(server)
                .post('/auth/login')
                .send({
                    "username":"nrx2",
                    "password":"Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('User login miss username', function (done) {
            chai.request(server)
                .post('/auth/login')
                .send({
                    "password":"Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('User login miss password', function (done) {
            chai.request(server)
                .post('/auth/login')
                .send({
                    "username":"nrx2"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
    describe('+ Auth Admin Login', function () {
        it('Admin login true', function (done) {
            chai.request(server)
                .post('/auth/admin/login')
                .send({
                    "username":"admin2",
                    "password":"Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin login miss username', function (done) {
            chai.request(server)
                .post('/auth/admin/login')
                .send({
                    "password":"Password328"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Admin login miss password', function (done) {
            chai.request(server)
                .post('/auth/admin/login')
                .send({
                    "username":"admin2",
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
    describe('+ Refresh token', function () {
        it('Refresh token true', function (done) {
            chai.request(server)
                .post('/refresh-token')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJpYXQiOjE2MTAwNzcxNDgsImV4cCI6MTYxMDA4MDc0OH0.VmnA6oVoiFLdTjhyW1ufVHbywrBEHdMZhXk82E5R-R0" })
                .send({
                    "refreshToken": "87715bf0d5d6ebf9f092a4f829bebe4ff74fd7abc338b60add865165120902b82cc540cd"
               })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Refresh token access token false', function (done) {
            chai.request(server)
                .post('/refresh-token')
                .set({ "Access_Token": "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWIwNzQ0ZGU5MjNhMWIzMzQ1NTUiLCJpYXQiOjE2MTAwNzcxNDgsImV4cCI6MTYxMDA4MDc0OH0.VmnA6oVoiFLdTjhyW1ufVHbywrBEHdMZhXk82E5R-R0" })
                .send({
                    "refreshToken": "87715bf0d5d6ebf9f092a4f829bebe4ff74fd7abc338b60add865165120902b82cc540cd"
               })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Refresh token access token other User', function (done) {
            chai.request(server)
                .post('/refresh-token')
                .set({ "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwMDc2MDIxLCJleHAiOjE2MTAwNzk2MjF9.JpN5cC_ejGPZdkCx1c5uYahXe8yN-ttCdGGVAWvKjbs" })
                .send({
                    "refreshToken": "87715bf0d5d6ebf9f092a4f829bebe4ff74fd7abc338b60add865165120902b82cc540cd"
               })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
});