const crypto = require("crypto");

const secret = "codespace full stack 14";

const hash = crypto
  .createHmac("sha256", secret)
  .update("Soy otro campo secreto")
  .digest("hex");

console.log(hash);
