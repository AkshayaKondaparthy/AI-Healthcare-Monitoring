export function patientTrend(history) {

return history.map((item) => ({

```
date: item.date,

score: item.score
```

}));
}
