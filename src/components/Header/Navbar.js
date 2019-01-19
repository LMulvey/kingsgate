import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import media from 'styled-media-query';

import BookAnAppointment from './BookAnAppointment';
import KingsgateLogo from '../../images/kingsgate-logo.png';

export const ROOT_URL_QUERY = graphql`
  query ROOT_URL_QUERY {
    site {
      siteMetadata {
        rootUrl
      }
    }
  }
`;

const NavbarContainer = styled.div`
  height: 68px;
  background-color: ${props => props.theme.darkBlue};
  border-top: 4px solid ${props => props.theme.red};
  color: ${props => props.theme.white};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  padding: 5px 10px;
  ${media.lessThan('1100px')`font-size: 14px;`};
`;

const StyledLogo = styled.img`
  margin: 0;
`;

const RightNav = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const StyledLinksContainer = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  flex-basis: 1 1 30%;
  margin: 0 30px 0;
  ${media.lessThan('1100px')`margin-right: 10px;`};
`;

const StyledLink = styled.li`
  width: ${props => (props.large ? '150px' : '90px')};
  ${media.lessThan('1100px')`width: ${props =>
    props.large ? '140px' : '70px'};`};
  height: 63px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  transition: background 125ms ease-in-out;

  & a {
    color: ${props => props.theme.grey};
    position: relative;
    padding: 0;
    margin: 0;
  }

  & a:before {
    content: '';
    width: ${props => (props.large ? '140px' : '60px')};
    height: 1px;
    position: absolute;
    bottom: -4px;
    left: 50%;
    background: ${props => props.theme.orange};
    transform: scaleX(0) translateX(-50%);
    transform-origin: left;
    transition: transform 125ms ease-out;
  }

  &:hover {
    background-color: ${props => props.theme.darkerBlue};
    cursor: pointer;

    & a {
      color: white;
    }

    & a:before {
      transform: scaleX(1) translateX(-50%);
    }
  }
`;

const Navbar = () => {
  return (
    <StaticQuery
      query={ROOT_URL_QUERY}
      render={({
        site: {
          siteMetadata: { rootUrl },
        },
      }) => (
        <NavbarContainer>
          <a href={rootUrl}>
            <StyledLogo
              src={KingsgateLogo}
              alt="Kingsgate Automotive | Automotive Repair, Edmonton, Alberta"
            />
          </a>
          <RightNav>
            <StyledLinksContainer>
              <StyledLink>
                <a href="/">Home</a>
              </StyledLink>
              <StyledLink>
                <a href="/services">Services</a>
              </StyledLink>
              <StyledLink>
                <a href="/about">About</a>
              </StyledLink>
              <StyledLink large>
                <a href="/carcare">Be Car Care Aware</a>
              </StyledLink>
            </StyledLinksContainer>
            <BookAnAppointment />
          </RightNav>
        </NavbarContainer>
      )}
    />
  );
};

export default Navbar;
