export function pushNotification(
title,
body
) {

if (
Notification.permission ===
"granted"
) {

```
new Notification(
  title,
  {
    body
  }
);
```

}
}
