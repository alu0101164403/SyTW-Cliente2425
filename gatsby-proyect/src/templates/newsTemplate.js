import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import Rating from '../components/Rating';
import '../styles/newsTemplate.css'; 

export const Head = ({ data }) => <title>{data.newsArticle.title}</title>;

const NewsTemplate = ({ data }) => {
  const article = data.newsArticle; 

  return (
    <Layout title={article.title}>
      <article className="news-article">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-image"
          />
        )}
        <h1 className="news-title">{article.title}</h1>
        <p className="news-description">{article.description}</p>
        <section className="news-content">
          <p>{article.content}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
            Leer más
          </a>
          <Rating articleId={article.id} />
        </section>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    newsArticle(id: { eq: $id }) {
      title
      description
      content
      url
      category
      urlToImage
    }
  }
`;

export default NewsTemplate;
