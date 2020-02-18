const Post = require('../models/post');
const User = require('../models/user');

module.exports = app => {
  app.post("/posts/new", (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect(`/`);
    })
});

app.get("/", (req, res) => {
  let currentUser = req.user;

  Post.find({})
    .then(posts => {
      res.render("posts-index", { posts, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });
});

// CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
      var post = new Post(req.body);
      post.author = req.user._id;

      post
          .save()
          .then(post => {
              return User.findById(req.user._id);
          })
          .then(user => {
              user.posts.unshift(post);
              user.save();
              // REDIRECT TO THE NEW POST
              res.redirect(`/posts/${post._id}`);
          })
          .catch(err => {
              console.log(err.message);
          });
  } else {
      return res.status(401); // UNAUTHORIZED
  }
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
      // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments')
      .then((post) => {
        res.render('post-show.hbs', { post })
      })
      .catch((err) => {
        console.log(err.message)
      })
  });
  
  app.get("/posts/:id", function(req, res) {
// LOOK UP THE POST
Post.findById(req.params.id).populate('comments').then((post) => {
  res.render('posts-show', { post })
}).catch((err) => {
  console.log(err.message)
})
  });
};