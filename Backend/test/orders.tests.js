var chai = require("chai"),
chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;

/***** Test URL and endpoints for APIs *****/
let url = "http://localhost:5050";
let createNewOrderEndpoint = "/api/orders/createNewOrder";
let getOrderDetailsEndpoint = "/api/orders/getOrderDetails/";

describe('Create a new book order', function() {
    it("Should create a new order for delivery type Pickup", function(done){
        chai.request(url)
        .post(createNewOrderEndpoint)
        .query({
            book_id: 7,
            email: "thebookishclub7@gmail.com",
            title: "The Hobbit"
        })
        .send({
            deliveryType: "Pickup"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text).title).to.equal("The Hobbit");
            expect(JSON.parse(res.text).email).to.equal("thebookishclub7@gmail.com");
            expect(JSON.parse(res.text).book_id).to.equal(7);
            expect(JSON.parse(res.text).deliveryType).to.equal("Pickup");
            done();
        });
    })

    it("Should create a new order for delivery type Dropoff", function(done){
        chai.request(url)
        .post(createNewOrderEndpoint)
        .query({
            book_id: 7,
            email: "thebookishclub7@gmail.com",
            title: "The Hobbit"
        })
        .send({
            deliveryType: "DropOff",
            name: "Test",
            addressLine1: "Some street",
            addressLine2: "San Jose, CA, 95134"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text).title).to.equal("The Hobbit");
            expect(JSON.parse(res.text).email).to.equal("thebookishclub7@gmail.com");
            expect(JSON.parse(res.text).book_id).to.equal(7);
            expect(JSON.parse(res.text).deliveryType).to.equal("DropOff");
            expect(JSON.parse(res.text).name).to.equal("Test");
            expect(JSON.parse(res.text).addressLine1).to.equal("Some street");
            expect(JSON.parse(res.text).addressLine2).to.equal("San Jose, CA, 95134");
            done();
        });
    })

    it("Should return error when no delivery type is provided", function(done){
        chai.request(url)
        .post(createNewOrderEndpoint)
        .query({
            book_id: 7,
            email: "thebookishclub7@gmail.com",
            title: "The Hobbit"
        })
        .send({
            deliveryType: "Takeaway",
            name: "Test",
            addressLine1: "Some street",
            addressLine2: "San Jose, CA, 95134"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal("Delivery type can only be Pickup and DropOff!");
            done();
        });
    })

    it("Should return error when no delivery type is provided", function(done){
        chai.request(url)
        .post(createNewOrderEndpoint)
        .query({
            book_id: 7,
            email: "thebookishclub7@gmail.com",
            title: "The Hobbit"
        })
        .send({
            name: "Test",
            addressLine1: "Some street",
            addressLine2: "San Jose, CA, 95134"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal("Need a delivery type to proceed. Field can not be empty!");
            done();
        });
    })

});

describe('Fetch and return order details', function() {
    it("Should get book order details of a user based on email id", function(done){
        chai.request(url)
        .get(getOrderDetailsEndpoint)
        .query({
            email: "thebookishclub7@gmail.com"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text)[0].title).to.equal("The Great Gatsby");
            expect(JSON.parse(res.text)[0].email).to.equal("thebookishclub7@gmail.com");
            expect(JSON.parse(res.text)[0].book_id).to.equal(5);
            expect(JSON.parse(res.text)[0].deliveryType).to.equal("DropOff");
            expect(JSON.parse(res.text)[0].addressLine1).to.equal("Some street, Unit 1234");
            expect(JSON.parse(res.text)[0].addressLine2).to.equal("San Jose, CA, 95112");
            done();
        });
    })

});