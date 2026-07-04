from deep_translator import GoogleTranslator


def translate_to_english(text):

    try:
        translated = GoogleTranslator(
            source='auto',
            target='en'
        ).translate(text)

        return translated

    except Exception as e:
        print("Translation Error:", e)
        return text


def translate_to_telugu(text):

    try:
        translated = GoogleTranslator(
            source='en',
            target='te'
        ).translate(text)

        return translated

    except Exception as e:
        print("Translation Error:", e)
        return text