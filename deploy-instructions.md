# 🚀 Istruzioni per Pubblicazione Online

## Opzione 1: GitHub Pages (Gratis)

### Setup iniziale:
1. Crea un repository su GitHub
2. Carica tutti i file (tranne `server/` se non serve)
3. Vai su Settings → Pages
4. Source: "Deploy from a branch"
5. Branch: `main` / root
6. Il tuo sito sarà su `https://tuo-username.github.io/nome-repo/`

### File necessari per GitHub Pages:
- `index.html` (pagina principale)
- `calcolo-prezzi.html` (calcolatore)
- `settings.html` (impostazioni)
- `assets/` (cartella con JavaScript)
- `logo.png`
- `manifest.webmanifest`

## Opzione 2: Netlify (Gratis)

### Deploy automatico:
1. Vai su [netlify.com](https://netlify.com)
2. "New site from Git"
3. Collega il repository GitHub
4. Build command: (lascia vuoto)
5. Publish directory: (lascia vuoto - root)
6. Deploy!

### Il sito sarà accessibile subito con URL tipo:
`https://magical-name-123456.netlify.app`

## Test in locale prima del deploy:

```bash
# Opzione 1: Server Python
python3 -m http.server 8000

# Opzione 2: Server Node (se hai Node installato)
npx http-server

# Opzione 3: Live Server (VS Code extension)
# Click destro su index.html → "Open with Live Server"
```

Poi vai su `http://localhost:8000/index.html`

## Funzionalità disponibili:

✅ **Calcolatore prezzi completo**
✅ **Gestione materiali/stampanti personalizzata**
✅ **Grafici interattivi**
✅ **Generazione PDF preventivi**
✅ **Responsive design (mobile/tablet)**
✅ **Installabile come PWA** (mobile)

## Note:
- Il sito funziona completamente lato client
- Nessun server richiesto per le funzionalità base
- I dati vengono salvati nel browser dell'utente
- Per condividere impostazioni tra dispositivi, usa il server opzionale nella cartella `server/`
