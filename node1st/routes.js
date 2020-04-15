
const fs = require('fs');     // file path

const evenhandler = (req,res) =>{
// routing
const url = req.url;
const method = req.method;   
if(url === '/form') {
    res.write('<html>');
    res.write('<head><title>shubham yadav</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end(); 
    // IMP  note as form action is /message so after submitting form input as message dir is not present so the below code is run
     }

    // redirect 
    if(url === '/message' && method === 'POST'){
        const body = [];// array for the incoming message
        req.on('data',(chunk) =>{  // req.on is evenlistener which is listening chunk
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',() => {
            const parsedbody = Buffer.concat(body).toString();  //.tostring is to convert ie for different input different are available
            const message = parsedbody.split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt',message); // sync is to wait execution of next line until the input is done , but this is not ueful in big input
            // it is written above as node does not wait and write will be executed before function end
        });
        //fs.writeFileSync('message.txt','dummy')   // DUMMY is for example that is input from user
        res.statusCode = 302;
        res.setHeader('Location','/');  // this is after redirect location
        return res.end();

    }
    res.setHeader('Content-Type', 'text/html');  // if given json then gve json in
    res.write('<html>');
    res.write('<head><title>shubham yadav</title></head>');
    res.write('<body>mayaoak</body>');
    res.write('</html>');
    res.end();


}
        // way to export 
        module.export = evenhandler;