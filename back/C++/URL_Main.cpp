#include <iostream>
#include "URLShortener.h"
using namespace std;
int main(int argc, char *argv[])
{
    URLShortener shortener(stoi(argv[2]));
    string longURL = argv[1];
    string shortURL = shortener.shortenURL(longURL);
    cout << shortURL;
    // string originalURL = shortener.expandURL(shortURL);
    // cout << "Original URL: " << originalURL << endl;
    return 0;
}

//g++ URL_Main.cpp -o URL_Main -to compile any cpp file
//output.exe arg2 arg3