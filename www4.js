const http = require('http');
//moodul URL päringu parsimiseks(info väljalugemine)
const url = require('url');
// moodul faili tee haldamiseks
const path = require('path');
const fs = require('fs').promises;
const fsCallback = require('fs');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Annabel , veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">';
const pageBody = '\t<h1>Annabel , veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';
const dateTime = require('./src/dateETtime.js');

http.createServer(async function(req, res){
    console.log(req.url);
    let currentURL = url.parse(req.url, true);
    console.log('Parsituna: ' + currentURL.pathname);

    if (currentURL.pathname === '/') {
        res.writeHead(200, {"Content-type": "text/html"});
        // res.write ('Meie veeb käivitus!');
        res.write (pageHead);
        res.write(pageBanner);
        res.write (pageBody);
        res.write('<p>Täna on ' + dateTime.weekDayET() + ' ' + dateTime.dateET(1) + '. Lehe avamise kellaaeg: ' + dateTime.timeET() + '</p>');
        res.write('<img src="/taevas.jpg" alt="Minu tehtud foto" width="400">');
        res.write('<p><a href="/vanasona">Vanasõna</a></p>');
        res.write('<p><a href="/minust">Minust</a></p>');
        res.write (pageFoot);
        return res.end();
        
    }
    else if(currentURL.pathname === '/vanasona'){
		const textRef = path.join(__dirname, 'txt', 'vanasonad.txt');
        fsCallback.readFile(textRef, 'utf8', (err,data) => {
            if (err) {
                console.log('Viga: '+ err);
                res.writeHead(500, {"Content-type":"text/html; charset= utf-8"});
                return res.end('<p> Vanasõnade faili ei leitud.</p>');
            }
            let folkWisdom = data.trim().split(';');
            let wisdomNum = Math.floor(Math.random() * folkWisdom.length);
            res.writeHead(200, {"Content-type":"text/html; charset= utf-8"});
            res.write(pageHead);
            res.write('<h1>Tänase päeva vanasõna</h1>');
            res.write('<p>' + folkWisdom[wisdomNum] + '</p>');
            res.write('<p><a href="/">Tagasi avalehele</a></p>');
            res.write(pageFoot);
            return res.end();
        })
	}
    else if (currentURL.pathname === '/minust') {
        res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
        res.write(pageBanner);
        res.write('<h1>Miks ma siin olen</h1>');
        res.write(`
            <p>Tulin TLÜsse õppima kuna olen saanud palju kokkupuudet tööalaselt programmidega ja soovisin arendada neid teamisi, et mõista paremini millest kõigest koosneb programm.<br>
            Seoses sellega, et mul kodus kaks väikest kiisut siis teise linna kolimine oleks olnud raske. Mõistlikuim otsus minu võimalustele lähtuvalt oli TLÜ.</p>`);
        res.write('<img src="/kiisud.jpg" alt="Minu tehtud foto" width="400">');
        res.write('<p><a href="/">Tagasi avalehele</a></p>');
        res.write(pageFoot);
        return res.end();
    }

    else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
        //liidame virtuaalse serveri päris kataloogidega
        let bannerPath = path.join(__dirname, 'pic', currentURL.pathname );
        try {
            const data = await fs.readFile(bannerPath);
            res.writeHead(200, {"Content-type": "image/png"});
                res.end(data);
        } catch (err) {
            res.writeHead(404, {"Content-type" : "image/png"});
            return res.end('Pilti ei leitud!');
        }
    }

    else if (currentURL.pathname.endsWith('.jpg')) {
        let imagePath = path.join(__dirname, 'pic', currentURL.pathname);
        try {
            const data = await fs.readFile(imagePath);
            res.writeHead(200, {"Content-type": "image/jpeg"});
            return res.end(data);
        } catch (err) {
            res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
            return res.end('Pilti ei leitud!');
        }
    }

   /* else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
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
    }*/


    else {
        res.end('Viga 404! Ei leia sellist lehte!');
    }
    

}).listen(5307);
