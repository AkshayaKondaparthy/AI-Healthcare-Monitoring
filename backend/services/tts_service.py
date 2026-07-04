from gtts import gTTS
import os

def speak(text, lang="en"):

    tts = gTTS(
        text=text,
        lang=lang
    )

    tts.save("voice.mp3")

    os.system("start voice.mp3")