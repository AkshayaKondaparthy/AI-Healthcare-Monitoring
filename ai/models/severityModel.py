def severity_model(hr, oxygen):

```
if hr > 130 or oxygen < 85:
    return "Critical"

if hr > 100:
    return "Moderate"

return "Stable"
```
