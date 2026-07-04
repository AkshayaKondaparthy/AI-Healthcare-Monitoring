import client from "./twilioClient.js";

export async function emergencyCall(
phone
) {

try {

```
const call =
  await client.calls.create({

    twiml: `
    <Response>
      <Say>
        Emergency alert from AI Healthcare System.
      </Say>
    </Response>
    `,

    to: phone,

    from:
      process.env.TWILIO_PHONE
  });

return call.sid;
```

} catch (error) {

```
console.log(error);

return null;
```

}
}
