const { v4: uuidv4 } = require('uuid');

class Post {
  constructor(body, type, host) {
    this.id = uuidv4();
    this.host = host;
    this.body = body;
    this.type = type;
    this.created = new Date().toLocaleString();
  }
}

module.exports = Post;
