export function realtimeAlerts(
vitals
) {

if (
vitals.heartRate > 120
) {

```
return "Critical Heart Rate";
```

}

return "Stable";
}
