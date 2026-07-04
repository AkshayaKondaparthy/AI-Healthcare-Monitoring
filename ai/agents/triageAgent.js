export function triageAgent(vitals) {

if (
vitals.heartRate > 130
) {

```
return "CRITICAL";
```

}

if (
vitals.heartRate > 100
) {

```
return "MODERATE";
```

}

return "STABLE";
}
