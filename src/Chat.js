const User = require('./User');
const Post = require('./Post');

class Chat {
  constructor() {
    this.posts = [];
    this.users = [];
  }

  getAllPosts() {
    return this.posts;
  }

  createUser(object) {
    const data = JSON.parse(object);
    const user = new User(data);
    this.users.push(user);
    return user;
  }

  createPost(object) {
    const post = new Post(object.text);
    this.posts.push(post);
    return post;
  }
}

module.exports = Chat;
