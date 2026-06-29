# Retkikartta

Responsiivinen verkkosovellus, joka esittaa Suomen kansallispuistoja, luonnonpuistoja ja retkeilyalueita interaktiivisella kartalla. Sovellus toimii sekä tietokoneella että puhelimella.

**Live-demo:** [https://paanpe.github.io/KarttaTesti/](https://paanpe.github.io/KarttaTesti/)

---

## Ominaisuudet

- **Interaktiivinen kartta** – 20 todellista retkeilykohdetta Suomesta OpenStreetMap-pohjalla
- **Taulukkonäkymä** – Kohteet listattuna modernissa taulukossa kaikilla tiedoilla
- **Monipuoliset suodattimet** – Kategoria, käyty/ei käyty, käyntiaika (päivämääräväli), kunta, maakunta
- **Visuaalinen käyty-erottelu** – Vihreä merkki (käyty) vs. harmaa merkki (ei käyty) kartalla
- **GPS-paikannus** – Paikannusnappi, joka hakee selaimen GPS-sijainnin ja lentää siihen
- **Popup-tiedot** – Kohteen nimi, kuvaus, kategoria, käyty-tila, kunta, maakunta, käyntiaika ja linkki lisätietoihin
- **Luontoteemainen ulkoasu** – Emerald/teal-värimaailma, pyöreät muodot, gradientit
- **Responsiivinen** – Toimii mobiilissa ja desktopissa, taulukon sarakkeet mukautuvat näytön kokoon
- **Lisätietolinkit** – Jokainen kohde linkittää luontoon.fi-sivulle

## Teknologiat

| Teknologia | Versio | Tarkoitus |
|---|---|---|
| [React](https://react.dev/) | 19.x | UI-komponenttikirjasto |
| [TypeScript](https://www.typescriptlang.org/) | ~5.7 | Tyyppiturva JavaScriptille |
| [Vite](https://vite.dev/) | 6.x | Kehityspalvelin ja tuotantobuildi |
| [Leaflet](https://leafletjs.com/) | 1.9.x | Interaktiivinen karttakirjasto |
| [react-leaflet](https://react-leaflet.js.org/) | 5.x | React-integraatio Leafletille |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS-kehys |
| [OpenStreetMap](https://www.openstreetmap.org/) | – | Ilmainen karttatiilipalvelu (ei API-avainta) |
| [GitHub Pages](https://pages.github.com/) | – | Staattinen hosting |
| [GitHub Actions](https://github.com/features/actions) | – | Automaattinen CI/CD-deploy |

## Tiedostorakenne

```
KarttaTesti/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages -deploy (GitHub Actions)
├── src/
│   ├── components/
│   │   ├── CategoryFilter.tsx      # Suodatinpaneeli (FilterPanel + FilterChips)
│   │   ├── LocateControl.tsx       # GPS-paikannusnappi kartalla
│   │   ├── LocationMarker.tsx      # Karttamerkki (käyty/ei-käyty SVG-ikonit)
│   │   ├── LocationTable.tsx       # Taulukkonäkymä kohteista
│   │   └── MapView.tsx             # Leaflet-karttakomponentti
│   ├── data/
│   │   └── locations.ts            # 20 retkeilykohdetta (kansallis-/luonnonpuistot)
│   ├── types/
│   │   └── index.ts                # LocationPoint- ja Category-tyypit
│   ├── App.tsx                     # Pääkomponentti (tilanhallinta, suodatus, reititys)
│   ├── main.tsx                    # Sovelluksen aloituspiste + Leaflet-ikonien korjaus
│   └── index.css                   # Tailwind CSS + Leaflet CSS -importit
├── index.html                      # HTML-pohja
├── package.json                    # Riippuvuudet ja npm-skriptit
├── vite.config.ts                  # Vite-konfiguraatio (React, Tailwind, base-polku)
├── tsconfig.json                   # TypeScript-konfiguraatio
├── tsconfig.app.json               # TypeScript app-konfiguraatio
└── tsconfig.node.json              # TypeScript node-konfiguraatio
```

## Datamalli

Jokainen retkeilykohde noudattaa `LocationPoint`-tyyppiä:

```typescript
type Category = 'kansallispuisto' | 'luonnonpuisto' | 'muu retkeilyalue';

interface LocationPoint {
  id: number;              // Yksilöivä tunniste
  name: string;            // Kohteen nimi
  description: string;     // Lyhyt kuvaus
  position: [number, number]; // Koordinaatit [latitude, longitude]
  category: Category;      // Kohteen tyyppi
  visited: boolean;        // Onko kohteessa käyty
  link: string;            // URL lisätietoihin (luontoon.fi)
  visitDate: string;       // Käyntipäivämäärä (YYYY-MM-DD)
  municipality: string;    // Kunta
  region: string;          // Maakunta
}
```

---

## Asennus ja käynnistys (Windows CMD)

### Vaatimukset

- [Node.js](https://nodejs.org/) versio 18 tai uudempi (suositus: 22.x)
- [Git](https://git-scm.com/)
- Tekstieditori (esim. [VS Code](https://code.visualstudio.com/))

### 1. Asenna Node.js

Lataa ja asenna Node.js osoitteesta [https://nodejs.org/](https://nodejs.org/). Valitse LTS-versio. Asennusohjelma asentaa myös `npm`-paketinhallinnan.

Tarkista asennus avaamalla komentokehote (`cmd`):

```cmd
node --version
npm --version
```

### 2. Asenna Git

Lataa ja asenna Git osoitteesta [https://git-scm.com/](https://git-scm.com/).

Tarkista asennus:

```cmd
git --version
```

### 3. Kloonaa repositorio

```cmd
git clone https://github.com/paanpe/KarttaTesti.git
cd KarttaTesti
```

### 4. Asenna riippuvuudet

```cmd
npm install
```

### 5. Käynnistä kehityspalvelin

```cmd
npm run dev
```

Avaa selaimessa: [http://localhost:5173/KarttaTesti/](http://localhost:5173/KarttaTesti/)

Kehityspalvelin päivittää sivun automaattisesti kun muokkaat koodia.

### 6. Tuotantobuildi

```cmd
npm run build
```

Buildi luodaan `dist/`-kansioon. Voit esikatsella tuotantoversiota:

```cmd
npm run preview
```

---

## Julkaisu GitHub Pages -sivulle

Projekti sisältää valmiin GitHub Actions -workflown (`.github/workflows/deploy.yml`), joka rakentaa ja julkaisee sovelluksen automaattisesti jokaisella `main`-haaran pushilla.

### Ensimmäinen julkaisu (kertakonfiguraatio)

#### 1. Luo oma GitHub-repositorio

Luo uusi repositorio GitHubissa osoitteessa [https://github.com/new](https://github.com/new). Anna repositoriolle nimi (esim. `KarttaTesti`).

#### 2. Päivitä base-polku

Avaa `vite.config.ts` ja vaihda `base`-arvo vastaamaan omaa repositoriosi nimeä:

```typescript
export default defineConfig({
  base: '/OmaReponNimi/',   // vaihda tähän oma repon nimi
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

#### 3. Pushaa koodi GitHubiin

```cmd
git remote set-url origin https://github.com/KAYTTAJANIMI/OmaReponNimi.git
git push -u origin main
```

#### 4. Aktivoi GitHub Pages

1. Mene repositoriosi asetuksiin: **Settings** > **Pages**
2. Kohdasta **Source** valitse **GitHub Actions**
3. Paina **Save**

#### 5. Odota deploy

Push mainiin käynnistää automaattisesti GitHub Actions -workflown. Seuraa etenemistä repositoriosi **Actions**-välilehdeltä. Ensimmäinen deploy kestää noin 1-2 minuuttia.

Julkaisun jälkeen sivusto on osoitteessa:

```
https://KAYTTAJANIMI.github.io/OmaReponNimi/
```

### Sivuston päivitys

Jokainen uusi push `main`-haaraan päivittää sivuston automaattisesti:

```cmd
git add .
git commit -m "Päivitä sisältöä"
git push origin main
```

---

## npm-skriptit

| Komento | Kuvaus |
|---|---|
| `npm run dev` | Käynnistää Vite-kehityspalvelimen (hot reload) |
| `npm run build` | Kääntää TypeScriptin ja luo tuotantobuildin `dist/`-kansioon |
| `npm run preview` | Käynnistää esikatselupalvelimen tuotantobuildille |

## Lisenssi

MIT
