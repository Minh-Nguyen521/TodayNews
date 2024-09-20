import config from "./config";

async function fetchNews(data) {
  const NEWS_KEY = config.NEWS_API;

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${data}&sortBy=relevancy&pageSize=10&apiKey=${NEWS_KEY}`
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to fetch news");
}

export default fetchNews;
