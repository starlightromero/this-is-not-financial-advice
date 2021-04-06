const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Advice = require('../models/advice')

const mocha = require('mocha')
const describe = mocha.describe
const after = mocha.after
const it = mocha.it

const { expect } = chai
chai.use(chaiHttp)

const testAdvice = {
  title: 'Test Advice',
  body: 'Testing',
}

const savingsAdvice = {
  title: 'Close your savings account',
  body: 'Invest instead!',
}

describe('Advice', function () {
  this.timeout(5000)

  after(function (done) {
    Advice.deleteMany({
      $or: [{ title: 'Close your savings account' }, { title: 'Test advice' }],
    }).exec(function (err, advice) {
      if (err) {
        done(err)
      }
      done()
    })
  })

  // TEST INDEX
  it('should index ALL advice on / GET', function (done) {
    chai
      .request(app)
      .get('/')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })

  // TEST NEW
  it('should display new form on /new GET', function (done) {
    chai
      .request(app)
      .get('/new')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })

  // TEST CREATE
  it('should create a SINGLE advice on / POST', function (done) {
    chai
      .request(app)
      .post('/')
      .send(testAdvice)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res).to.have.status(200)
        expect(res.text).to.include('html')
        done()
      })
  })

  // TEST SHOW
  it('should show a SINGLE advice on /<id> GET', function (done) {
    const advice = new Advice(testAdvice)
    advice.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(app)
        .get(`/${data._id}`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST EDIT
  it('should edit a SINGLE advice on /<id>/edit GET', function (done) {
    const advice = new Advice(testAdvice)
    advice.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(app)
        .get(`/${data._id}/edit`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST UPDATE
  it('should update a SINGLE advice on /<id> PUT', function (done) {
    const advice = new Advice(testAdvice)
    advice.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(app)
        .put(`/${data._id}?_method=PUT`)
        .send(savingsAdvice)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })

  // TEST DELETE
  it('should delete a SINGLE advice on /<id> DELETE', function (done) {
    const advice = new Advice(savingsAdvice)
    advice.save(function (err, data) {
      if (err) {
        done(err)
      }
      chai
        .request(app)
        .delete(`/${data._id}?_method=DELETE`)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          expect(res).to.have.status(200)
          expect(res.text).to.include('html')
          done()
        })
    })
  })
})
