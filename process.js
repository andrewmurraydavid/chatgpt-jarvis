// create a short program that will read the input.txt file, escape the newline characters and the double quotes, and output the result to the console. The output should look something like this: var str = "this is a string with  \" double quotes \"  inside of it"; console.log(str);

// Path: process.js

const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;
  const escaped = data.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  process.stdout.write(escaped);
});
