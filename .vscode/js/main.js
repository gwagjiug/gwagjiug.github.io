window.addEventListener('load', fetchVelogPosts);

async function fetchVelogPosts() {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://api.velog.io/rss/@gawgjiug';

  try {
    const response = await fetch(corsProxy + url);
    if (!response.ok) throw new Error('Network response was not ok');
    const text = await response.text();

    const xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');

    if (items.length > 0) {
      displayPosts(items);
    } else {
      displayError('No posts found');
    }
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    displayError('Failed to load posts');
  }
}

function displayPosts(items) {
  const postContainer = document.querySelector('.post-container');
  postContainer.innerHTML = ''; // Clear existing content

  const postsToShow = Math.min(items.length, 6);
  for (let i = 0; i < postsToShow; i++) {
    const item = items[i];
    const postData = {
      title: getElementText(item, 'title'),
      link: getElementText(item, 'link'),
      description: getElementText(item, 'description'),
      pubDate: new Date(getElementText(item, 'pubDate')).toUTCString(),
    };
    const postCard = createPostCard(postData);
    postContainer.appendChild(postCard);
  }
}

function getElementText(parent, tagName) {
  const element = parent.getElementsByTagName(tagName)[0];
  return element ? element.textContent : '';
}

function createPostCard(postData) {
  const postCard = document.createElement('a');
  postCard.href = postData.link;
  postCard.className = 'post-card';
  postCard.target = '_blank';

  postCard.innerHTML = `
    <img src="./images/work/velog_logo.png" alt="velog logo">
    <div class="post-content">
      <h4 class="post-title">${postData.title}</h4>
      <p class="post-description">${postData.description.substring(
        0,
        100,
      )}...</p>
      
    </div>
  `;

  return postCard;
}

function displayError(message) {
  const postContainer = document.querySelector('.post-container');
  postContainer.innerHTML = `<p>${message}. Please try again later.</p>`;
}
