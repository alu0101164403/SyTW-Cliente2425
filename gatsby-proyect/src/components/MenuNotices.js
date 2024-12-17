import React from 'react';
import { Link } from 'gatsby';
import '../styles/menuNotices.css';
import { StaticImage } from 'gatsby-plugin-image';

const categories = [
  { name: 'Home', path: '/', image: <StaticImage src="../images/hogar.png" alt="Tecnología" width={70} height={70} placeholder="blurred" layout="constrained" /> },
  { name: 'Tecnología', path: '/tech', image: <StaticImage src="../images/tech-icon.png" alt="Tecnología" width={70} height={70} placeholder="blurred" layout="constrained" /> },
  { name: 'Deportes', path: '/sports', image: <StaticImage src="../images/sports-icon.png" alt="Deportes" width={70} height={70} placeholder="blurred" layout="constrained" /> },
  { name: 'Política', path: '/policy', image: <StaticImage src="../images/policy-icon.png" alt="Política" width={70} height={70} placeholder="blurred" layout="constrained" /> },
];

const NewsMenu = () => {
  return (
    <nav className="news-menu">
      {categories.map((category) => (
        <Link to={category.path} key={category.name} className="menu-button">
          <div className="menu-icon">
            {category.image}
          </div>
          <span className="menu-title">{category.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NewsMenu;
