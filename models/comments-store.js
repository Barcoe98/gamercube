const _ = require('lodash');
const JsonStore = require('./json-store');

const commentsStore = {

  store: new JsonStore('./models/comments-store.json', { comments: [] }),
  collection: 'comments',
  
  getAllComments() {
    return this.store.findAll(this.collection);
  },
  
  addComment(comment) {
    this.store.add(this.collection, comment);
  },
}
module.exports = commentsStore;