export function sarvamTTS(text) {

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "hi-IN";

speech.rate = 0.9;

window.speechSynthesis.speak(speech);
}
