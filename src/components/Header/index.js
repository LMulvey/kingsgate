import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Subbar from './Subbar';
import Mobile from './Mobile';

import {
  ScreenClassContext,
  isLessThanLg,
} from '../../utils/ScreenClassContext';

const Header = () => (
  <ScreenClassContext.Consumer>
    {screenClass => {
      return !isLessThanLg(screenClass) ? (
        <>
          <Navbar />
          <Subbar />
        </>
      ) : (
        <Mobile />
      );
    }}
  </ScreenClassContext.Consumer>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
