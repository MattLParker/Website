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
      Copyright 2019.
      <br />
      <a href="mailto:MLParker1+website@gmail.com">mail</a> |{' '}
      <a href="https://www.twitter.com/MLParker1">twitter</a> |{' '}
      <a href="https://www.elusivecode.net/rss.xml">rss</a>
    </p>
  </StyledFooter>
);

export default Footer;
