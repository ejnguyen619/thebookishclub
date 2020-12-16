var chai = require("chai"),
chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;

/***** Test URL and endpoints for APIs *****/
let url = "http://localhost:5050";
let createUserEndpoint = "/api/users/createUser";
let updateUserEndpoint = "/api/users/updateUser/";
let updateUserMembershipEndpoint = "/api/users/updateUserMembership/";

describe('Create a new user', function() {
    it("Should create and add a new user based on given parameters", function(done){
        chai.request(url)
        .post(createUserEndpoint)
        .send({
            email: "testuser@thebookishclub.com",
            password: "password1234",
            name: "Test User"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text).memberShip).to.equal(false);
            expect(JSON.parse(res.text).email).to.equal("testuser@thebookishclub.com");
            expect(JSON.parse(res.text).password).to.equal("password1234");
            expect(JSON.parse(res.text).name).to.equal("Test User");
            done();
        });
    })

    it("Should return error when an already used email id is entered again", function(done){
        chai.request(url)
        .post(createUserEndpoint)
        .send({
            email: "testuser@thebookishclub.com",
            password: "password1234",
            name: "Test User"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(500);
            expect(JSON.parse(res.text).message).to.equal("users validation failed: email: is already taken.");
            done();
        });
    })

    it("Should return error when email is not provided", function(done){
        chai.request(url)
        .post(createUserEndpoint)
        .send({
            password: "password1234",
            name: "Test User"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(400);
            expect(JSON.parse(res.text).message).to.equal("Content can not be empty!");
            done();
        });
    })

    it("Should return error when password is not provided", function(done){
        chai.request(url)
        .post(createUserEndpoint)
        .send({
            email: "testuser1@thebookishclub.com",
            name: "Test User"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(500);
            expect(JSON.parse(res.text).message).to.equal("users validation failed: password: can't be blank");
            done();
        });
    })

    it("Should return error when name is not provided", function(done){
        chai.request(url)
        .post(createUserEndpoint)
        .send({
            email: "testuser1@thebookishclub.com",
            password: "password1234"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(500);
            expect(JSON.parse(res.text).message).to.equal("users validation failed: name: can't be blank");
            done();
        });
    })

});

describe('Update an existing user', function() {
    it("Should update an existing user based on given parameters", function(done){
        id = "5fc975b48b98a584f3b0d55d";
        console.log(updateUserEndpoint + id);
        chai.request(url)
        .put(updateUserEndpoint + id)
        .send({
            address: "Some Street, San Jose, CA",
            organization: "San Jose State University",
            image_url: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text).message).to.equal("User data was updated successfully.");
            done();
        });
    })

    it("Should return error as user id is not present in the database", function(done){
        id = "aaaaaaaaffffffffaaaaaaaa";
        chai.request(url)
        .put(updateUserEndpoint + id)
        .send({
            address: "Some Street, San Jose, CA",
            organization: "San Jose State University",
            image_url: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(404);
            expect(JSON.parse(res.text).message).to.equal("Cannot update User with id=aaaaaaaaffffffffaaaaaaaa. Maybe User was not found!");
            done();
        });
    })

});

describe('Update an membership of an existing user', function() {
    it("Should update an existing user based on given parameters", function(done){
        id = "5fc975b48b98a584f3b0d55d";
        chai.request(url)
        .put(updateUserEndpoint + id)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text).message).to.equal("User data was updated successfully.");
            done();
        });
    })

    it("Should return error as user id is not present in the database", function(done){
        id = "aaaaaaaaffffffffaaaaaaaa";
        chai.request(url)
        .put(updateUserEndpoint + id)
        .end(function (err, res) {
            expect(res.status).to.equal(404);
            expect(JSON.parse(res.text).message).to.equal("Cannot update User with id=aaaaaaaaffffffffaaaaaaaa. Maybe User was not found!");
            done();
        });
    })

});
