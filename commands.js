import fs from 'fs';
import { lst, lstRegex } from './env.js';

/* get all tokens */
const getSubToken = (chr, tokens) => {

    // check variables & numbers
    for (const key in lstRegex) {
        const value = lstRegex[key];
        const re = new RegExp(value);
        if (re.exec(chr)) {
            tokens.push([key, chr]);
            return;
        }
    }

    // check others
    for (const key in lst) {
        const values = lst[key];
        if (values.includes(chr)) {
            tokens.push([key, chr]);
            return;
        }
    }
}

const getToken = (text) => {
    var tokens = [];
    const substr = text.split(" ");
    for(var chr of substr) {
        getSubToken(chr, tokens);
    }
    return tokens;
}

var tokens = [];
fs.readFile("input.txt", "utf8", (err, text) => {
    const data = text.split("\n");
    for(var textLine of data) {
        console.log(getToken(textLine));
        tokens.concat(getToken(textLine));
    }
});
