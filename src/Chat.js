const User = require('./User');
const Post = require('./Post');

class Chat {
  constructor() {
    this.posts = [];
    this.users = [];
  }

  countAllPosts() {
    return this.posts.length;
  }

  getAllPosts(start, end) {
    return this.posts.slice(start, end);
  }

  createUser(object) {
    const data = JSON.parse(object);
    const user = new User(data);
    this.users.push(user);
    return user;
  }

  createPost(object) {
    const post = new Post(object.text, object.type, object.host);
    this.posts.push(post);
    console.log(this.posts)
    return post;
  }
}

module.exports = Chat;
