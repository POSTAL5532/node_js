const fs = require("fs");

/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `YOUR TEXT IS:\n${textIn}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("DONE");*/

fs.readFile("./txt/input.txt", "utf-8", (error, text) => {
    console.log(text);
    writeData(text);
});

const writeData = (text) => {
    const textOut = `YOUR TEXT IS:\n${text}`;
    fs.writeFile("./txt/output.txt", textOut, () => console.log("DONE"));
}
