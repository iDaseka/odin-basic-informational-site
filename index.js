const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
    const urlRequest = url.parse(req.url, true);
    const fileName = urlRequest.pathname === '/' ? './index.html' : `.${urlRequest.pathname}.html`;

    fs.readFile(fileName, function (err, data){
        if (err){
            fs.readFile('./404.html', function (err, data){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            })
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080)