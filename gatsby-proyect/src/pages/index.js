import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import '../styles/home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header title="Noticias" />
      <div className="home">
        <h1>Bienvenido a Noticias</h1>
        <div className="card-grid">
          {/* Tarjeta 1 */}
          <Link to="/tech" className="card">
            <StaticImage
              src="../images/tech.jpg"
              alt="Tecnología"
              className="card-image"
            />
            <p className="card-title">Tecnología</p>
          </Link>
          {/* Tarjeta 2 */}
          <Link to="/sports" className="card">
            <StaticImage
              src="../images/sports.jpg"
              alt="Deportes"
              className="card-image"
            />
            <p className="card-title">Deportes</p>
          </Link>
          {/* Tarjeta 3 */}
          <Link to="/policy" className="card">
            <StaticImage
              src="../images/policy.jpg"
              alt="Política"
              className="card-image"
            />
            <p className="card-title">Política</p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
