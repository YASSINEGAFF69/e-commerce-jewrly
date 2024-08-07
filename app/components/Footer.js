import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>Developed by <a href='https://github.com/YASSINEGAFF69/e-commerce-jewrly'>Yassine Gafsoui</a></p>
      <p>2024 khitandbeads All rights reserved</p>
      <p className="icons">
        <a href='https://www.instagram.com/5itandbeads_shop.tn/' target="_blank" rel="noopener noreferrer">
          <AiFillInstagram />
        </a>
        <a href='https://twitter.com/your_twitter_handle' target="_blank" rel="noopener noreferrer">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
}

export default Footer;
