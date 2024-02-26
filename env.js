export const lstRegex = {
    "NENV": /^-[a-z][0-9]([a-z]|[0-9])?/, // negative env
    "ENV": /^[a-z][0-9]([a-z]|[0-9])?/, // env
    "NUM": /^-?\d+(\.\d+)?$/ // number
}

export const lst = {
    "ROP": [">=", "<=", ">", "<", "=="],  // relational operators
    "TUP": ["+=", "-=", "/=", "*=", "%="], // tuple operators
    "OP" : ["+", "-", "*", "/", "%"], // operators
    "COMMAND": ["if", "else", "then"], // if else commands
    "SEM": [";"], // semicolon
    "ASSIGN": ["="], // assign operator
}