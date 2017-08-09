var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book');

var agent = request.agent(app);

describe('BookAPI CRUD Test', function(){
    it('Should allow a book to be posted a return a read field and _id field', function(done){
        var bookPost = {title: 'new Book', author: 'Jon', genre : 'Fiction'}

        agent.post('/api/Books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })
    afterEach(function(done){
        Book.remove().exec();
        done();
    })
});