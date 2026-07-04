import client from "./twilioClient.js";

export async function smsAlert(
phone,
message
) {

try {

```
const sms =
  await client.messages.create({

    body: message,

    to: phone,

    from:
      process.env.TWILIO_PHONE
  });

return sms.sid;
```

} catch (error) {

```
console.log(error);

return null;
```

}
}
