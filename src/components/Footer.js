import React from 'react';
import styled from 'styled-components';
import { scale } from '../utils/typography';

const StyledFooter = styled.footer`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  ${scale(-0.5)}
  a {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Theme design is <u><a href="https://github.com/MattLParker/Website">Open Source</a></u>. Blog content copyright 2019.
      <br />
      <u><a href="https://www.elusivecode.net/blog">Blog</a></u> |{' '}
      <u><a href="https://www.elusivecode.net/aboutme">About-Me</a></u> |{' '}
      <u><a href="https://www.elusivecode.net/rss.xml">rss</a></u>
    </p>
  </StyledFooter>
);

export default Footer;
