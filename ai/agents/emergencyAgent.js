export function emergencyAgent(message) {

const text =
message.toLowerCase();

const emergencyKeywords = [

```
"heart attack",
"stroke",
"can't breathe",
"critical",
"emergency",
"blood",
"collapsed"
```

];

return emergencyKeywords.some(
(word) =>
text.includes(word)
);
}
