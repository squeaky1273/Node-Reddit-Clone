const Post = require('../models/post');

module.exports = app => {
  app.post("/posts/new", (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect(`/`);
    })
});

app.get("/", (req, res) => {
    Post.find({})
    .then(posts => {
        res.render("posts-index", {posts});
    })
    .catch(err => {
        console.log('error', err.message);
    });
})};