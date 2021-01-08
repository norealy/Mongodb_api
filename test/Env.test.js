const Env = require('../utils/Env');
const { assert, expect } = require('chai');

context('without arguments', function () {
    it('should return 0', function () {
        assert.equal(Env.get("NODE_ENV"), 'development', 'NODE_ENV equal `development`');
    })
    it('process.env.NODE_ENV khac product', function () {
        assert.notEqual(Env.get("NODE_ENV"), 'product', 'NODE_ENV not equal `product`');
    })
})