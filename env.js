export const lstVars = {
    "ID": /-?^[a-z][0-9]([a-z]|[0-9])*$/, // id
    "NUM": /^-?\d+(\.\d+)?$/ // number
}

export const lstCommands = {
    "IF": ["if"],
    "ELSE": ["else"],
    "THEN": ["then"],
}

export const lstOperators = {
    "ROP": [">=", "<=", ">", "<", "=="],  // relational operators
    "TUP": ["+=", "-=", "/=", "*=", "%="], // tuple operators
    "OP" : ["+", "-", "*", "/", "%"], // operators
}

export const lstSpecialSigns = {
    "SEM": [";"], // semicolon
    "ASSIGN": ["="], // assign operator
}