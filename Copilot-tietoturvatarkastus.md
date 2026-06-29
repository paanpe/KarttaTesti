# Tietoturvatarkastus – paanpe/KarttaTesti

**Päivämäärä:** 29.06.2026  
**Repositorio:** paanpe/KarttaTesti  
**Haara:** main  
**Kieli:** TypeScript (98,7%), HTML (1,1%), CSS (0,2%)

---

## 1. Yleiskatsaus

Retkikartta on responsiivinen verkkosovellus, joka esittää Suomen kansallispuistoja, luonnonpuistoja ja retkeilyalueita interaktiivisella kartalla. Sovellus on rakennettu React 19:llä, TypeScriptillä, Vitellä ja Leafletillä, ja sitä isännöidään GitHub Pagesilla.

---

## 2. Tietoturvaanalyysi

### 2.1 Herkkien tietojen hallinta ✅ HYVÄ

**Havainnot:**
- Repositorio on **julkinen**, mutta se sisältää vain staattista dataa ja julkisia retkeilykohteita
- **Ei API-avaimia, salasanoja tai yksityisiä tunnistetietoja** löytynyt koodissa
- Leaflet-kartta käyttää OpenStreetMapin julkisia tiilejä (ei API-avainta vaadittu)
- Kaikki ulkoiset linkit (luontoon.fi) ovat julkisia resursseja
- `package.json` sisältää vain julkisia npm-riippuvuuksia

**Suositus:** ✅ Nykyinen käytäntö on hyvä. Jos tulevaisuudessa tarvitaan API-avaimia tai sensitiivisiä tietoja, käytä GitHub Secrets -ominaisuutta CI/CD-pipelinessa.

---

### 2.2 Riippuvuuksien hallinta ✅ HYVÄ

**Käytetyt riippuvuudet:**
```json
"react": "^19.0.0",
"react-dom": "^19.0.0",
"leaflet": "^1.9.4",
"react-leaflet": "^5.0.0",
"tailwindcss": "^4.0.0",
"typescript": "~5.7.0",
"vite": "^6.0.0"
```

**Havainnot:**
- Kaikki riippuvuudet ovat vakiintuneet, tuetut kirjastot
- TypeScript käytetään, mikä parantaa koodin turvallisuutta
- Päivitysstrategia käyttää `^`-merkintää (minor/patch-päivitykset)
- **Puuttuu:** `package-lock.json` tai `yarn.lock` ei löydy repositoriosta (voi olla .gitignore:ssa)

**Suositus:** 
⚠️ Varmista, että lukittu versio (`package-lock.json`) on joko:
1. Versionhallinnassa (suositeltava tuotantosovellusten osalta)
2. Tai sisälly `.gitignore`-tiedostoon oikein

---

### 2.3 Koodikatselmukset – XSS ja turvallisuuspuutteet ✅ HYVÄ

**Tutkitut tiedostot:**
- `src/App.tsx` – Pääkomponentti
- `src/components/MapView.tsx` – Karttakomponentti  
- `src/data/locations.ts` – Sijaintitiedot
- `vite.config.ts` – Vite-konfiguraatio

**Havainnot:**
- ✅ React sanitoi automaattisesti JSX-sisällön (ei suoraa `dangerouslySetInnerHTML`-käyttöä)
- ✅ Sijaintidataa ei haeta käyttäjän syötteistä, vaan se on kovakoodattu
- ✅ Ulkoiset linkit (`luontoon.fi`) avautuvat uusissa välilehdissä (`_blank`)
- ✅ Ei suoraa DOM-manipulaatiota `innerHTML` tai `eval()`-kutsuja

**Suositus:** ✅ Nykyinen toteutus on turvallinen.

---

### 2.4 CORS ja verkkoliikenteen turvallisuus ✅ HYVÄ

**Havainnot:**
- OpenStreetMap-kartatiilet ladataan HTTPS:llä (`https://{s}.tile.openstreetmap.org/...`)
- Sisäisen datan haku on minimaalia (vain staattinen JSON)
- GitHub Pages tarjoaa HTTPS:n automaattisesti

**Suositus:** ✅ Nykyinen konfiguraatio on turvallinen.

---

### 2.5 CI/CD-turvallisuus ✅ HYVÄ

**Deploy-workflow (`.github/workflows/deploy.yml`):**
```yaml
- Käytetään virallisia GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`)
- Node.js versio on kiinteä (22) – hyvä
- Ei manuaalisia deployeja tai salasanoja workflow-tiedostossa
- OIDC-pohjainen autentikointi GitHub Pages -deployaille (paras käytäntö)
- Permissions-konfiguraatio on minimaali (read/pages/id-token vain)
```

**Suositus:** ✅ Workflow-konfiguraatio on turvallinen ja seuraa parhaita käytäntöjä.

---

### 2.6 TypeScript-konfiguraatio ✅ HYVÄ

**Tutkittu:** `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

**Havainnot:**
- TypeScript on konfiguroitu oikein
- Tyyppiturvaa vahvistava konfiguraatio käytössä
- Ei looseja tyyppejä (`any`) kriittisissä kohdissa (pikakatselmuksella)

**Suositus:** ✅ Nykyinen konfiguraatio on hyvä.

---

### 2.7 Autentikointi ja valtuutus ℹ️ EI SOVELLETTAVISSA

**Havainnot:**
- Sovellus on **staattinen frontend-sovellus**, jolla ei ole palvelinpuolta
- Ei käyttäjätiliä, sessiohallintaa tai API-kutsujen validointia
- Kaikki data on julkista

**Suositus:** ✅ Ei sovellettavissa tähän sovellukseen. Jos tulevaisuudessa lisätään backend-palvelu, toteutetaan asianmukainen autentikointi.

---

### 2.8 Herkkien konfiguraatioiden hallinta ✅ HYVÄ

**Tutkittu:**
- `.gitignore` – sisältää `node_modules`, `dist`, muut build-tuotteet
- Vite-konfiguraatio – sisältää vain julkisia asetuksia
- Environment-muuttujia ei löytynyt

**Suositus:** 
✅ Nykyinen käytäntö on hyvä. Jos tulevaisuudessa tarvitaan `.env`-tiedostoja:
- Lisää `.env`, `.env.local` ja `.env.*.local` `gitignore`-tiedostoon
- Dokumentoi `.env.example`-tiedostoon odotetut muuttujat ilman arvoja

---

### 2.9 Dokumentaation ja kommenttien turvallisuus ✅ HYVÄ

**Havainnot:**
- README.md sisältää asennusohjeet ja käyttöohjeet (hyvä)
- Koodissa käytettävät kommentit ovat neutraaleja
- Ei herkkiä tietoja dokumentaatiossa

**Suositus:** ✅ Nykyinen dokumentaatio on hyvä.

---

### 2.10 Riippuvuuksien turvallisuuspäivitykset ℹ️ HUOMIO

**Nykyinen asetus `package.json`:**
```json
"typescript": "~5.7.0"  // Vain patch-päivitykset
```

**Havainnot:**
- Useimmat riippuvuudet käyttävät `^` (sallii minor-päivitykset)
- TypeScript käyttää `~` (vain patch-päivitykset)
- **Huomio:** GitHub riippuvuuksien turvallisuushaavoittuvuuksista, mutta ne eivät ole automaattisesti korjattuja

**Suositus:** 
⚠️ Säädä GitHub:n riippuvuusturvallisuusvaroituksiin:
1. Ota käyttöön Dependabot-hälytykset (Settings > Security > Dependabot alerts)
2. Harkitse Dependabot-päivityksiä (Settings > Code security and analysis > Dependabot updates)

---

## 3. Muut tarkistetut alueet

| Alue | Status | Huomautus |
|------|--------|-----------|
| **Inputin validointi** | ✅ Hyvä | React sanitoi JSX:n automaattisesti |
| **Error-käsittely** | ✅ Hyvä | Ei paljastaa herkkiä tietoja virheistä |
| **Loggaus** | ✅ Hyvä | Ei herkkien tietojen loggausta |
| **Salasanojen hallinta** | ✅ N/A | Sovelluksella ei ole salasanoja |
| **Tiedostojen lataus** | ✅ N/A | Sovellus ei tue tiedostojen latausta |
| **Resurssien rajoitus** | ✅ Hyvä | Staattinen sisältö, rajoitettu kuormitus |

---

## 4. Johtopäätökset

### Koko arvosana: **A – Erinomainen** ⭐⭐⭐⭐⭐

**Vahvuudet:**
- ✅ Ei herkkiä tietoja (API-avaimia, salasanoja)
- ✅ Turvallinen koodin kirjoitus (React, TypeScript)
- ✅ Turvallinen CI/CD-konfiguraatio (GitHub Actions OIDC)
- ✅ Modernit kirjastot ja hyvä versionhallinta
- ✅ HTTPS ja muut verkkoturvallisuuden parhaiden käytäntöjen noudattaminen

**Parannusmahdollisuudet:**
- ⚠️ Varmista `package-lock.json` versionhallinnassa tai `.gitignore`-tiedostossa
- ⚠️ Ota käyttöön Dependabot-riippuvuushälytykset
- ℹ️ Dokumentoi best practices uusille kehittäjille (`SECURITY.md`)

---

## 5. Suositukset

### Lyhyen aikavälin toimenpiteet (kuukausissa):
1. Varmista, että riippuvuuksien lukittu versio on käsittelyssä oikein
2. Ota käyttöön Dependabot-hälytykset GitHubissa
3. Lisää `SECURITY.md`-tiedosto kehittäjien ohjeiksi

### Pitkän aikavälin toimenpiteet:
1. Suunnittele turvallisuusauditit, jos sovellusta laajennetaan backend-palvelulla
2. Toteutetaan säännöllisiä riippuvuuspäivitykset (neljännesvuosittain)
3. Harkitse staattisen analyysin työkaluja (SonarQube, CodeQL) tulevaisuudessa

---

## 6. Tekijät

**Tarkastuksen suoritti:** GitHub Copilot (@copilot)  
**Tarkastuksen tyyppi:** Automatisoitu tietoturvatarkastus  
**Työkalu:** GitHub Copilot Security Review  
**Päivämäärä:** 29. kesäkuuta 2026

---

*Tämä raportti luotiin automatisoituneen tietoturvatarkastuksen perusteella. Säännölliset manuaaliset tarkastukset ja koodikatselmoinnit ovat suositeltavia.*
