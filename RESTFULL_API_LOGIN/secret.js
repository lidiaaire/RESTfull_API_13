const crypto = require("crypto");

const secret = "codespace full stack refresh";

const hash = crypto
  .createHmac("sha256", secret)
  .update("Soy otro campo secreto refresh")
  .digest("hex");

console.log(hash);
