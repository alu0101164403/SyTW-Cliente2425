/**
 * @type {import('gatsby').GatsbyConfig}
 */

const axios = require('axios');

module.exports = {
  siteMetadata: {
    title: `GatsbyProyect`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'NEWSAPI',
        fieldName: 'newsapi',
        createLink: () => {
          return {
            fetch: async (url, options) => {
              const { body } = JSON.parse(options.body);
              const response = await axios.get(`https://newsapi.org/v2/${body.operationName}`, {
                params: body.variables,
                headers: { Authorization: `Bearer 27ed3557dfb9494fb42efb0eb483f325` }, 
              });
              return {
                json: async () => ({ data: response.data }),
              };
            },
          };
        },
      },
    },
    "gatsby-transformer-json",
  ],
};
