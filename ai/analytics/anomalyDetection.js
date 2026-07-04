export function anomalyDetection(vitals) {

if (
vitals.heartRate > 140
) {

```
return "Heart Rate Anomaly";
```

}

if (
vitals.oxygen < 85
) {

```
return "Oxygen Critical";
```

}

return "No anomalies";
}
