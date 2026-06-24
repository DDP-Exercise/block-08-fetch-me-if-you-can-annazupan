"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/

class Post {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    printPosts() {
        return `
            <h3>${this.title}</h3>
            <p>${this.body}</p>
            <button data-postid="${this.id}">Load Comments</button>
        `;
    }
}

function fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            for (let post of posts) {
                for (let user of myOwnUsers) {
                    if (user.id === post.userId) {
                        user.posts.push(new Post(post.id, post.title, post.body));
                    }
                }
            }
            printUsers();
        });
}