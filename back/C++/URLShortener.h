#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;
class URLShortener
{
public:
    URLShortener(int count) : counter(count) {} // constructor list initialization of counter

    string shortenURL(const string &longURL)
    {
        if (urlToID.find(longURL) != urlToID.end())
        { // if already available return encoded value
            string shortURL = encodeBase62(counter);
            while (shortURL.length() != 7)
            {
                shortURL = '0' + shortURL;
            }
            return "http://tiny.url/" + shortURL;
        }
        else
        { // else encode store and then return value
            string shortURL = encodeBase62(counter);
            while (shortURL.length() != 7)
            {
                shortURL = '0' + shortURL;
            }
            // Below steps are only one time to store in DB.
            urlToID[longURL] = counter; // used to find if any existing counter value assigned to LongURL
            idToURL[counter] = longURL; // used to decode and find longURL
            counter++;                  // increment counter by 1
            return "http://tiny.url/" + shortURL;
        }
    }
    string expandURL(string &shortURL)
    {
        string s = "http://tiny.url/";
        int f = s.length();
        shortURL = shortURL.substr(f);
        int id = decodeBase62(shortURL); // Here id is alias to counter value
        if (idToURL.find(id) != idToURL.end())
        {
            return idToURL[id]; // return URL coressponding to the id/counter value
        }
        else
        {
            return "Short URL not found.";
        }
    }

private:
    long long int counter;
    unordered_map<string, int> urlToID;
    unordered_map<int, string> idToURL;

    string base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //

    string encodeBase62(int num)
    {
        if (num == 0)
        {
            return string(1, base62[0]);
        }

        string shortURL;
        while (num > 0)
        {
            shortURL = base62[num % 62] + shortURL;
            num /= 62;
        }
        return shortURL;
    }

    int decodeBase62(const string &shortURL)
    {
        int num = 0;
        for (char c : shortURL)
        {
            num = num * 62 + base62.find(c);
        }
        return num;
    }
};