const { encryptToken, decryptToken } = require('../utils/Encryption');
const { assert, expect } = require('chai');
context('********* Encode Token *********', function () {
    it('encryptToken return true', function () {
        assert.equal(encryptToken("NODE_ENV"), 'fa5b2bd0b9ab9d96', 'encryptToken NODE_ENV equal `Encyption True`');
    })
    it('Test result random', function () {
        assert.equal(encryptToken("NODE_ENV"), 'Random value Encryption ', 'Encryption Fail');
    })
    it('Test notEqual random', function () {
        assert.notEqual(encryptToken("NODE_ENV"), 'Random value Encryption ', 'NotEqual Encryption');
    })
})

context('********* Decode Token *********', function () {
    it('DecryptToken return true', function () {
        assert.equal(decryptToken("fa5b2bd0b9ab9d96"), 'NODE_ENV', 'decryptToken fa5b2bd0b9ab9d96 equal `NODE_ENV`');
    })
    it('Test equal random', function () {
        assert.equal(decryptToken("fa5b2bd0b9ab9d96"), 'Random value Encryption ', 'Decryption Fail');
    })
    it('Test notEqual value', function () {
        assert.notEqual(decryptToken("fa5b2bd0b9ab9d96"), 'NODE_ENV', 'Decryption NotEqual');
    })
})