import React from 'react';
import PropTypes from 'prop-types';

const Logo = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>
        <i
          style={{ verticalAlign: 'bottom', fontSize: '45px' }}
          className="material-icons"
        >
          emoji_food_beverage
        </i>{' '}
        Kitchen Stories
      </h3>
    </div>
  );
};

export default Logo;
