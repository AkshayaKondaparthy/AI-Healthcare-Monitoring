def patient_score(vitals):

```
score = 100

if vitals["heartRate"] > 100:
    score -= 20

if vitals["oxygen"] < 95:
    score -= 30

return score
```
