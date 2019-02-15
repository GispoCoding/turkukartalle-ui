# Turku kartalle

Turku kartalle Oskari-sovellus PoC - UI-osan koodi

Demo osoitteessa: http://turkukartalle.karttatehdas.fi/turkukartalle-ui/

## Valmistelu

Oletus, että käytössäsi on Ubuntu 16.04 tai uudempi -käyttöjärjestelmä.

Halutessasi ota myös <a href="https://github.com/GispoCoding/turkukartalle-backend">turkukartalle-backend</a>-osan koodi käyttöön.

Huomaa, että saatat joutua avaamaan palvelimella TCP-portteja (80 ja 3000), jotta kaikki sovelluksen osat toimivat kunnolla.

### WWW-palvelimen asennus

Jos käytössä ei ole vielä WWW-palvelinta, niin esim. Apache HTTP Server 2 on hyvä vaihtoehto, jonka asentaminen komennolla:
<pre>
sudo apt install apache2
</pre>

### UI-koodin asentaminen

Apache 2:n tapauksessa oletuksena /var/www/html-hakemiston sisältö jaetaan WWW-selaimille. Asennetaan siis UI-koodi ko. hakemiston alla olevaan alihakemistoon:
<pre>
cd /var/www/html
git clone https://github.com/GispoCoding/turkukartalle-ui
</pre>

### UI-koodin valmistelu

Jotta saat Oskari-kartan näkyviin, niin luo karttajulkaisu esimerkiksi <a href="https://kartta.paikkatietoikkuna.fi/">Paikkatietoikkunassa</a> ja korvaa <em>turkukartalle-ui</em>-hakemistossa <em>index.html</em>-tiedostossa oleva <iframe>-elementti uudella <iframe>-elementillä. Tarvittaessa kysy vinkkejä vaikkapa <a href="https://www.gispo.fi/">Gispolta</a>.

## Tuloksen katselu

Siirry WWW-selaimella URL-osoitteeseen, joka vastaa palvelimesi osoitetta, eli mahdollisesti http://localhost/, http://minun.oma.fi/ tai http://11.22.33.44/.

## Kiitokset

Sovelluksen toteutuksen tässä muodossa mahdollistivat:
+ HOT-OSM Finlandin ihmiset, https://www.facebook.com/groups/hotosmfi/
+ Gispon ihmiset, http://www.gispo.fi/
+ Oskarin ihmiset ja sivusto, http://oskari.org/
+ Suomen evankelis-luterilainen kirkko (backend)
+ Stack Overflow, https://stackoverflow.com/
+ Build An Interactive Game of Thrones Map (Part I) - Node.js,  PostGIS, and Redis, https://blog.patricktriest.com/game-of-thrones-map-node-postgres-redis/ (backend)
+ Monet muut ihmiset ja tahot
