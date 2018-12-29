import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Subbar from './Subbar';
import {
  ScreenClassContext,
  isLessThanLg,
} from '../../utils/ScreenClassContext';

const Header = ({ siteTitle }) => (
  <ScreenClassContext.Consumer>
    {screenClass => {
      console.log('Hey!', screenClass);
      return !isLessThanLg(screenClass) ? (
        <>
          <Navbar />
          <Subbar />
        </>
      ) : (
        'mobile?'
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
