const User = require('./User');
const Post = require('./Post');

class Chat {
  constructor() {
    this.posts = [];
    this.users = [];
  }

  getAllPosts(start, limit) {
    return this.posts.slice((start - 1), limit);
  }

  createUser(object) {
    const data = JSON.parse(object);
    const user = new User(data);
    this.users.push(user);
    return user;
  }

  createTextPost(object) {
    const post = new Post(object.text, object.type, object.host);
    this.posts.push(post);
    return post;
  }
}

module.exports = Chat;
