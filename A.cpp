#include <iostream>
#include <vector>
#include <set>
#include <string>
#define taskname "a"
using namespace std;
typedef long long ll;
const int ISNUMBER = 0;
const int INVALID_ID = 1;
const int VALID_ID = 2;
string keywords[10] = {"int", "bool", "do", "while", "if", "else", "then", "begin", "end", "print"};

vector<string> tokens;
int scope = 0;


int isKeyword(string s, int i) {
    for (string k:keywords) {
        if (i + k.size() <= s.size()) {
            if (i + k.size() == s.size()) {
                if (s.substr(i, k.size()) == k)
                    return k.size();
            }
            else {
                if (!isdigit(s[i + k.size()]) && !isalpha(s[i + k.size()])) {
                    if (s.substr(i, k.size()) == k)
                        return k.size();
                }
            }
        }
    }
    return 0;
}

set<pair<string, int> > declare;
int line = 0;

int checkIden(string s) {
    bool isNumber = true;
    for (char c: s)
        if (!isdigit(c)) isNumber = false;
    if (isNumber) return ISNUMBER;
    for (int i = 1; i < s.size(); i++)
        if (isalpha(s[i]) && isdigit(s[i-1])) return INVALID_ID;
    return VALID_ID;
}

void pushIden(string s) {
    if (checkIden(s) == ISNUMBER) {tokens.push_back("NUMBER: " + s);return;}
    if (checkIden(s) == INVALID_ID) {tokens.push_back("INVALID ID: " + s);return;}

    if (tokens.back() == "KEYWORD: int" || tokens.back() == "KEYWORD: bool") {
        if (declare.find({s, scope}) == declare.end())
            declare.insert({s, scope});
        else
            tokens.push_back("Error: " + s + " is already declared");
    }

    if (checkIden(s) == VALID_ID) {
        bool ok = false;
        for (auto d: declare) {
            if (d.first == s) ok = true;
        }
        if (ok) tokens.push_back("ID: " + s);
        else tokens.push_back("Error: " + s + " was not declared");
    }
}


int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);
    freopen(taskname".inp", "r", stdin);
    freopen(taskname".out", "w", stdout);
    string s;

    string iden = "";
    bool singlecommenting = false;
    bool multicommenting = false;
    string comment = "";
    while(getline(cin, s)) {
        line++;
        if (multicommenting) comment += '\n';
        else if (singlecommenting) {
            tokens.push_back("Singleline comment content: " + comment);
            comment = "";
            singlecommenting = false;
        }
        for (int i = 0; i < s.size(); i++) {
            if (singlecommenting) comment += s[i];
            else if (multicommenting) {
                if (s[i] == '*' && i + 1 < s.size() && s[i + 1] == '/') {
                    tokens.push_back("Multiline comment content: " + comment);
                    comment = "";
                    i++;
                    tokens.push_back("End multiline comment");
                    multicommenting = false;
                }
                else comment += s[i];
            }
            else if (s[i] == ' ' || s[i] == '\t' || s[i] == '\r' || s[i] == '\f') {
                if (iden.size() > 0) {
                    pushIden(iden);
                }
                iden = "";
            }
            else if (!isdigit(s[i]) && !isalpha(s[i])) {
                if (iden.size() > 0) {
                    pushIden(iden);
                }
                iden = "";
                if (s[i] == ';') tokens.push_back("Semicolon");
                else if (s[i] == ')') tokens.push_back("Right round bracket");
                else if (s[i] == '(') tokens.push_back("Left round bracket");
                else if (s[i] == '}') {
                    vector<pair<string, int> > v;
                    for(auto p: declare) {
                        if (p.second == scope) v.push_back(p);
                    }
                    for(auto p: v) {
                        declare.erase(p);
                    }
                    scope--;
                    tokens.push_back("Right curly bracket");
                }
                else if (s[i] == '{') {
                    scope++;
                    tokens.push_back("Left curly bracket");
                }
                else if (s[i] == '>') {
                    if (i + 1 < s.size() && s[i + 1] == '=') {
                        tokens.push_back("ROP: >=");
                        i++;
                    } else {
                        tokens.push_back("ROP: >");
                    }
                }
                else if (s[i] == '='){
                    if (i + 1 < s.size() && s[i + 1] == '=') {
                        tokens.push_back("ROP: ==");
                        i++;
                    } else {
                        tokens.push_back("Assign");
                    }
                }
                else if (s[i] == '/') {
                    if (i + 1 < s.size()) {
                        if (s[i + 1] == '*') {
                            tokens.push_back("Start multiline comment");
                            multicommenting = true;
                            i++;
                        }
                        else if (s[i + 1] == '/') {
                            tokens.push_back("Start singleline comment");
                            singlecommenting = true;
                            i++;
                        }
                        else {
                            tokens.push_back("Invalid character: /");
                        }
                    } else {
                        tokens.push_back("Invalid character: /");
                    }
                }
                else if (s[i] == '*') {
                    if (i + 1 < s.size()) {
                        if (s[i + 1] == '/') {
                            tokens.push_back("End multiline comment");
                            multicommenting = false;
                            i++;
                        }
                        else {
                            tokens.push_back("Multiply");
                        }
                    }
                    else {
                        tokens.push_back("Multiply");
                    }
                }
                else if (s[i] == '+') {
                    tokens.push_back("Plus");
                }
                else {
                    tokens.push_back("Invalid character: " + s[i]);
                }
            } else {
                if (isKeyword(s, i))  {
                    tokens.push_back("KEYWORD: " + s.substr(i, isKeyword(s, i)));
                    i += isKeyword(s, i) - 1;
                }
                else {
                    iden += s[i];
                }
            }
        }

    }
    for (string token: tokens) {
        cout << token << '\n';
    }
}
