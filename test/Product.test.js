process.env.NODE_ENV = 'development';


let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
let server = require('../server');
chai.use(chaiHttp);

describe('******************** Product ********************', function () {
    describe('+ Product list', function () {
        it('List product is array data', function (done) {
            chai.request(server)
            .get('/products/list')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        });
        it('Product ID', function (done) {
            chai.request(server)
            .get('/products/list/5ff5e31b1225d25313be160d')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
        it('Product categories', function (done) {
            chai.request(server)
            .post('/products/list/categories')
            .send({
                "category_name":"Điện thoại"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        });
        it('Product id seller', function (done) {
            chai.request(server)
            .post('/products/list/seller')
            .send({
                "id_seller": "5fe9f0070e9a1c17918952a2"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
        });
        it('Delete by ID Product and ID Admin', function (done) {
            chai.request(server)
            .delete('/products/delete')
            .set({"Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII"})
            .send({
                "id_seller":"5ff3f8013c27154d3db6f4dd",
                "id":"5ff5d6888be61b47412fab26"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
        it('Delete by ID Product and Not Seller', function (done) {
            chai.request(server)
            .delete('/products/delete')
            .set({"Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII"})
            .send({
                "id_seller":"5fea2a46474dd34da20aa3f5",
                "id":"5ff5e31b1225d25313be160d"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
        it('Delete by ID Product and ID Seller', function (done) {
            chai.request(server)
            .delete('/products/delete')
            .set({"Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII"})
            .send({
                "id_seller":"5fea2a46474dd34da20aa3f5",
                "id":"5ff689f7b4cabb1ac7ccaf42"
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
        it('add by Product => True', function (done) {
            chai.request(server)
            .post('/products/add')
            .set({"Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmY2ODYwNzRjMWFiNjE2ZWEyODlkNWQiLCJpYXQiOjE2MDk5OTE2OTgsImV4cCI6MTYwOTk5NTI5OH0.6EotwBLYfn3d2HDiKoWWu8wMYexRXLPZ5auBVPkCnII"})
            .send({
                "id_seller":"5fea2a46474dd34da20aa3f5",
                "image":"x3",
                "price":222222,
                "description":"Iphone xs Pro 123",
                "count_product":33333,
                "Categories":{"name":"Điện Tử"}
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
        it('add by Product Miss Access_Token', function (done) {
            chai.request(server)
            .post('/products/add')
            .send({
                "id_seller":"5fea2a46474dd34da20aa3f5",
                "image":"x3",
                "price":222222,
                "description":"Iphone xs Pro 123",
                "count_product":33333,
                "Categories":{"name":"Điện Tử"}
            })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("Object");
                done();
            });
        });
    });
});
