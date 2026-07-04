import groq from "./groqClient.js";
import dischargePrompt from "../../prompts/dischargePrompt.js";

export async function generateSummary(data) {

try {

```
const completion =
  await groq.chat.completions.create({

    model: "llama3-70b-8192",

    messages: [

      {
        role: "system",
        content: dischargePrompt
      },

      {
        role: "user",
        content: JSON.stringify(data)
      }
    ]
  });

return completion.choices[0].message.content;
```

} catch (error) {

```
console.log(error);

return "Summary generation failed.";
```

}
}
