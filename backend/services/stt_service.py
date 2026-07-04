import speech_recognition as sr

recognizer = sr.Recognizer()

# Better microphone sensitivity
recognizer.energy_threshold = 300
recognizer.dynamic_energy_threshold = True


def listen():

    try:

        with sr.Microphone() as source:

            print("🎤 Listening...")

            recognizer.adjust_for_ambient_noise(
                source,
                duration=1
            )

            audio = recognizer.listen(
                source,
                timeout=5,
                phrase_time_limit=8
            )

        print("🧠 Recognizing...")

        text = recognizer.recognize_google(
            audio,
            language="en-IN"
        )

        return text

    except sr.WaitTimeoutError:

        print("⌛ No speech detected.")

        return ""

    except sr.UnknownValueError:

        print("❌ Could not understand audio.")

        return ""

    except sr.RequestError as e:

        print("⚠ Speech service error:", e)

        return ""

    except Exception as e:

        print("Error:", e)

        return ""