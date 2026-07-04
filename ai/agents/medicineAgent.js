export function medicineAgent(symptom) {

if (
symptom.includes("fever")
) {

```
return "Paracetamol recommended";
```

}

if (
symptom.includes("cold")
) {

```
return "Cetirizine recommended";
```

}

return "Consult doctor.";
}
