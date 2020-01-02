import { useStaticQuery, graphql } from 'gatsby';
import { createSafeObject } from '../helpers/createSafeObject';

const messagesQuery = graphql`
  query PrismicMessagesQuery {
    prismicGlobalSettings {
      data {
        messages_appointment_success_popup {
          html
          text
        }
        messages_appointment_review_message {
          html
          text
        }
        messages_appointment_default_cta {
          text
          html
        }
        messages_appointment_holiday {
          text
          html
        }
        messages_shop_status_closed {
          text
          html
        }
        messages_shop_status_holiday {
          html
          text
        }
        messages_shop_status_limited_availability {
          html
          text
        }
        messages_shop_status_open {
          html
          text
        }
      }
    }
  }
`;

function trimMessageKeys(messagesObj) {
  return Object.entries(messagesObj).reduce((acc, [key, val]) => {
    const trimmedKey = key.replace('messages_', '');
    acc[trimmedKey] = val;
    return acc;
  }, {});
}

export function useMessages() {
  const data = useStaticQuery(messagesQuery);
  const messages = data.prismicGlobalSettings.data;
  const cleanMessagesObject = trimMessageKeys(messages);
  const safeMessagesObject = createSafeObject(
    cleanMessagesObject,
    'Invalid Message Key'
  );
  return safeMessagesObject;
}
