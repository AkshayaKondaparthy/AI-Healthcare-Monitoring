export function vitalsAnalyzer(vitals) {

let risk = "Stable";

if (
vitals.heartRate > 120 ||
vitals.oxygen < 90
) {

```
risk = "Critical";
```

}

else if (
vitals.heartRate > 100
) {

```
risk = "Moderate";
```

}

return {

```
status: risk,

vitals
```

};
}
