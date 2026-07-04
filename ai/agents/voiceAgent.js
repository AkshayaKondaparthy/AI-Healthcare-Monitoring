export function voiceAgent(text) {

const speech =
new SpeechSynthesisUtterance(
text
);

speech.lang = "en-US";

window.speechSynthesis.speak(
speech
);
}
