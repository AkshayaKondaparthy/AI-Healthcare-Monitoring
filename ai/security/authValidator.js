export function authValidator(token) {

if (!token) {

```
return false;
```

}

return token.length > 10;
}
