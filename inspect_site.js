const https = require("https");
const fs = require("fs");

https.get("https://silverprism.lovable.app/", (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    fs.writeFileSync("site_preview.html", data);
    console.log("HTML length:", data.length);
    const matches = data.match(/assets\/[a-zA-Z0-9_\-\.]+\.(js|css|jpg|png|webp|svg)/g);
    console.log("Assets found:", matches);
  });
}).on("error", (err) => console.error(err));
