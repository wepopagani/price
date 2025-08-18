# 3D Makes - Calcolatore Prezzi Stampa 3D

Applicazione web per calcolare i costi di stampa 3D per tecnologie FDM e Resina.

## Opzioni di utilizzo

### 1) Solo locale (HTML statico)
Apri `index.html` o `calcolo-prezzi.html` nel browser. Le impostazioni sono salvate nel browser (localStorage).

### 2) Con controllo remoto (API)
Avvia una piccola API Node per leggere/salvare le impostazioni da remoto e usarle in tutte le istanze del calcolatore.

## Backend Settings API (opzionale)

1. Assicurati di avere Node 18+
2. Installa e avvia il server:
   ```bash
   cd server
   npm install
   npm start
   ```
3. L'API espone `GET/PUT /api/settings`

## Configurazione frontend per endpoint remoto

Apri `settings.html` e imposta l'URL API (es. `http://localhost:8080/api/settings`) nella sezione "Endpoint Remoto". In alternativa puoi impostare globalmente in testa agli HTML:

```html
<script>
  window.SETTINGS_ENDPOINT = 'https://tuo-dominio/api/settings';
<\/script>
```
   
2. Seleziona il tipo di stampa (FDM o Resina)
3. Scegli la stampante e il materiale
4. Inserisci i dati richiesti:
   - Quantità pezzi
   - Tempo di stampa (ore e minuti)
   - Peso materiale (grammi per FDM, ml per Resina)
   - Tempo di preparazione e post-processing (minuti)
   - Markup percentuale
5. Clicca "CALCOLA" per vedere i risultati

## Funzionalità

- **Calcolo automatico** di tutti i costi di produzione
- **Interfaccia intuitiva** con dropdown dinamici
- **Supporto per FDM e Resina** con stampanti e materiali specifici
- **Failure rate del 10%** incluso nei calcoli
- **Gestione errori** per input non validi

## Pubblicazione

- Hosting statico: pubblica `index.html`, `calcolo-prezzi.html`, `settings.html`, `logo.png`, cartella `assets/` su Netlify, Vercel o GitHub Pages.
- API Remota: pubblica la cartella `server/` su Render, Railway o un tuo VPS. Imposta l'URL in `settings.html`.

## Logo

Posiziona il tuo logo `logo.png` nella stessa cartella dell'applicazione per personalizzare l'interfaccia. Se il file non è presente, verrà mostrato il testo "3D Makes".

## Componenti del calcolo

- Costo materiale
- Ammortamento stampante
- Costo elettricità (0.30 CHF/kWh)
- Manodopera (30 CHF/ora)
- Failure rate (10%)
- Markup personalizzabile

L'applicazione è completamente autonoma e può essere condivisa facilmente copiando i file `app.py`, `logo.png` e `requirements.txt`. 