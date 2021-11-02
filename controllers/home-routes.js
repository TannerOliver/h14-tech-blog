const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allPost = await Post.findAll({include: [User]});
    res.status(200).json(allPost);
    let allPostData = allPost.map(({Post, User}) => ({name: User, post: Post}));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const allPost = await Post.findByPk(req.params.id, {include: [User, {model: Comment}]});
    res.status(200).json(allPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('login')
  }
});

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('signup')
  }
});