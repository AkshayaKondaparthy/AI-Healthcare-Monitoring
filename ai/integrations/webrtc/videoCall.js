export async function startVideoCall(
videoRef
) {

try {

```
const stream =
  await navigator.mediaDevices.getUserMedia({

    video: true,

    audio: true
  });

videoRef.current.srcObject =
  stream;

return stream;
```

} catch (error) {

```
console.log(error);
```

}
}
