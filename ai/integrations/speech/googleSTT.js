export async function googleSTT() {

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!SpeechRecognition) {

```
alert("Speech Recognition not supported");

return;
```

}

return new Promise((resolve) => {

```
const recognition =
  new SpeechRecognition();

recognition.lang = "en-US";

recognition.start();

recognition.onresult = (event) => {

  const transcript =
    event.results[0][0].transcript;

  resolve(transcript);
};
```

});
}
