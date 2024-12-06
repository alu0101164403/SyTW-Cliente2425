const axios = require('axios');
const path = require('path');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const API_KEY = '27ed3557dfb9494fb42efb0eb483f325';
  const categories = ['sports', 'technology', 'politics'];

  for (const category of categories) {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        country: 'es',
        apiKey: API_KEY,
      },
    });

    response.data.articles.forEach((article) => {
      createNode({
        ...article,
        id: createNodeId(`${category}-${article.title}`),
        category,
        internal: {
          type: 'NewsArticle',
          contentDigest: createContentDigest(article),
        },
      });
    });
  }
};



exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allNewsArticle {
        nodes {
          id
          category
          title
          description
          content
          url
        }
      }
    }
  `);

  result.data.allNewsArticle.nodes.forEach((article) => {
    createPage({
      path: `/news/${article.id}`,
      component: path.resolve('./src/templates/newsTemplate.js'),
      context: {
        id: article.id,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type NewsArticle implements Node {
      id: ID!
      category: String
      title: String
      description: String
      content: String
      url: String
      urlToImage: String
    }
  `);
};


