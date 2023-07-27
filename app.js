const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const NEWS_DATA_PATH = path.join(__dirname, 'newsData.json');


app.get('/getTimeStories', (req, res) => {
  try {
    
    const rawData = fs.readFileSync(NEWS_DATA_PATH);
    const newsData = JSON.parse(rawData);

    newsData.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Take the latest 6 news articles
    const latestNews = newsData.articles.slice(0, 6);

    res.json(latestNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
