import PropTypes from 'prop-types';

/**
 * Shape Factory Pieces
 */
const resolvePrismicShapeWithData = dataShape =>
  PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.string,
        data: dataShape,
      })
    ),
  });

const prismicDataNodeShape = PropTypes.shape({
  html: PropTypes.string,
  text: PropTypes.string,
  raw: PropTypes.string,
});

const prismicDataImageShape = PropTypes.shape({
  alt: PropTypes.string,
  copyright: PropTypes.string,
  url: PropTypes.string,
});

const allPrismicHomepageDataShape = PropTypes.shape({
  hero_image: prismicDataImageShape,
  tagline_hero: prismicDataNodeShape,
  section_1_title: prismicDataNodeShape,
  section_1_blurb: prismicDataNodeShape,
  section_1_highlight_1: prismicDataNodeShape,
  section_1_highlight_2: prismicDataNodeShape,
  section_1_highlight_3: prismicDataNodeShape,
  section_2_title: prismicDataNodeShape,
  section_2_blurb: prismicDataNodeShape,
  section_2_highlight_1: prismicDataNodeShape,
  section_2_highlight_2: prismicDataNodeShape,
  section_2_highlight_3: prismicDataNodeShape,
});

const allPrismicGlobalSettingsDataShape = PropTypes.shape({
  messages_shop_status_limited_availability: prismicDataNodeShape,
  messages_shop_status_holiday: prismicDataNodeShape,
  messages_shop_status_open: prismicDataNodeShape,
  messages_shop_status_closed: prismicDataNodeShape,
});

/**
 * Exported Data Shapes
 */
export const allPrismicHomepageShape = resolvePrismicShapeWithData(
  allPrismicHomepageDataShape
);

export const allPrismicGlobalSettingsShape = resolvePrismicShapeWithData(
  allPrismicGlobalSettingsDataShape
);
