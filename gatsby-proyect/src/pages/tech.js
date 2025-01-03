import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import '../styles/sports.css';

export const Head = () => <title>Tecnología</title>;

const TechPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allNewsArticle(filter: { category: { eq: "technology" } }) {
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
    <Layout title="Tecnología">
      <h2 className="sports-title">Últimas Noticias de Tecnología</h2>
      <div className="cardnews-grid">
        {articles.map((article, index) => (
          <div key={index} className="cardnews-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="cardnews-image"
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

export default TechPage;
