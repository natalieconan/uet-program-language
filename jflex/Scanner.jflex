package upl;
import java.util.*;
import java.lang.StringBuilder;

%%
%type int
%line
%column
%char
%class Scanner

%state IN_COMMENT

%{
    StringBuilder yytextBuffer = new StringBuilder();
    boolean hasBegin = false;
    boolean hasEnd = false;
    HashMap<String, Boolean> declaredVariables = new HashMap<>();
    int bracket = 0;
    int scope = 0;
%}

%eofval{
    /* handle errors when end without "end" */
    if (hasBegin == false) {
        System.out.println("Syntax Error: 'begin' is missing at the begin of the program");
    }

    if (hasEnd == false) {
        System.out.println("Syntax Error: 'end' is missing at the end of the program");
    }
    System.out.println("EOF"); return 1;
%eofval}

LETTER 	=  [A-Za-z]
DIGIT  	=  [0-9]
SIGN    = "-"

NUMBER = {SIGN}?{DIGIT}+
ID    =  {SIGN}?{LETTER}+{DIGIT}*

WS          = [ \t\n\r\f]

TYPE     = "int" | "bool"
DECLARATION = {TYPE} \s+ {ID} \s* "="?

PRINT = "print"

EOL = "\n"

%%
/* handle starting with "begin" */
"begin" {
    hasBegin = true;
    System.out.println("Begin The Program"); 
}

/* handle ending with "end" */
"end" {
    yybegin(YYINITIAL); 
    hasEnd = true;
    System.out.println("End The Program"); 
}

/* multiline comments */
"/*" {
    yybegin(IN_COMMENT);
    System.out.print("COMMENT ");
    // Reset StringBuilder for a new comment
    yytextBuffer.setLength(0);
}
<IN_COMMENT>[^*]+       { yytextBuffer.append(yytext()); }
<IN_COMMENT>"*"         { yytextBuffer.append(yytext()); }
<IN_COMMENT>"*/"        { 
    yybegin(YYINITIAL); 
    System.out.println(yytextBuffer.toString());
}

/* comments */
"//" .*? {WS}+                      { System.out.println("COMMENT: "+yytext()); }

/* whitespace */
{WS}+                               { /* ignore white space. */ }

"if" { System.out.println("IF"); }
"then" { System.out.println("THEN"); }
"else" { System.out.println("ELSE"); }
"do" { System.out.println("DO"); }
"while" { System.out.println("WHILE"); }

/* print expression */
{PRINT} { System.out.println("PRINT "); }

/* Bracket */
"(" { 
    System.out.println("LBRACKET"); 
    bracket++;
}
")" { 
    bracket--;
    if (bracket < 0) {
        System.out.println("Syntax Error: '{' is missing, line : " + yyline);
    } else {
        System.out.println("RBRACKET"); 
    }
    bracket++;
}

"{" { 
    System.out.println("LSCOPE"); 
    scope++;
}
"}" { 
    scope--;
    if (scope < 0) {
        System.out.println("Syntax Error: '{' is missing, line: " + yyline);
    } else {
        System.out.println("RSCOPE");
    }
    scope++;
}

/* declaration */
{DECLARATION} { 
    String[] text = yytext().replace("=", "").split("\\s+");
    String type = text[0];
    String variable = text[1];

    if (declaredVariables.get(variable) != null) {
      System.out.println("Error: %s is already declared, line: %s".formatted(variable, yyline));
    }

    declaredVariables.put(variable, true);

    System.out.println("DECLARE " + type);
    System.out.println("ID " + variable);
}

{NUMBER} { System.out.println("NUMBER " + yytext()); }
{ID} { 
    String variable = yytext();
    if (declaredVariables.get(variable) == null) {
        System.out.println("Error: %s is not declared, line: %s".formatted(variable, yyline));
    } else {
        System.out.println("ID " + variable); 
    }
}

"+" { System.out.println("PLUS"); }
"*" { System.out.println("TIMES"); }

">=" { System.out.println("ROP " + yytext()); }
"==" { System.out.println("ROP " + yytext()); }
">" { System.out.println("ROP " + yytext()); }

"=" { System.out.println("ASSIGN"); }

[ \t\r\f] { /* ignore white space. */ }

/* Semicolon */
";" { System.out.println("SEMI"); }

. { System.out.println("Illegal character: " + yytext() + ", line: " + yyline); }
