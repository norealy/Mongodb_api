let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Products lis', () => {
    // beforeEach((done) => setTimeout(done(), 10000));
    describe('/GET /products/list', () => {
        it('it should GET all product', (done) => {
            chai.request(server)
                .get('/products/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
})