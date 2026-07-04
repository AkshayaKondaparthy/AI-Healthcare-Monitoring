import groq from "./groqClient.js";
import chatbotPrompt from "../../prompts/chatbotPrompt.js";

export async function groqChat(userMessage) {

try {

```
const completion =
  await groq.chat.completions.create({

    messages: [
      {
        role: "system",
        content: chatbotPrompt
      },
      {
        role: "user",
        content: userMessage
      }
    ],

    model: "llama3-70b-8192",

    temperature: 0.4
  });

return completion.choices[0].message.content;
```

} catch (error) {

```
console.log(error);

return "AI response failed.";
```

}
}
