// const {writeFileSync, readFileSync} = require('fs')
const path = require('path')
const { exec } = require('child_process'); 
const urlModel = require('../models/url')


const getURL = async (req,res) => {
    // const result = readFileSync(path.resolve(__dirname, '../C++/output.txt'), 'utf8')
    const runUrl = `http://tiny.url/${req.params.urlID}`;
    const result = await urlModel.find({shortUrl:runUrl},{originalUrl: 1, _id: 0})
    if(result.length > 0)
        { 
        const getOriginalUrl = result[0].originalUrl
        return res.redirect( 301,`${getOriginalUrl}`);
    }
    res.status(404).send('<h1>404 Page Does Not Exists</h1>')
    // This will redirect any request made to ` www.example.com ` to ` www.newdomain.com `
    //  with a status code of 301 , indicating a permanent redirect .
}


const addURL = async (req,res) => {
    // const { url } = req.body; 
    try{
    const {url} = req.body;
    const exists = await urlModel.find({originalUrl:url})
    if(exists.length < 1){
        const count = await urlModel.countDocuments() + 10000001;
        exec(path.resolve(__dirname, `../C++/URL_Main ${url} ${count}`), async (error, stdout, stderr) => {
            if(error)
                {
                    console.log("C++ Error", error);
                    return res.status(400).send(error)
                }
                try{const newUrl = await urlModel.create({originalUrl:url, shortUrl:stdout, counter:count})
                return res.status(200).json(newUrl.shortUrl)
            }catch(err){console.log(err.message);res.status(400).send(err.message)}
        });
    } 
    else{return res.json(exists[0].shortUrl)}
    
}catch(err)
{
    res.status(500).json({msg:err.message})
}
}


module.exports = {getURL,addURL}

//{const { platform } = require('os');

// const WINDOWS_PLATFORM = 'win32';
// const MAC_PLATFORM = 'darwin';

// const osPlatform = platform();

// let command;
// //command = `start microsoft-edge:${getOriginalUrl}`;
// if (osPlatform === WINDOWS_PLATFORM) {
//   command = `start chrome ${getOriginalUrl}`;
// } else if (osPlatform === MAC_PLATFORM) {
//   command = `open -a "Google Chrome" ${getOriginalUrl}`;
// } else {
//   command = `google-chrome --no-sandbox ${getOriginalUrl}`;
// }
// // exec(command);}




// const cppProgram = spawn(path.resolve(__dirname, '../C++/URL_Main'), [url, count]); 
// cppProgram.stdout.on('data', (data) => { 
//     short = data;
//     console.log(data) 
// }); 



// writeFileSync(path.resolve(__dirname, '../C++/input.txt'),`${url}`)
// const result = readFileSync(path.resolve(__dirname, '../C++/output.txt'), 'utf8')
//  let resultURL;
// cppProgram.stdout.on('data', (data) => { 
//     resultURL = data;
//   console.log(`C++ Program Output: ${data}`); 
// }); 
 
// cppProgram.stderr.on('data', (data) => { 
//   console.error(`C++ Program Error: ${data}`); 
// }); 
 
// cppProgram.on('close', (code) => { 
//   console.log(`C++ Program exited with code ${code}`); 
// }); 