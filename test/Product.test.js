

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Product ********************', function () {
    describe('+ Product ', function () {
        it('List product is array data', function (done) {
            chai.request(server)
                .get('/products/list')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Product ID', function (done) {
            chai.request(server)
                .get('/products/list/5ffccac2b9451a70b239064d')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Product ID not exist', function (done) {
            chai.request(server)
                .get('/products/list/5ffccac2b9451a70b239d')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Product categories', function (done) {
            chai.request(server)
                .post('/products/list/categories')
                .send({
                    "category_name": "Điện thoại"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Product data by id seller', function (done) {
            chai.request(server)
                .post('/products/list/seller')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjODM5ZDNmM2ViZjEzN2M4YmI5M2YiLCJpYXQiOjE2MDk5NTAwNDAsImV4cCI6MTYwOTk1MzY0MH0.L4fqoxy91wSynl2nO46A5KqAVik2HKG8nohrka4FCqo" })
                .send({
                    "id_seller": "5fe9f0070e9a1c17918952a2"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
        it('Delete by ID Product and ID Admin', function (done) {
            chai.request(server)
                .delete('/products/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjEwNDIyNTc3LCJleHAiOjE2MTA0MjYxNzd9.nwa2vmlNggf7jve6nkjhbwmkptx0rKm1uM5OjpJORTg" })
                .send({
                    "id":"5ff5dfbe68dda54fabaeb651"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by ID Product and ID Seller', function (done) {
            chai.request(server)
                .delete('/products/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id": "5ffd226ae4333f45e5e095f2"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Delete by ID Product and Not Seller', function (done) {
            chai.request(server)
                .delete('/products/delete')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id": "5ffcfc504d1ea21d8973bcd7"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        
        it('add by Product => True', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "image": "x3",
                    "price": 111111,
                    "description": "Nokia 2730",
                    "count_product": 111111,
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Product miss Access_Token', function (done) {
            chai.request(server)
                .post('/products/add')
                .send({
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
        it('add by Product miss Image', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "price": 111111,
                    "description": "Nokia 2730",
                    "count_product": 111111,
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Product miss count product', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "image": "x3",
                    "price": 111111,
                    "description": "Nokia 2730",
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Product miss price', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "image": "x3",
                    "description": "Nokia 2730",
                    "count_product": 111111,
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Product miss description', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "image": "x3",
                    "price": 111111,
                    "count_product": 111111,
                    "Categories": { "name": "Điện Tử" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('add by Product miss Categories', function (done) {
            chai.request(server)
                .post('/products/add')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "image": "x3",
                    "price": 111111,
                    "description": "Nokia 2730",
                    "count_product": 111111,
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit by Product by Not Seller', function (done) {
            chai.request(server)
                .put('/products/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII" })
                .send({
                    "id": "5ff5dfbe68dda54fabaeb651",
                    "image": "x",
                    "price": 10000,
                    "description": "Iphone xs Pro",
                    "count_product": 10000,
                    "Categories": { "name": "Điện thoại" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
        it('Edit by Product by Seller', function (done) {
            chai.request(server)
                .put('/products/update')
                .set({ "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjAwNzBlOWExYzE3OTE4OTUyYTIiLCJpYXQiOjE2MTA0MTg4NTUsImV4cCI6MTYxMDQyMjQ1NX0.QMi4DGL9VZG7Nt9OBNU9B2aS1I19JjBQfv581BCUE1Y" })
                .send({
                    "id": "5ff61d76cf16b22b34c0a3b8",
                    "image": "x",
                    "price": 10000,
                    "description": "Iphone xs Pro",
                    "count_product": 10000,
                    "Categories": { "name": "Điện thoại" }
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("Object");
                    done();
                });
        });
    });
});
