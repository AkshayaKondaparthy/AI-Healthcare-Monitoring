export async function liveTranscription() {

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!SpeechRecognition)
return;

const recognition =
new SpeechRecognition();

recognition.continuous =
true;

recognition.lang =
"en-US";

recognition.start();

recognition.onresult =
(event) => {

```
  console.log(

    event.results[
      event.results.length - 1
    ][0].transcript
  );
};
```

}
