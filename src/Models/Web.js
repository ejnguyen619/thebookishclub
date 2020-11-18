const { default: Books } = require("../components/pages/Books");

var MongoClient= require("mongodb").MongoClient;
// var url="mongodb+srv://thebookishclub7:cmpe280project@bookishclubcluster.yclum.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://thebookishclub7:cmpe280project@bookishclubcluster.yclum.mongodb.net/BookishClubDB?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

////////////// temporary comment ////////////////////
// MongoClient.connect(url,function(err,db){
//   if (err) throw err;
//   var dbo=db.db("mydb")
// // const mongoose = require('mongoose')
// // const db = new mongoose.Collection('books')
// // db.inse
// // const marked = require('marked')
// // const slugify = require('slugify')
// // const createDomPurify = require('dompurify')
// // const { JSDOM } = require('jsdom')
// // const dompurify = createDomPurify(new JSDOM().window)

// const webSchema = new mongoose.Schema({
//   fname: {
//     type: String,
//     required: true
//   },
//   lname: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
// },
// dbo.collection("books").insertMany([
//     {
//       "name": "", 
//       "author": "",
//       "genre": "",
//       "available":"",
//       "location": "",
//       "image": "",

//     },
//     {
//       "name": "", 
//       "author": "",
//       "genre": "",
//       "available":"",
//       "location": ""
//     },
  
//     {
//       "name": "", 
//       "author": "",
//       "genre": "",
//       "available":"",
//       "location": ""
//     }
  
//   ]));

 
// });


// // articleSchema.pre('validate', function(next) {
// //   if (this.title) {
// //     this.slug = slugify(this.title, { lower: true, strict: true })
// //   }

// //   if (this.markdown) {
// //     this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
// //   }

// //   next()
// // })

// //module.exports = mongoose.model('Web', webSchema)



//mongoimport --uri "mongodb+srv://thebookishclub7:cmpe280project@bookishclubcluster.yclum.mongodb.net/BookishClubDB?retryWrites=true&w=majority" --collection myData --drop --file backend/src/books.csv
