process.env.NODE_ENV = 'dev';

import * as server from '../server';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import { FooBar } from '../model/foo-bar.model';

var token = jwt.sign({},'foo-bar');

chai.use(chaiHttp);
chai.should();

describe('FooBar', () => {
  var _fooBarModel = new FooBar().getModelForClass(FooBar)

  describe('/POST save foo bar', () => {
      it('it should POST save a foo bar', (done) => {
        let fooBar = {
            foo: "test",
            bar: 1,
            baz: 2
        }
            chai.request(server)
            .post('/api/saveFooBar')
			.set('Authorization', `Bearer ${token}`)
            .send(fooBar)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('foo');
                res.body.should.have.property('bar');
                res.body.should.have.property('baz');
              done();
            });
      });
    });
	
  describe('/GET all foo bar', () => {
    it('it should GET all the foo bar', (done) => {
      chai.request(server)
        .get('/api/getAllFooBar')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
		  res.body.should.have.length.above(0);
          done();
        });
    });
  });

  describe('/GET/:id foo bar', () => {
      it('it should GET a foo bar by id', (done) => {
            (async() => {
                var fooBar = await _fooBarModel.findOne({}).exec();
                chai.request(server)
                .get('/api/getFooBarById/' + fooBar._id)
				.set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('foo');
                    res.body.should.have.property('bar');
                    res.body.should.have.property('baz');
                    res.body.should.have.property('_id').eql(fooBar._id.toString());
                    done();
                });
            })();       
      });
    });

  describe('/PUT update foo bar', () => {
      it('it should PUT update a foo bar', (done) => {
            (async() => {
                var fooBar = await _fooBarModel.findOne({}).exec();
                fooBar.foo = 'test test'
                chai.request(server)
                    .put('/api/updateFooBar')
					.set('Authorization', `Bearer ${token}`)
                    .send(fooBar)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('foo');
                        res.body.should.have.property('bar');
                        res.body.should.have.property('baz');
                        res.body.should.have.property('foo').eql('test test');
                        done();
                    });
            })();
      });
    });
    
  describe('/DELETE/:id foo bar', () => {
      it('it should DELETE a foo bar given the id', (done) => {
            (async() => {
                var fooBar = await _fooBarModel.findOne({}).exec();
                chai.request(server)
                    .delete('/api/deleteFooBar/' + fooBar._id)
					.set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        done();
                    });
            })();
      });
  });
});