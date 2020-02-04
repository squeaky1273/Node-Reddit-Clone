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
});

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
    .then(post => {
      res.render("posts-show", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
});

};