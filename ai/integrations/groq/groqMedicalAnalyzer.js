import groq from "./groqClient.js";
import diagnosisPrompt from "../../prompts/diagnosisPrompt.js";

export async function analyzeSymptoms(symptoms) {

try {

```
const completion =
  await groq.chat.completions.create({

    model: "llama3-70b-8192",

    messages: [

      {
        role: "system",
        content: diagnosisPrompt
      },

      {
        role: "user",
        content: symptoms
      }
    ]
  });

return completion.choices[0].message.content;
```

} catch (error) {

```
console.log(error);

return "Diagnosis failed.";
```

}
}
