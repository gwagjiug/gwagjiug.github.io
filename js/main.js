window.addEventListener('load', fetchVelogPosts);

async function fetchVelogPosts() {
  try {
    const response = await fetch('posts.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    displayError('Failed to load posts');
  }
}

function displayPosts(posts) {
  const postContainer = document.querySelector('.post-container');
  postContainer.innerHTML = ''; // Clear existing content
  posts.forEach((postData) => {
    const postCard = createPostCard(postData);
    postContainer.appendChild(postCard);
  });
}

function createPostCard(postData) {
  const postCard = document.createElement('a');
  postCard.href = postData.link;
  postCard.className = 'post-card';
  postCard.target = '_blank';
  const thumbnailUrl = postData.thumbnail || './images/work/velog_logo.png';
  postCard.innerHTML = `
    <img src="${thumbnailUrl}" alt="${
    postData.title
  }" onerror="this.src='./images/work/velog_logo.png';">
    <div class="post-content">
      <h3 class="post-title">${postData.title}</h3>
      <p class="post-description">${postData.description.substring(
        0,
        100,
      )}...</p>
      <span class="post-date">${new Date(
        postData.pubDate,
      ).toLocaleDateString()}</span>
    </div>
  `;
  return postCard;
}

function displayError(message) {
  const postContainer = document.querySelector('.post-container');
  postContainer.innerHTML = `<p>${message}. Please try again later.</p>`;
}

function toggleMenu() {
  const $navMenu = document.getElementById('nav__menu');
  $navMenu.classList.toggle('show');
}

function init() {
  const $navToggle = document.getElementById('nav-toggle');
  $navToggle.addEventListener('click', () => {
    //Menu 토글
    toggleMenu();
  });

  const $navLinkList = document.querySelectorAll('.nav__link');
  $navLinkList.forEach((el) => el.addEventListener('click', toggleMenu));
}
init();
