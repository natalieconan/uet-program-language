import { lstVars, lstCommands, lstOperators, lstSpecialSigns } from './env.js';

/* get all tokens */
function getTokenFromChar(chr, tokens) {

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
            const positiveChr = chr.replace("-", "");
            if (chr !== positiveChr) {
                tokens.push(["MINUS", ]);
            }
            tokens.push([key, positiveChr]);
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

    tokens.push(["UNKNOWN", chr]);
}

export function getToken(text) {
    var tokens = [];
    const substr = text.split(" ");
    for(var chr of substr) {
        getTokenFromChar(chr, tokens);
    }
    return tokens;
}