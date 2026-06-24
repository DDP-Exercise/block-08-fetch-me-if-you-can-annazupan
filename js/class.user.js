"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

class User {
    constructor(id, name, username, email, website) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
        this.posts = [];
    }

    printUsers() {
        return `
            <h2>${this.name} (@${this.username})</h2>
            <a href="mailto:${this.email}">${this.email}</a>
            <a href="https://${this.website}" target="_blank">${this.website}</a>
        `;
    }
}

let myOwnUsers = [];

function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            for (let user of users) {
                myOwnUsers.push(new User(user.id, user.name, user.username, user.email, user.website));
            }
            fetchPosts();
        });
}
fetchUsers();
