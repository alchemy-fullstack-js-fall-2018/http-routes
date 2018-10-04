const Post = require('./post');

class Posts {
    constructor() {
        this.posts = new Map();
    }

    create(username, text) {
        const post = new Post(username, text);
        this.posts.set(post.id, post);
        return post;
    }

    get(id) {
        return this.posts.get(id);
    }

    getAll() {
        return [...this.posts.values()];
    }

    update(id, newText) {
        const post = this.posts.get(id);
        post.text = newText;
        return post;
    }

    delete(id) {
        this.posts.delete(id);
    }
}

module.exports = new Posts();
