let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** ORDERS TEST ********************', function () {
    describe('+ ORDERS show and Delete', function () {
        it('List orders list by user', function (done) {
            chai.request(server)
                .get('/orders/list_Orderuser')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('List orders list by user , wrong token', function (done) {
            chai.request(server)
                .get('/orders/list_Orderuser')
                .set({ "Access_Token": "bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Orders id', function (done) {
            chai.request(server)
                .get('/orders/list_OrderId/5ff721668392b11a1bd518db')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Orders id, token other', function (done) {
            chai.request(server)
                .get('/orders/list_OrderId/5ff721668392b11a1bd518db')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
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
                    "Orders_details": [
                        {
                            "id_product": "5ff619c86877c6272644d4d1",
                            "count_product": 2155
                        },
                        {
                            "id_product": "5ff68d7b15ad9a1e49c142c0",
                            "count_product": 1666
                        }
                    ]
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
                    "Orders_details": [
                        {
                            "id_product": "5ff619c86877c6272644d4d1",
                            "count_product": 2155
                        },
                        {
                            "id_product": "5ff68d7b15ad9a1e49c142c0",
                            "count_product": 1666
                        }
                    ]
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Orders miss count_product', function (done) {
            chai.request(server)
                .post('/orders/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
                    "Orders_details": [
                        {
                            "id_product": "5ff619c86877c6272644d4d1"
                        },
                        {
                            "id_product": "5ff68d7b15ad9a1e49c142c0",
                            "count_product": 1666
                        }
                    ]
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .send({
                    "id": "5ffd037849ee22246aaa9aab",
                    "id_product": "5ff619c86877c6272644d4d1",
                    "count_product": 556
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .send({
                    "id": "5ffd037849ee22246aaa9aab",
                    "count_product": 556
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .send({
                    "id_product": "5ff619c86877c6272644d4d1",
                    "count_product": 556
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit Orders by user other', function (done) {
            chai.request(server)
                .patch('/orders/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
                    "id_product": "5ff619c86877c6272644d4d1",
                    "count_product": 556
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
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTY0MzcsImV4cCI6MTYxMDQyMDAzN30.R8qfz2kOsfRK_9orNMSgDMkO5-TKiPpE2_SujvVaZXU" })
                .send({
                    "id_order": "5ffd1ddfd6d2f64240effda6"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete Order by user other', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAwMzEwOTQsImV4cCI6MTYxMDAzNDY5NH0.gDX0pbMuhXpDKYTXW274mNetlL2q-HGt72WYcYY02a4" })
                .send({
                    "id_order": "5ffd1d4b6a2ed94197f0c8b1"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by Orders access token valid', function (done) {
            chai.request(server)
                .delete('/orders/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MTAxMjM1NzgsImV4cCI6MTYxMDEyNzE3OH0.0hDCM1a5TrXCixF-bTvrSN0tgODNitTb_YX2Fqk" })
                .send({
                    "id_order": "5ff3fa076136284ec05c4fe2"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
})
