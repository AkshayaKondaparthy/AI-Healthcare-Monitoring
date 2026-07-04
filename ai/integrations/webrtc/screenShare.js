export async function startScreenShare() {

try {

```
const stream =
  await navigator.mediaDevices.getDisplayMedia({

    video: true
  });

return stream;
```

} catch (error) {

```
console.log(error);
```

}
}
