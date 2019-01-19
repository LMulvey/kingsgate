import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { colors } from '../utils';
import Header from './Header';
import ScreenClassProvider from '../utils/ScreenClassContext';
import 'semantic-ui-css/semantic.min.css';
import './layout.css';
import 'react-day-picker/lib/style.css';

const Layout = ({ children }) => (
  <ThemeProvider theme={colors}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <ScreenClassProvider>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: '0 auto',
              padding: '0',
              maxWidth: '1400px',
              border: '1px solid rgba(52, 67, 105, 0.3)',
              borderWidth: '0 1px',
            }}
          >
            {children}
          </div>
        </ScreenClassProvider>
      )}
    />
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
