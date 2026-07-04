import groq from "./groqClient.js";
import triagePrompt from "../../prompts/triagePrompt.js";

export async function triagePatient(patientData) {

try {

```
const completion =
  await groq.chat.completions.create({

    model: "llama3-70b-8192",

    messages: [

      {
        role: "system",
        content: triagePrompt
      },

      {
        role: "user",
        content: JSON.stringify(patientData)
      }
    ]
  });

return completion.choices[0].message.content;
```

} catch (error) {

```
console.log(error);

return "Triage failed.";
```

}
}
