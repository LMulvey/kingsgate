import React from 'react';
import { StaticQuery, navigate } from 'gatsby';
import styled from 'styled-components';
import { Button, Icon, List } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-grid-system';

import KingsgateLogo from '../../images/kingsgate-logo.png';
import { ROOT_URL_QUERY } from './Navbar';
import { MESSAGES_QUERY } from './Subbar';
import {
  openStatus,
  resolveStatusColor,
  resolveStatusString,
  ScreenClassContext,
  isLessThanSm,
  isLessThanMd,
  media,
  KGIcon,
} from '../../utils';

const MobileNavContainer = styled(Container)`
  background-color: ${props => props.theme.darkBlue};
  padding: 25px 10px;
  height: 100vh;

  & .ui.divided.inverted.relaxed.list.borderTop {
    border-top-width: 1px;
  }
`;

const StyledOrangeIcon = styled(Icon)`
  color: ${props => props.theme.orange};
  text-shadow: 1px 1px 0px #1a2134;
  margin-right: 15px;
`;

const StyledBlueIcon = styled(Icon)`
  color: #202a42;
  text-shadow: 1px 1px 0px #1a2134;
  margin-right: 15px;
`;

const WhiteLink = styled.a`
  color: white;
`;

const Phone = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-size: 24px;
  background: ${props => props.theme.lightBlue};
  padding: 5px 10px;
  border-radius: 6px;
  & :active {
    background: ${props => props.theme.darkBlue};
  }
`;

const Address = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 5px 10px;
  color: white;
  text-align: center;
  margin-top: 10px;
`;

const StyledLogo = styled.img`
  margin: 0 0 10px 0;
`;

const Time = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: white;
`;

const OpenStatus = styled.div`
  height: 100%;
  font-weight: 700;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  flex-shrink: 0;
  background-color: ${props => resolveStatusColor(props)};
  ${media.lessThan('400px')`font-size: 12px; padding: 8px;`};
`;

const BusinessHours = styled.p`
  color: white;
  text-align: center;
  margin: 0;
  &&& {
    ${media.lessThan('md')`margin-top: 10px;`};
  }
`;

const StyledIconWhite = styled(Icon)`
  color: white;
`;

const StyledRow = styled(Row)`
  background: ${props => props.theme.lightBlue};
  padding: 15px;
  margin: 15px 0;
`;

const MarginTopCol = styled(Col)`
  ${media.lessThan('sm')`margin-top: 15px;`};
`;

const StyledArrow = styled.span`
  color: white;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-size: 60px;
  transition: all 50ms ease-out;

  &:hover,
  &:focus {
    cursor: pointer;
    font-size: 80px;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledListIcon = styled(List.Icon)`
  color: white;
`;

const StyledListHeader = styled(List.Header)`
  text-align: center;
`;

const StyledListItem = styled(List.Item)`
  ${media.lessThan('md')`
    border-top: 1px solid rgba(255,255,255,.1) !important;
    margin-top: 2px;
  `};
`;

const StyledButton = styled(Button)`
  &&& {
    height: 40px;
    background-color: ${props => props.theme.orange};
    color: white;
    transition: background 125ms ease-out;
    flex-shrink: 0;
    ${media.lessThan('1100px')`font-size: 14px;`};
    ${media.lessThan('lg')`width: 100%;`};
    &:hover {
      background-color: rgba(235, 165, 0);
    }
  }
`;

function handleArrowClick() {
  if (window) {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }
}

const Mobile = () => {
  return (
    <ScreenClassContext.Consumer>
      {screenClass => (
        <MobileNavContainer fluid>
          <Row style={{ textAlign: 'center' }}>
            <Col xs={12}>
              <StaticQuery
                query={ROOT_URL_QUERY}
                render={({
                  site: {
                    siteMetadata: { rootUrl },
                  },
                }) => (
                  <a href={rootUrl}>
                    <StyledLogo
                      src={KingsgateLogo}
                      alt="Kingsgate Automotive | Automotive Repair, Edmonton, Alberta"
                    />
                  </a>
                )}
              />
            </Col>
          </Row>
          <Row align="center">
            <Col xs={12} sm={6} md={4} offset={{ md: 2 }}>
              <WhiteLink href="tel:17804831429">
                <Phone>
                  <StyledBlueIcon name="phone" />
                  <p>(780) 483-1429</p>
                </Phone>
              </WhiteLink>
            </Col>
            <MarginTopCol xs={12} sm={6} md={4} offset={{ md: 1 }} align="end">
              <StyledButton
                icon
                labelPosition="right"
                onClick={() => navigate('/book-an-appointment')}
              >
                Book an Appointment
                <Icon name="calendar plus" />
              </StyledButton>
            </MarginTopCol>
          </Row>
          <Row>
            <Col xs={12}>
              <WhiteLink href="https://goo.gl/maps/dHzjVp7cdXy">
                <Address>
                  <StyledOrangeIcon name="map marker alternate" size="large" />
                  <p>
                    11404 156 Street NW
                    <br />
                    Edmonton, AB T5M 3N2
                  </p>
                </Address>
              </WhiteLink>
            </Col>
          </Row>
          <StyledRow align="center">
            <Col xs={12} md={6}>
              <Time>
                {!isLessThanSm(screenClass) && (
                  <StyledIconWhite name="clock outline" size="big" />
                )}
                <OpenStatus openStatus={openStatus}>
                  <StaticQuery
                    query={MESSAGES_QUERY}
                    render={({ allPrismicGlobalSettings: { edges } }) =>
                      resolveStatusString(openStatus, edges[0].node.data)
                    }
                  />
                </OpenStatus>
              </Time>
            </Col>
            <Col xs={12} md={6}>
              <BusinessHours>
                Regular business hours are Monday - Friday, 8am - 5pm.
              </BusinessHours>
            </Col>
          </StyledRow>
          <Row justify="center">
            <Col xs={12} md={6}>
              <h2
                style={{
                  color: 'white',
                  marginBottom: isLessThanMd(screenClass) ? '10px' : '25px',
                  textAlign: 'center',
                  fontSize: isLessThanMd(screenClass) ? '16px' : null,
                }}
              >
                We offer the following services:
              </h2>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={12} md={6}>
              <List
                divided
                relaxed={isLessThanMd(screenClass) ? undefined : 'very'}
                verticalAlign="middle"
                size={isLessThanMd(screenClass) ? undefined : 'big'}
                inverted
              >
                <List.Item>
                  <StyledListIcon
                    name="wrench"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <StyledListHeader>
                      Front-end Repair and Alignment
                    </StyledListHeader>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <StyledListIcon>
                    <KGIcon
                      size="lg"
                      icon={['far', 'tire-flat']}
                      color="white"
                    />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>Tire Service & Sales</StyledListHeader>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <StyledListIcon>
                    <KGIcon size="lg" icon="bolt" color="white" />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>Electrical Service</StyledListHeader>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <StyledListIcon>
                    <KGIcon
                      size="lg"
                      icon={['far', 'engine-warning']}
                      color="white"
                    />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>
                      Engine Diagnostics & Repair
                    </StyledListHeader>
                  </List.Content>
                </List.Item>
              </List>
            </Col>
            <Col xs={12} md={6}>
              <List
                divided
                relaxed={isLessThanMd(screenClass) ? undefined : 'very'}
                verticalAlign="middle"
                size={isLessThanMd(screenClass) ? undefined : 'big'}
                inverted
                className={isLessThanMd(screenClass) ? 'borderTop' : null}
              >
                <StyledListItem>
                  <StyledListIcon
                    name="car"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <StyledListHeader>
                      Manufacturer's Scheduled Service
                    </StyledListHeader>
                  </List.Content>
                </StyledListItem>

                <List.Item>
                  <StyledListIcon>
                    <KGIcon size="lg" icon="snowflake" color="white" />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>AC Repair</StyledListHeader>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <StyledListIcon>
                    <KGIcon
                      size="lg"
                      icon={['far', 'temperature-low']}
                      color="white"
                    />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>Coolant Service</StyledListHeader>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <StyledListIcon>
                    <KGIcon size="lg" icon="cogs" color="white" />
                  </StyledListIcon>
                  <List.Content>
                    <StyledListHeader>
                      Transmission Maintenance
                    </StyledListHeader>
                  </List.Content>
                </List.Item>
              </List>
            </Col>
          </Row>
          <StyledArrow onClick={handleArrowClick}>↓</StyledArrow>
        </MobileNavContainer>
      )}
    </ScreenClassContext.Consumer>
  );
};

export default Mobile;
