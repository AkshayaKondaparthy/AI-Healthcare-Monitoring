export function analyticsReport(data) {

return {

```
totalPatients:
  data.length,

criticalPatients:
  data.filter(

    (p) =>
      p.score < 40
  ).length
```

};
}
