import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Noticias. Todos los derechos reservados.
    </footer>
  );
};

export default Footer;
