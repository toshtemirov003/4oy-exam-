let elListUser = document.querySelector(".user-list");
let elListTemp = document.querySelector(".user-list__template").content;
let elListPost = document.querySelector(".post-list");
let elListPostTemp = document.querySelector(".post-list__template").content;
let elListComment = document.querySelector(".comment-list");
let elListCommentTemp = document.querySelector(".comment-list__template").content;

// USERS
let userId = [];
const userFragment = document.createDocumentFragment();
const renderUser = (array, node) => {
  node.innerHTML = "";

  array.forEach((e) => {
    const newUserTemp = elListTemp.cloneNode(true);
    userId.push(e.id);
    let userDatesetItem = newUserTemp.querySelector(".user-list__item");
    userDatesetItem.dataset.id = e.id;
    let userIdTemp = (newUserTemp.querySelector(".user-list__id").textContent = e.id);
    newUserTemp.querySelector(".user-list__name").textContent = e.name;
    newUserTemp.querySelector(".user-list__username").textContent = e.username;
    newUserTemp.querySelector(".user-list__email").textContent = e.email;
    newUserTemp.querySelector(".user-list__email").href = `mailto:${e.email}`;
    newUserTemp.querySelector(".user-list__address-street").textContent = e.address.street;
    newUserTemp.querySelector(".user-list__address-suite").textContent = e.address.suite;
    newUserTemp.querySelector(".user-list__address-city").textContent = e.address.city;
    newUserTemp.querySelector(".user-list__address-zipcode").textContent = e.address.zipcode;
    newUserTemp.querySelector(".user-list__geo").textContent = "Location";
    newUserTemp.querySelector(".user-list__geo").href = `${"https://www.google.com/maps/place/"}${e.address.geo.lat},${e.address.geo.lng}`;
    newUserTemp.querySelector(".user-list__phone").textContent = `${e.phone}`;
    newUserTemp.querySelector(".user-list__phone").href = `tel:${e.phone}`;
    newUserTemp.querySelector(".user-list__website").textContent = e.website;
    newUserTemp.querySelector(".user-list__website").href = `https://${e.website}`;
    newUserTemp.querySelector(".user-list__company-name").textContent = e.company.name;
    newUserTemp.querySelector(".user-list__company-catchPhrase").textContent = e.company.catchPhrase;
    newUserTemp.querySelector(".user-list__company-bs").textContent = e.company.bs;

    userFragment.appendChild(newUserTemp);
  });
  node.appendChild(userFragment);
};

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  renderUser(data, elListUser);
}
getUsers();



// POSTS
let postId = [];
const postFragment = document.createDocumentFragment();

const renderPost = (array, node) => {
  node.innerHTML = "";
  array.forEach((e) => {
    postId.push(e.id);
    const newPostTemp = elListPostTemp.cloneNode(true);
    newPostTemp.querySelector(".post-list__title").textContent = e.title;
    newPostTemp.querySelector(".post-list__body").textContent = e.body;
    newPostTemp.querySelector(".post-list__item").dataset.id = e.id;

    postFragment.appendChild(newPostTemp);
  });
  node.appendChild(postFragment);
};

async function getPosts(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const data = await response.json();
  renderPost(data, elListPost);
}

elListUser.addEventListener("click", (evt) => {
  elListComment.innerHTML = "";
  if (evt.target.matches(".user-list__item")) {
    const usersItemId = evt.target.dataset.id - 0;
    userId.forEach((e) => {
      if (usersItemId === e) {
        getPosts(e);
      }
    });
  }
});



// COMMENTS
const commentFragment = document.createDocumentFragment();

const renderComments = (array, node) => {
  node.innerHTML = "";
  if (array.length > 0) {
    array.forEach((e) => {
      const newCommentTemp = elListCommentTemp.cloneNode(true);
      newCommentTemp.querySelector(".comment-list__name").textContent = e.name;
      newCommentTemp.querySelector(".comment-list__email").textContent = e.email;
      newCommentTemp.querySelector(".comment-list__email").href = `mailto:${e.email}`;
      newCommentTemp.querySelector(".comment-list__body").textContent = e.body;

      commentFragment.appendChild(newCommentTemp);
    });
  }
  node.appendChild(commentFragment);
};

async function getComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const data = await response.json();
  renderComments(data, elListComment);
}

elListPost.addEventListener("click", (evt) => {
  if (evt.target.matches(".post-list__item")) {
    const postItemId = evt.target.dataset.id - 0;
    postId.forEach((e) => {
      if (postItemId === e) {
        getComments(e);
      }
    });
  }
});
