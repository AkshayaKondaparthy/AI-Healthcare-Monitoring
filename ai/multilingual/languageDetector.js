export function detectLanguage(
text
) {

if (
/[\u0C00-\u0C7F]/.test(text)
) {

```
return "te";
```

}

if (
/[\u0900-\u097F]/.test(text)
) {

```
return "hi";
```

}

return "en";
}
