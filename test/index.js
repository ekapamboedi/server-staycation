const chai = require('chai');
const chaiHTTP  = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs');

chai.use(chaiHTTP);

describe('API ENDPOINT TESTING', ()=> {
    it('GET Landing Page' , (done) => {
        chai.request(app).get('/api/v1/member/landing-page').end((err, res) => {
            // Getting error respond information
            expect(err).to.be.null;
            // if it succes tell code '200' just like what the controller responded sent
            expect(res).to.have.status(200);
            // becouse the body containing Object
            expect(res.body).to.be.an('Object');
            //testing hero properties
            expect(res.body).to.have.property('hero');
            expect(res.body.hero).to.have.all.keys('trevelers', 'treasures', 'cities');
            // testing mostPicked properties 
            expect(res.body).to.have.property('mostPicked');
            expect(res.body.mostPicked).to.have.all.an('Array');
            // Testing Categories
            expect(res.body).to.have.property('category');
            expect(res.body.category).to.have.all.an('Array');
            // Teting Testimonial properties
            expect(res.body).to.have.property('testimonial');
            expect(res.body.testimonial).to.have.all.an('Object');
            
            done();
          })
    }),
    it('GET Detail Page' , (done) => {
        chai.request(app).get('/api/v1/member/detail-page/5e96cbe292b97300fc902225').end((err, res) => {
             // Getting error respond information
             expect(err).to.be.null;
             // if it succes tell code '200' just like what the controller responded sent
             expect(res).to.have.status(200);
             // becouse the body containing Object
             expect(res.body).to.be.an('Object');
            //testing hero properties
            expect(res.body).to.have.property('country');
            expect(res.body).to.have.property('isPopular');
            expect(res.body).to.have.property('unit');
            expect(res.body).to.have.property('sumBooking');
            
            expect(res.body).to.have.property('imageId');
            expect(res.body.imageId).to.have.an('Array');
            
            expect(res.body).to.have.property('featureId');
            expect(res.body.featureId).to.have.an('Array');
            
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('price');
            expect(res.body).to.have.property('city');
            expect(res.body).to.have.property('description');
            expect(res.body).to.have.property('__v');
            
            expect(res.body).to.have.property('bank');
            expect(res.body.bank).to.have.an('Array');
            
            expect(res.body).to.have.property('testimonial');
            expect(res.body.testimonial).to.have.all.an('Object');
            
            done();
          })
    }),

    it('GET Booking Page' , (done) => {
        const image = __dirname + '/BuktiBayar.jpg';
        const dataSample = {
            image,
            idItem:'5e96cbe292b97300fc902225',
            duration: 2,
            // price:'',
            bookingStartDate:'09/04/2022',
            bookingEndDate:'11/04/2022',
            firstName:'Lisa',
            lastName:'Tabah',
            email:'lisatabah@gmail.com',
            phoneNumber:'081234567',
            accountHolder:'Lisa',
            bankFrom:'BCA'
        };
        chai.request(app).post('/api/v1/member/booking-page/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('idItem', dataSample.idItem)
            .field('duration', dataSample.duration)
            .field('bookingStartDate', dataSample.bookingStartDate)
            .field('bookingEndDate', dataSample.bookingEndDate)
            .field('firstName', dataSample.firstName)
            .field('lastName', dataSample.lastName)
            .field('email', dataSample.email)
            .field('phoneNumber', dataSample.phoneNumber)
            .field('accountHolder', dataSample.accountHolder)
            .field('bankFrom', dataSample.bankFrom)
            .attach('image', fs.readFileSync(dataSample.image), 'BuktiBayar.jpg')
            
            .end((err, res) => {
             // Getting error respond information
             expect(err).to.be.null;
             // if it succes tell code '200' just like what the controller responded sent
             expect(res).to.have.status(201);
             // becouse the body containing Object
             expect(res.body).to.be.an('Object');
            //testing hero properties
            expect(res.body).to.have.property('message');
            // equal untuk membandingkan
            expect(res.body.message).to.have.equal('Berhasil Booking!');
            expect(res.body).to.have.property('booking');
            expect(res.body.booking).to.have.all.keys('payments', '_id', 'invoice', 'bookingStartDate', 'bookingEndDate', 'total', 'itemId', 'memberId', '__v');
            expect(res.body.booking.payments).to.have.all.keys('status', 'proofPayment', 'bankFrom', 'accountHolder');
            expect(res.body.booking.itemId).to.have.all.keys('_id', 'title', 'price', 'duration');
            console.log(res.body.booking);
            done();
          })
    })

})

