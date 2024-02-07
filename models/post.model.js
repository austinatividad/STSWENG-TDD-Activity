const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (obj, next) => {
    Post.findOneAndUpdate(obj, {title: obj.title + " (updated)"}).then(function(err, post) {
        next(err, post)
    })
}

exports.findPost = (obj, next) => {
    //i implemented it using only title as the search criteria
    Post.findOne(obj.title).then(function(err, post) {
        next(err, post)
    })
}