# Mitä ohjelma tekee?
Palvelinrenderöinnin ensitestausta ja kokeilua, Sovellusohjelmointi 3 -kurssin ensimmäinen palautustehtävä. Sovellus renderöi Express-palvelimella sivuston, joka hakee tietokannasta dataa Suomen kunnista, ja tulostaa tietokantahaun tulokset taulukkoon. Taulukon tietoja voi filtteröidä hakusanan avulla. Taulukon tiedot voi järjestää nousevaan ja laskevaan järjestykseen klikkaamalla sarakkeen otsikkoa. Oletuksena tiedot on järjestetty laskevaan aakkosjärjestykseen kunnan nimen mukaan.

## Käytetyt teknologiat
Sovelluksessa käytetään PrismaORM ja SQLite tietokantatietojen tallentamiseen ja hallinnointiin. Muutoin toteutus on tehty Expressillä, TypeScriptillä ja EJS:llä.