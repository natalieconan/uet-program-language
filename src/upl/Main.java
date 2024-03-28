package upl;


import java.io.*;


public class Main{
    public static void main(String[] args) throws Exception{
      
       Scanner s=null;
	    if (args.length==0) 
            s= new Scanner(new InputStreamReader(System.in));
	    else 
            s = new Scanner(new InputStreamReader(new java.io.FileInputStream(args[0])));
        
        int status=1;
        do{
            status=s.yylex();
            
        }while(status==0);
        
        //s.yylex();
    }
}

class Symbol {
    public static final int NUMBER = 1;
    public static final int VARIABLE = 2;
    public static final int SEMICOLON = 3;
    
    private final int type;
    private final String value;
    
    public Symbol(int type, String value) {
        this.type = type;
        this.value = value;
    }
    
    public int getType() {
        return type;
    }
    
    public String getValue() {
        return value;
    }
    
    @Override
    public String toString() {
        switch (type) {
            case NUMBER:
                return "NUMBER: " + value;
            case VARIABLE:
                return "VARIABLE: " + value;
            case SEMICOLON:
                return "SEMICOLON";
            default:
                return "Unknown";
        }
    }
}
