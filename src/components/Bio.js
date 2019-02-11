import React from 'react';

import profilePic from './avatar.png';
import { rhythm } from '../utils/typography';
import { colors } from '../utils/theme';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Matt Parker`}
          style={{
            borderRadius: '50%',
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p style={{ color: colors.green }}>
          By <strong>Matt Parker</strong>{' '}
          <a
            style={{ color: colors.green }}
            href="https://www.twitter.com/mlparker1"
            target="_blank"
          >
          </a>
        </p>
      </div>
    );
  }
}

export default Bio;
