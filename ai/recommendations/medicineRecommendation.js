export function medicineRecommendation(symptom) {

if (
symptom.includes("fever")
) {

```
return "Paracetamol";
```

}

if (
symptom.includes("cold")
) {

```
return "Cetirizine";
```

}

return "Doctor consultation required";
}
