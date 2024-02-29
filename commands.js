import fs from 'fs';
import { lstVars, lstCommands, lstOperators, lstSpecialSigns } from './env.js';

const filein = "input.txt";

/* get all tokens */
const getSubToken = (chr, tokens) => {

    // check commands
    for (const key in lstCommands) {
        const values = lstCommands[key];
        if (values.includes(chr)) {
            tokens.push([key, ]);
            return;
        }
    }

    // check special signs
    for (const key in lstSpecialSigns) {
        const values = lstSpecialSigns[key];
        if (values.includes(chr)) {
            tokens.push([key, ]);
            return;
        }
    }

    // check variables & numbers
    for (const key in lstVars) {
        const value = lstVars[key];
        const re = new RegExp(value);
        if (re.exec(chr)) {
            tokens.push([key, chr]);
            return;
        }
    }

    // check operations
    for (const key in lstOperators) {
        const values = lstOperators[key];
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
fs.readFile(filein, "utf8", (err, text) => {
    const data = text.split("\n");
    for(var textLine of data) {
        console.log(getToken(textLine));
        tokens.concat(getToken(textLine));
    }
});
