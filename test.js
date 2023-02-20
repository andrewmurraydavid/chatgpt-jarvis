import fetch from "node-fetch";
import fs from "fs";

let escaped = "";
let request =
  "What can you tell me about ancient Rome?";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  escaped = data.replace(/"/g, '\\"').replace(/\n/g, "\\n");

  getResponse(escaped, request);
});

function getResponse(escaped, request) {
  const Authorization =
    "Bearer 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";

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      max_tokens: 1000,
      prompt: `${escaped}. Requested ${request}. Response:`,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      // remove front slash escape characters
      const response = json.choices[0].text.replace(/\\n/g, "").replace(/\\/g, "");
      console.log(`Request: ${request}`);
      console.log(response);
      console.log(JSON.parse(response));
    });
}
