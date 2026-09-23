const http = require('http');
//moodul URL päringu parsimiseks(info väljalugemine)
const url = require('url');
// moodul faili tee haldamiseks
const path = require('path');
const fs = require('fs');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Annabel , veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">';
const pageBody = '\t<h1>Annabel , veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';
const dateTime = require('./src/dateETtime.js');

http.createServer(function(req, res){
    console.log(req.url);
    let currentURL = url.parse(req.url, true);
    console.log('Parsituna: ' + currentURL.pathname);

    if (currentURL.pathname === '/') {
        res.writeHead(200, {"Content-type": "text/html"});
        // res.write ('Meie veeb käivitus!');
        res.write (pageHead);
        res.write(pageBanner);
        res.write (pageBody);
        res.write('<p>Nädalapäev: ' + dateTime.weekDayET() + '</p>');
        res.write('<p>Kuupäev: ' + dateTime.dateET(1) + '</p>');
        res.write('<p>Lehe avamise kellaaeg: ' + dateTime.timeET() + '</p>');
        res.write (pageFoot);
        return res.end();
        
    }
    else if(currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write('Meie veeb kأ¤ivitus!');
		res.write(pageHead);
		res.write('\t<h1>Tänase päeva vanasõna</h1>\n\t<p>Siin näed tänseks loositud Eesti vanasõna.</p>\n\t<hr>');
		res.write(pageFoot);
		return res.end();
	}
    else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
        //liidame virtuaalse serveri päris kataloogidega
        let bannerPath = path.join(__dirname, 'pic', currentURL.pathname );
        fs.readFile(bannerPath, (err, data)=> {
            if(err){
                throw(err);
            } else {
                res.writeHead(200, {"Content-type": "image/png"});
                res.end(data);
            }
        });
    }


    else {
        res.end('Viga 404! Ei leia sellist lehte!');
    }
    

}).listen(5307);
