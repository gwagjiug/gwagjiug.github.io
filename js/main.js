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

const options = {
  threshold: 0.8,
  // 지정한 부분이 50%정도 보이면 실행.
  // 1로하게 되면 완전히 보였을 때 실행.
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    if (entry.isIntersecting) {
      // 교차가 되었다면
      // entry.target.classList.add('bg-dark');
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        .classList.add('active-link');

      const $items = document.querySelectorAll(
        `.nav__link:not([href*=${sectionId}])`,
      );
      $items.forEach((el) => el.classList.remove('active-link'));
    }
  });
}, options);

const $sectionList = document.querySelectorAll('.section');
$sectionList.forEach((el) => observer.observe(el));
// viewport에서 사라지고 생기는 걸 감지

// workSection을 observe api가 감지하는 것 감지가 되면 콜백함수 실행
// ScrollReveal 초기화
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
});

scrollReveal.reveal('.home__data, .about_img, .skills__text');
scrollReveal.reveal('.home__img, .about_data, .skills__img', { delay: 400 });
scrollReveal.reveal('.skills__data, .post-container, .comment', {
  interval: 200,
});
// 데이터 0.2초간격 인터벌 적용
