import { createIntl, createIntlCache } from "@formatjs/intl";

import fr from "./fr";

const cache = createIntlCache();
export const intl = createIntl(
  {
    // Locale of the application
    locale: "fr",
    defaultLocale: "fr",
    messages: fr,
  },
  cache
);

export default intl.formatMessage;
