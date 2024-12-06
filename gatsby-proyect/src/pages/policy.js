import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import '../styles/sports.css';

export const Head = () => <title>Política</title>;

const PolicyPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allNewsArticle(filter: { category: { eq: "politics" } }) {
        nodes {
          id
          title
          description
          urlToImage
        }
      }
    }
  `);

  const articles = data.allNewsArticle.nodes;

  return (
    <Layout title="Política">
      <h2>Últimas Noticias de Política</h2>
      <div className="cardnews-grid">
        {articles.map((article, index) => (
          <div key={index} className="cardnews-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="card-image"
              />
            )}
            <div className="cardnews-content">
              <Link to={`/news/${article.id}`} className="cardnews-card-title">
                <h3>{article.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PolicyPage;
