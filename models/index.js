const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');



//comment belongs to user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});
//comment belongs to post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});
//user has man posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});
//post belongs to user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});
//post has many comment
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
//user has many commment
User.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = {User, Post, Comment};