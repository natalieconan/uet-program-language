package upl;


%%
%type int
%line
%column
%char
%class Scanner
%{

	
%}
%eofval{
    System.out.println("EOF"); return 1;
%eofval}
letter 	=  [A-Za-z]
digit  	=  [0-9]
iden    =  {letter}+{digit}+[{letter}|{digit}]*
neg_iden  =  -{letter}+{digit}+[{letter}|{digit}]*
neg_number  =  -[1-9][0-9]*

%%
"if" { System.out.println("If"); return 0; }
"then" { System.out.println("Then"); return 0; }
"else" { System.out.println("Else"); return 0; }

"(" { System.out.println("Left Bracket"); return 0; }
")" { System.out.println("Right Bracket"); return 0; }

[0-9]+ { System.out.println("Number " + yytext()); return 0;}
{neg_number} { System.out.println("Number " + yytext()); return 0;}
{neg_iden} { System.out.println("Id " + yytext()); return 0; }
{iden} { System.out.println("Id " + yytext()); return 0; }

";" { System.out.println("Semicolon"); return 0; }
"+" { System.out.println("Plus"); return 0; }
"*" { System.out.println("Times"); return 0; }

">=" { System.out.println("Rop " + yytext()); return 0; }
"<=" { System.out.println("Rop " + yytext()); return 0; }
"==" { System.out.println("Rop " + yytext()); return 0; }
"<" { System.out.println("Rop " + yytext()); return 0; }
">" { System.out.println("Rop " + yytext()); return 0; }

"=" { System.out.println("Assign"); return 0; }

[ \t\r\n\f] { /* ignore white space. */ }
. { System.out.println("Illegal character: "+yytext()); return 0;}
