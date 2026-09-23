const http = require('http');
//moodul URL päringu parsimiseks(info väljalugemine)
const url = require('url');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Annabel , veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Annabel , veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';
const dateTime = require('./src/dateETtime.js');

http.createServer(function(req, res){
    console.log(req.url);
    let currentURL = url.parse(req.url, true);
    console.log('Parsituna: ' + currentURL.pathname);

    if (currentURL.pathname === '/') {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write ('Meie veeb käivitus!');
        res.write (pageHead);
        res.write (pageBody);
        res.write('<p>Nädalapäev: ' + dateTime.weekDayET() + '</p>');
        res.write('<p>Kuupäev: ' + dateTime.dateET(1) + '</p>');
        res.write('<p>Lehe avamise kellaaeg: ' + dateTime.timeET() + '</p>');
        res.write (pageFoot);
        return res.end();
        
    }
    else {
        res.end('Viga 404! Ei leia sellist lehte!');
    }
    

}).listen(5307);
