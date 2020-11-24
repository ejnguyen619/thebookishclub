// var mongoose = require('mongoose');
// var userSchema = new mongoose.Schema(
//   {
//   email: String,
//   password: String,
//   name: String,
//   // address: String,
//   // organization: String,
//   // image_url: String
//   },
//   { timestamps: true }
// );

// UserModel = mongoose.model('users', userSchema);
// return UserModel;

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        email: String,
        password: String,
        name: String
        // address: String,
        // organization: String,
        // image_url: String
      },
      { timestamps: true }
    );
      
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });
      
    const Users = mongoose.model("users", schema);
    return Users;
};