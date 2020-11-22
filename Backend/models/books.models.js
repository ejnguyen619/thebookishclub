module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: Number,
      book_id: Number,
      goodreads_book_id: Number,
      best_book_id: Number,
      work_id: Number,
      books_count: Number,
      isbn: Number,
      isbn13: Number,
      authors: String,
      original_publication_year: String,
      original_title: String,
      title: String,
      language_code: String,
      average_rating: Number,
      ratings_count: Number,
      work_ratings_count: Number,
      work_text_reviews_count: Number,
      ratings_1: Number,
      ratings_2: Number,
      ratings_3: Number,
      ratings_4: Number,
      ratings_5: Number,
      image_url: String,
      small_image_url: String
    },
    { timestamps: true }
  );
    
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
    
  const Books = mongoose.model("books", schema);
  return Books;
};