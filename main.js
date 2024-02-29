import fs from 'fs';
import { getToken } from "./tokens.js";

const filein = "input.txt";

var lstTokens = [];
fs.readFile(filein, "utf8", (err, text) => {
    const data = text.split("\n");
    for(var textLine of data) {
        const tokens = getToken(textLine);
        lstTokens.push(tokens);
    }
    console.log(lstTokens);
});