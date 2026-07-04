import { teluguVoice }
from "./teluguVoice.js";

import { hindiVoice }
from "./hindiVoice.js";

import { englishVoice }
from "./englishVoice.js";

export function multilingualVoice(
text,
language
) {

switch (language) {

```
case "te":
  teluguVoice(text);
  break;

case "hi":
  hindiVoice(text);
  break;

default:
  englishVoice(text);
```

}
}
