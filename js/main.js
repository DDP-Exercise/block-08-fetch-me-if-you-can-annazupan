"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Anna Zupan - 2026-06-23
 *  *******************************************************/

function printUsers() {
    for (let user of myOwnUsers) {
        document.body.innerHTML += "<div data-userid='" + user.id + "'>" + user.printUsers() + "</div>";
    }
}

document.body.addEventListener("click", function(e) {

    if (e.target.tagName === "H2") {
        let div = e.target.parentElement;
        let userId = div.dataset.userid;
        let postsDiv = div.querySelector(".posts");

        if (postsDiv) {
            postsDiv.remove();
        } else {
            let html = "<div class='posts'>";
            for (let user of myOwnUsers) {
                if (user.id === +userId) {
                    for (let post of user.posts) {
                        html += post.printPosts();
                    }
                }
            }
            html += "</div>";
            div.innerHTML += html;
        }
    }

    // Comments laden
    if (e.target.tagName === "BUTTON") {
        let postId = e.target.dataset.postid;
        fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments")
            .then(response => response.json())
            .then(comments => {
                let html = "";
                for (let comment of comments) {
                    html += "<p><strong>" + comment.name + "</strong>: " + comment.body + "</p>";
                }
                e.target.insertAdjacentHTML("afterend", html);
                e.target.remove();
            });
    }
});

fetchUsers();