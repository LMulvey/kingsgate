import React from 'react';
import { graphql } from 'gatsby';

import { allPrismicHomepageShape } from '../gql/shapes';
import Layout from '../components/layout';
import { Container, Row, Col } from 'react-grid-system';
import SEO from '../components/seo';

const IndexPage = ({ data: { allPrismicHomepage } }) => {
  const {
    hero_image,
    section_1_title,
    section_1_blurb,
    // tagline_hero,
    // section_1_highlight_1,
    // section_1_highlight_2,
    // section_1_highlight_3,
    // section_2_title,
    // section_2_blurb,
    // section_2_highlight_1,
    // section_2_highlight_2,
    // section_2_highlight_3,
  } = allPrismicHomepage.edges[0].node.data;
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <Container fluid style={{ padding: 0 }}>
        <Row>
          <Col xs={12}>
            <img src={hero_image.url} alt={hero_image.alt} />
          </Col>
        </Row>
        <Row>
          <Col xs={10} offset={{ xs: 1 }} style={{ textAlign: 'center' }}>
            <h1>{section_1_title.text}</h1>
            <p>{section_1_blurb.text}</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: allPrismicHomepageShape,
};

export const HOMEPAGE_QUERY = graphql`
  query HOMEPAGE_QUERY {
    allPrismicHomepage {
      edges {
        node {
          data {
            hero_image {
              url
              copyright
              alt
            }
            tagline_hero {
              text
              html
            }
            section_1_title {
              text
              html
            }
            section_1_blurb {
              text
              html
            }
            section_1_highlight_1 {
              text
              html
            }
            section_1_highlight_2 {
              text
              html
            }
            # section_1_highlight_3 {
            #   text
            #   html
            # }
            # section_2_title {
            #   text
            #   html
            # }
            # section_2_blurb {
            #   text
            #   html
            # }
            # section_2_highlight_1 {
            #   text
            #   html
            # }
            # section_2_highlight_2 {
            #   text
            #   html
            # }
            # section_2_highlight_3 {
            #   text
            #   html
            # }
          }
        }
      }
    }
  }
`;

export default IndexPage;
