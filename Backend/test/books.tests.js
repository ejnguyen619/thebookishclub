var chai = require("chai"),
chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;

/***** Test URL and endpoints for APIs *****/
let url = "http://localhost:5050";
let findBooksByTitleEndpoint = "/api/books/findBooksByTitle";
let findBooksByAuthorEndpoint = "/api/books/findBooksByAuthor";
let findAllBooksEndpoint = "/api/books/findAllBooks";

describe('Search books by title', function() {
    it("Should fetch the details of the books based on book title", function(done){
        chai.request(url)
        .get(findBooksByTitleEndpoint)
        .query({
            title:"Harry Potter"
        })
        .end(function (err, res) {
            // console.log(res.text);
            expect(res.status).to.equal(200);
            // title = (JSON.parse(res.text) [0].original_title);
            // author = (JSON.parse(res.text) [0].authors);
            // publicationYear = (JSON.parse(res.text) [0].original_publication_year);
            expect(JSON.parse(res.text)[0].original_title).to.equal("Harry Potter and the Chamber of Secrets");
            expect(JSON.parse(res.text)[0].authors).to.equal("J.K. Rowling, Mary GrandPré");
            expect(JSON.parse(res.text)[0].original_publication_year).to.equal("1998");
            done();
        });
    })

    it("Should return empty array when no books match the query", function(done){
        chai.request(url)
        .get(findBooksByTitleEndpoint)
        .query({
            title:"How I Met Your Mother"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('[]');
            done();
        });
    })

});

describe('Search books by author', function() {
    it("Should fetch the details of the books based on author name", function(done){
        chai.request(url)
        .get(findBooksByAuthorEndpoint)
        .query({
            authors:"J.K. Rowling"
        })
        .end(function (err, res) {
            // console.log(res.text);
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text)[0].original_title).to.equal("Harry Potter and the Chamber of Secrets");
            expect(JSON.parse(res.text)[0].authors).to.equal("J.K. Rowling, Mary GrandPré");
            expect(JSON.parse(res.text)[0].original_publication_year).to.equal("1998");
            done();
        });
    })

    it("Should return empty array when no books match the query", function(done){
        chai.request(url)
        .get(findBooksByAuthorEndpoint)
        .query({
            authors:"Jyotsna Priya"
        })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('[]');
            done();
        });
    })

});

describe('Search all books', function() {
    it("Should fetch the details of all the books at page 1", function(done){
        chai.request(url)
        .get(findAllBooksEndpoint)
        .query({
            page: 1
        })
        .end(function (err, res) {
            // console.log(res.text);
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text)[0].original_title).to.equal("Divergent");
            expect(JSON.parse(res.text)[0].authors).to.equal("Veronica Roth");
            expect(JSON.parse(res.text)[0].original_publication_year).to.equal("2011");
            done();
        });
    })

    it("Should fetch the details of all the books at page 417", function(done){
        chai.request(url)
        .get(findAllBooksEndpoint)
        .query({
            page: 417
        })
        .end(function (err, res) {
            // console.log(res.text);
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text)[0].original_title).to.equal("Locked On");
            expect(JSON.parse(res.text)[0].authors).to.equal("Tom Clancy, Mark Greaney");
            expect(JSON.parse(res.text)[0].original_publication_year).to.equal("2011");
            done();
        });
    })

    it("Should fetch the details of all the books at page 1 when no page number is given", function(done){
        chai.request(url)
        .get(findAllBooksEndpoint)
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            expect(JSON.parse(res.text)[0].original_title).to.equal("Divergent");
            expect(JSON.parse(res.text)[0].authors).to.equal("Veronica Roth");
            expect(JSON.parse(res.text)[0].original_publication_year).to.equal("2011");
            done();
        });
    })
});
