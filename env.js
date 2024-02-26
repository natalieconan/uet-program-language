export const lstRegex = {
    "MENV": /^-[a-z][0-9]([a-z]|[0-9])?/, 
    "ENV": /^[a-z][0-9]([a-z]|[0-9])?/,
    "NUM": /^-?\d+(\.\d+)?$/
}

export const lst = {
    "ROP": [">=", "<=", ">", "<", "=="],
    "TUP": ["+=", "-=", "/=", "*=", "%="],
    "OP" : ["+", "-", "*", "/", "%"],
    "COMMAND": ["if", "else", "then"],
    "SEM": [";"],
    "ASSIGN": ["="],
}