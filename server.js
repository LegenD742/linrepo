const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080 ;

const server = http.createServer((req,res)=> {
    const filepath = path.join(__dirname, req.url === '/' ? "index.html" : req.url) ;
    console.log(`${filepath}`);

    const ext = path.extname(filepath).toLowerCase();
    console.log(`${ext}`);

    let mtype = {
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "text/js"
    }

    const contentType = mtype[ext] || "application/octet-stream" ;

    fs.readFile(filepath , (err,data) => {
        if(err) {
            if(err.code === "ENOENT") {
                res.writeHead(404, {"content-type" : "textlolu"});
                res.end("Nahi mila le !!") ;
            }
            else{
                res.writeHead(500);
                res.end("Server error");
            }
        }
        else{
            res.writeHead(200 , {"content-type" : contentType }) ;
            res.end(data,"utf-8");
        }
    });
});


server.listen(PORT, () => {
    console.log(`server running on port no : ${PORT}.....`);
});
