export function googleTTS(text) {

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "en-US";

speech.rate = 1;

speech.pitch = 1;

window.speechSynthesis.speak(speech);
}
