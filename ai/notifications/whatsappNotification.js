import client
from "../integrations/twilio/twilioClient.js";

export async function whatsappNotification(
phone,
message
) {

return await client.messages.create({

```
body: message,

from:
  "whatsapp:" +
  process.env.TWILIO_WHATSAPP,

to:
  "whatsapp:" + phone
```

});
}
