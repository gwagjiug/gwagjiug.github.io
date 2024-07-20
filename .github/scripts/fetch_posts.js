const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

async function fetchPosts() {
  try {
    const response = await axios.get('https://api.velog.io/rss/@gawgjiug');
    const result = await xml2js.parseStringPromise(response.data);
    const items = result.rss.channel[0].item;
    const posts = items
      .map((item) => ({
        title: item.title[0],
        link: item.link[0],
        description: item.description[0],
        pubDate: item.pubDate[0],
        thumbnail: item['media:content']
          ? item['media:content'][0].$.url
          : null,
      }))
      .slice(0, 6); // 최신 6개 포스트만 저장
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

fetchPosts();
