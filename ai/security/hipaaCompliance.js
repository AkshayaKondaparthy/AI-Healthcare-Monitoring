export function hipaaCompliance(
patient
) {

return {

```
encrypted: true,

accessControl: true,

auditEnabled: true,

patient:
  patient.name
```

};
}
