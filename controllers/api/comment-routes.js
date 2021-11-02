const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//  Get all comments route
router.get('/', async (req, res) => {
  try {
    const allComments = await Comment.findAll({/* include anything I will need here */});
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Get specific comment with id
router.get('/:id', async (req, res) => {
  try{
    const commentData = await Comment.findByPk(req.params.id, {/* include anything I will need here */});
    if (!commentData){
      res.status(404).json({message: 'No comment found with this id'});
      return
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

//  Post the comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;