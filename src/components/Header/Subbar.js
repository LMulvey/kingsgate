import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import media from 'styled-media-query';
import { Icon } from 'semantic-ui-react';
import {
  openStatus,
  resolveStatusColor,
  resolveStatusString,
} from '../../utils/hoursHelper';

export const MESSAGES_QUERY = graphql`
  query MESSAGES_QUERY {
    allPrismicGlobalSettings {
      edges {
        node {
          data {
            messages_shop_status_limited_availability {
              text
            }
            messages_shop_status_holiday {
              text
            }
            messages_shop_status_open {
              text
            }
            messages_shop_status_closed {
              text
            }
          }
        }
      }
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  background: ${props => props.theme.lightBlue};
  height: 60px;
  padding: 5px 10px;
  font-size: 16px;
  ${media.lessThan('1235px')`font-size: 14px;`};
`;

const Time = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const OpenStatus = styled.div`
  height: 100%;
  font-weight: 700;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  margin: 0 15px 0 0;
  flex-shrink: 0;
  background-color: ${props => resolveStatusColor(props)};
`;

const StyledIconWhite = styled(Icon)`
  color: white;
`;

const StyledBlueIcon = styled(Icon)`
  color: #202a42;
  text-shadow: 1px 1px 0px #1a2134;
  margin-right: 15px;
`;

const Contact = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  ${media.lessThan('1235px')`font-size: 14px;`};
  & a {
    color: white;
  }
`;

const Address = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  ${media.lessThan('1235px')`font-size: 12px;`};
  margin-right: 30px;
  color: white;
`;

const BusinessHours = styled.p`
  flex-shrink: 1;
`;

const Subbar = () => (
  <StyledContainer>
    <Time>
      <StyledIconWhite name="clock outline" size="big" />
      <OpenStatus openStatus={openStatus}>
        <StaticQuery
          query={MESSAGES_QUERY}
          render={({ allPrismicGlobalSettings: { edges } }) =>
            resolveStatusString(openStatus, edges[0].node.data)
          }
        />
      </OpenStatus>
      <BusinessHours>
        Regular business hours are Monday - Friday, 8am - 5pm.
      </BusinessHours>
    </Time>
    <Contact>
      <Address>
        <StyledBlueIcon name="map marker alternate" size="large" />
        <p>
          11404 156 Street NW
          <br />
          Edmonton, AB T5M 3N2
        </p>
      </Address>
      <Phone>
        <StyledBlueIcon name="phone" />
        <p>
          <a href="tel:17804831429">(780) 483-1429</a>
        </p>
      </Phone>
    </Contact>
  </StyledContainer>
);

export default Subbar;
