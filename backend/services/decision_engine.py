def detect_risk(heart_rate, oxygen):

    if heart_rate > 120 or oxygen < 90:
        return "Critical"

    elif heart_rate > 95:
        return "Moderate"

    return "Stable"