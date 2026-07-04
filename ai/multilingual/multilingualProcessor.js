import { detectLanguage }
from "./languageDetector.js";

import { multilingualVoice }
from "../integrations/speech/multilingualVoice.js";

export function multilingualProcessor(
text
) {

const language =
detectLanguage(text);

multilingualVoice(
text,
language
);

return language;
}
