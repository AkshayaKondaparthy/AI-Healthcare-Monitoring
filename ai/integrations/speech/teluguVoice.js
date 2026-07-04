export function teluguVoice(text) {

const synth =
window.speechSynthesis;

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "te-IN";

const voices =
synth.getVoices();

const teluguVoice =
voices.find(

```
  (voice) =>
    voice.lang.includes("te")
);
```

if (teluguVoice) {

```
speech.voice =
  teluguVoice;
```

}

speech.rate = 0.9;

speech.pitch = 1;

synth.speak(speech);
}
