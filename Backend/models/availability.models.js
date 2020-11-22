module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        book_id: Number,
        title: String,
        rented_count: Number,
        non_rented_count: Number,
        total_count: Number
      },
      { timestamps: true }
    );
      
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
      
    const Availability = mongoose.model("availability", schema);
    return Availability;
  };