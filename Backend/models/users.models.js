var uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
        password: {type: String, required: [true, "can't be blank"]},
        name: {type: String, required: [true, "can't be blank"]},
        address: String,
        organization: String,
        image_url: String,
        memberShip: {type: Boolean, default: false},
        memberShipStartDate: Date,
        memberShipEndDate: Date,
        //user_books_rented_count: {type:Number, default:0}
      },
      { timestamps: true }
    );
      
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

    schema.plugin(uniqueValidator, {message: 'is already taken.'});  
    const Users = mongoose.model("users", schema);
    return Users;
};