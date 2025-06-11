# The Movie Lib

Eine moderne Filmdatenbank-Webanwendung, entwickelt mit Nuxt.js und der TMDB API als Teil einer Frontend-Developer Schnupperaufgabe.

![The Movie Lib Screenshot](https://via.placeholder.com/800x450?text=The+Movie+Lib+Screenshot)

## 📝 Projektbeschreibung

Diese Webanwendung wurde als Lösung für die gestellte Frontend-Developer Schnupperaufgabe entwickelt. Die Hauptanforderungen waren:

- Anzeige einer Liste von Filmen mit Daten aus der TMDB API
- Implementierung von Such-, Filter- und Sortierfunktionen
- Erstellung einer Detailansicht für einzelne Filme
- Verwendung von Nuxt.js und Tailwind CSS

## 🚀 Features

- **Filmliste:** Übersichtliche Darstellung von Filmen aus verschiedenen Kategorien
- **Suche:** Echtzeit-Suche nach Filmtiteln
- **Filter:** Filterung nach Filmgenres
- **Sortierung:** Verschiedene Sortieroptionen (Beliebtheit, Bewertung, Erscheinungsdatum)
- **Detailansicht:** Ausführliche Informationen zu jedem Film
- **Responsive Design:** Optimierte Darstellung auf allen Geräten

## 🛠️ Technologien

- **Framework:** Nuxt 3.17.5 (aufbauend auf Vue.js)
- **Styling:** Tailwind CSS v3
- **State Management:** Pinia
- **API:** The Movie Database (TMDB)
- **Formatierung:** ESLint
- **Paketmanager:** pnpm
- **TypeScript:** Vollständige TypeScript-Unterstützung

## 📊 Architektur

Die Anwendung ist nach folgenden Prinzipien aufgebaut:

- **Component-basierte Struktur:** Modulare Komponenten für optimale Wiederverwendbarkeit
- **Server-seitige API-Anbindung:** TMDB-Zugriff über Nuxt Server API Routes
- **State Management:** Zentralisierte Datenverwaltung mit Pinia
- **Responsive Design:** Mobile-First Ansatz mit Tailwind CSS

## 💻 Installation

### Voraussetzungen

- Node.js (v18 oder höher)
- pnpm (empfohlen) oder npm/yarn

### Einrichtung

1. Projekt klonen:
```bash
git clone https://github.com/dein-username/the-movie-lib.git
cd the-movie-lib
```

2. Abhängigkeiten installieren:
```bash
# Mit pnpm (empfohlen)
pnpm install

# Mit npm
npm install

# Mit yarn
yarn install
```

### Umgebungsvariablen

Erstelle eine `.env`-Datei im Hauptverzeichnis:

```
NUXT_TMDB_API_KEY=dein_tmdb_api_key
```

Den API-Key erhältst du von [The Movie Database](https://www.themoviedb.org/settings/api).

## 🚀 Entwicklung

Starte den Entwicklungsserver auf `http://localhost:3000`:

```bash
# Mit pnpm (empfohlen)
pnpm dev

# Mit npm
npm run dev

# Mit yarn
yarn dev
```

## 📦 Build

Erstelle eine produktionsfertige Version:

```bash
# Mit pnpm
pnpm build

# Mit npm
npm run build

# Mit yarn
yarn build
```

Preview der Produktionsversion:

```bash
# Mit pnpm
pnpm preview

# Mit npm
npm run preview

# Mit yarn
yarn preview
```

## 🚀 Deployment

Die Anwendung ist für das Deployment mit NuxtHub vorbereitet:

### Lokales Deployment

Nach dem Build kann die Anwendung lokal ausgeführt werden:

```bash
# Nach dem Build
pnpm preview
```

### NuxtHub Deployment

1. Erstelle ein [NuxtHub-Konto](https://nuxthub.com/)
2. Installiere die NuxtHub CLI:

```bash
npm install -g @nuxthub/cli
```

3. Logge dich in NuxtHub ein:

```bash
nuxthub login
```

4. Führe den Deployment-Befehl aus:

```bash
nuxthub deploy
```

5. Konfiguriere die Umgebungsvariablen in den NuxtHub-Einstellungen:
   - `NUXT_TMDB_API_KEY=dein_tmdb_api_key`


