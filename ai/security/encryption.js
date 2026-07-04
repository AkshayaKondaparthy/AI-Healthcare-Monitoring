import crypto from "crypto";

const secret =
"AI_HEALTH_SECRET";

export function encrypt(text) {

const cipher =
crypto.createCipher(
"aes-256-cbc",
secret
);

let encrypted =
cipher.update(
text,
"utf8",
"hex"
);

encrypted +=
cipher.final("hex");

return encrypted;
}

export function decrypt(text) {

const decipher =
crypto.createDecipher(
"aes-256-cbc",
secret
);

let decrypted =
decipher.update(
text,
"hex",
"utf8"
);

decrypted +=
decipher.final("utf8");

return decrypted;
}
