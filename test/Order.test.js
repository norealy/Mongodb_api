let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** ORDERS TEST ********************', function () {
    describe('+ ORDERS show and Delete', function () {
        it('List orders user', function (done) {
            chai.request(server)
                .get('/orders/list_Orderuser/5fe91d9e893b5d1db88ae1d6')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Orders id seller', function (done) {
            chai.request(server)
                .get('/orders/list/5fe9331e8c275938caee0ed0')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
    describe('+ ORDERS ADD', function () {
        it('add by Orders True', function (done) {
            chai.request(server)
                .post('/orders/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
                    "id_user": "5fe9f0070e9a1c17918952a2",
                    "Orders_details": [{
                        "id_product": "5ff619c86877c6272644d4d1",
                        "count_product": 20
                    },
                    {
                        "id_product": "5ff5dfbe68dda54fabaeb651",
                        "count_product": 22
                    }]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Orders miss Access_Token', function (done) {
            chai.request(server)
                .post('/orders/add')
                .send({
                    "id_seller": "5fea2a46474dd34da20aa3f5",
                    "image": "x3",
                    "price": 111111,
                    "description": "Nokia 2730",
                    "count_product": 111111,
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Orders miss id user', function (done) {
            chai.request(server)
                .post('/orders/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "Orders_details": [{
                        "id_product": "5ff711f947cb071073f24ba1",
                        "count_product": 200
                    }]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Orders miss id_Product', function (done) {
            chai.request(server)
                .post('/orders/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id_user": "5fe9f0070e9a1c17918952a2",
                    "Orders_details": [{
                        "count_product": 200
                    }]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Orders miss count_product', function (done) {
            chai.request(server)
                .post('/orders/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id_user": "5fe9f0070e9a1c17918952a2",
                    "Orders_details": [{
                        "count_product": 200
                    }]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit by Orders by id_order, id_product, count_product', function (done) {
            chai.request(server)
                .patch('/orders/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id": "5fe9331e8c275938caee0ed0",
                    "id_product": "5fe927b59d04b12bfcf8fb98",
                    "count_product": 555
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit by Orders miss id_product', function (done) {
            chai.request(server)
                .patch('/orders/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id": "5fe9331e8c275938caee0ed0",
                    "count_product": 3000
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit Orders by miss id_order', function (done) {
            chai.request(server)
                .patch('/orders/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id_product": "5fe927d19d04b12bfcf8fb9a",
                    "count_product": 3000
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
    describe('+ ORDERS DELETE', function () {
        it('Delete by Orders True', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
                    "id_order": "5ff3fa076136284ec05c4fe2",
                    "id_user": "5fe91d9e893b5d1db88ae1d6"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by Orders miss id_order', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAxMjM1NzgsImV4cCI6MTYxMDEyNzE3OH0.0hDCM1a5TrXCixF-bTvrSN0tgODNitTb_YX2FqkDv34" })
                .send({
                    "id_user": "5fe91d9e893b5d1db88ae1d6"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by Orders miss id user', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAxMjM1NzgsImV4cCI6MTYxMDEyNzE3OH0.0hDCM1a5TrXCixF-bTvrSN0tgODNitTb_YX2FqkDv34" })
                .send({
                    "id_order": "5ff3fa076136284ec05c4fe2"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by Orders not user hasOwn', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAxMjM1NzgsImV4cCI6MTYxMDEyNzE3OH0.0hDCM1a5TrXCixF-bTvrSN0tgODNitTb_YX2FqkDv34" })
                .send({
                    "id_order": "5fea3483e1e65e579048e82a",
                    "id_user": "5ff686074c1ab616ea289d5d"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
})
