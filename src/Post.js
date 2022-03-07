const { v4: uuidv4 } = require('uuid');

class Post {
  constructor(text, host) {
    this.id = uuidv4();
    this.host = host;
    this.text = text;
    this.created = new Date().toLocaleString();
  }
}

module.exports = Post;
