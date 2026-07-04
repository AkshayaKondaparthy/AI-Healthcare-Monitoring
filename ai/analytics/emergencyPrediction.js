export function emergencyPrediction(vitals) {

if (
vitals.heartRate > 130 ||
vitals.oxygen < 85
) {

```
return true;
```

}

return false;
}
