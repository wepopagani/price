# 📝 Sistema Preventivi con Numerazione Automatica

## 🎯 Cosa è stato implementato

Hai ora un sistema completo per generare preventivi con numerazione automatica e sequenziale usando Firebase Firestore!

### ✨ Funzionalità

1. **Numerazione Automatica Sequenziale** 
   - Quando apri `genera-preventivo.html`, il numero viene generato automaticamente
   - Formato: `ANNO/NNN` (es. 2025/001, 2025/002, 2025/003, ...)
   - Si resetta automaticamente ogni anno (2026/001, 2026/002, ...)
   - I numeri sono **univoci** e **sequenziali** (gestiti con transazioni Firestore)

2. **Salvataggio Automatico in Cloud**
   - Ogni volta che scarichi il PDF, il preventivo viene salvato automaticamente in Firestore
   - I dati includono: numero, data, cliente, righe articoli, totale, timestamp

3. **Storico Preventivi**
   - Pagina `storico-preventivi.html` per visualizzare tutti i preventivi salvati
   - Statistiche in tempo reale
   - Filtri per cliente, numero, anno
   - Ordinamento personalizzabile

---

## 🚀 Come Iniziare

### Passo 1: Configura Firebase

Segui la guida dettagliata in **`FIREBASE-SETUP.md`** per:
1. Creare un progetto Firebase (gratuito)
2. Attivare Firestore Database
3. Copiare le credenziali
4. Configurare i file HTML

### Passo 2: Inserisci le Credenziali

Apri questi file e sostituisci le credenziali Firebase:

#### 📄 `genera-preventivo.html` (linea ~541)
```javascript
const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "tuo-progetto.firebaseapp.com",
    projectId: "tuo-progetto",
    // ... altre credenziali
};
```

#### 📄 `storico-preventivi.html` (linea ~259)
```javascript
const firebaseConfig = {
    // ... stesse credenziali di sopra
};
```

> ⚠️ **Importante**: Usa le STESSE credenziali in entrambi i file!

### Passo 3: Testa il Sistema

1. Apri `genera-preventivo.html` nel browser
2. Il numero preventivo dovrebbe apparire automaticamente (es. 2025/001)
3. Compila i dati del cliente
4. Clicca "📥 Scarica PDF"
5. Il preventivo viene salvato in Firestore automaticamente

### Passo 4: Visualizza lo Storico

1. Clicca su "📋 Storico Preventivi" 
2. Oppure apri `storico-preventivi.html`
3. Vedrai tutti i preventivi salvati con statistiche

---

## 📁 Struttura Database Firestore

```
firestore/
├── counters/
│   └── preventivi/
│       ├── counter: 5           ← Prossimo numero da usare
│       ├── year: 2025           ← Anno corrente
│       └── lastUpdated: ...     ← Timestamp ultimo aggiornamento
│
└── preventivi/
    ├── [doc-id-1]/
    │   ├── numeroOfferta: "2025/001"
    │   ├── data: "2025-11-03"
    │   ├── cliente: { nome: "...", indirizzo: "..." }
    │   ├── righe: [...]
    │   ├── totale: 250.00
    │   ├── valuta: "CHF"
    │   ├── createdAt: timestamp
    │   └── updatedAt: timestamp
    │
    ├── [doc-id-2]/
    │   └── numeroOfferta: "2025/002"
    │   └── ...
    └── ...
```

---

## 🔄 Come Funziona la Numerazione Sequenziale

1. **All'apertura della pagina**:
   - Il sistema contatta Firestore
   - Legge il documento `counters/preventivi`
   - Prende il valore `counter` (es. 5)
   - Verifica l'anno (se è cambiato, resetta a 1)

2. **Generazione numero**:
   - Incrementa il counter (es. 5 → 6)
   - Crea il numero: `${anno}/${counter}` → `2025/006`
   - Salva il nuovo counter in Firestore
   - Usa **transazioni** per evitare duplicati

3. **Salvataggio preventivo**:
   - Quando scarichi il PDF
   - Salva tutti i dati in `preventivi/[auto-id]`
   - Include timestamp e dati completi

---

## 📊 Pagina Storico Preventivi

### Statistiche Visibili:
- 📈 **Preventivi Totali**: Numero totale di preventivi salvati
- 📅 **Quest'Anno**: Preventivi dell'anno corrente
- 💰 **Totale Preventivato**: Somma di tutti i preventivi (in CHF)
- 🔢 **Ultimo Numero**: Ultimo numero preventivo generato

### Filtri Disponibili:
- 🔍 **Nome Cliente**: Cerca per nome cliente
- 🔍 **Numero Preventivo**: Cerca numero specifico
- 📅 **Anno**: Filtra per anno
- ⬆️⬇️ **Ordinamento**: Più recenti o più vecchi prima

---

## 🛠️ File Modificati/Creati

| File | Descrizione |
|------|-------------|
| `genera-preventivo.html` | ✏️ Modificato - aggiunto Firebase, numerazione automatica, salvataggio |
| `storico-preventivi.html` | ✨ Nuovo - pagina per visualizzare tutti i preventivi |
| `FIREBASE-SETUP.md` | 📚 Nuovo - guida completa configurazione Firebase |
| `PREVENTIVI-README.md` | 📖 Nuovo - questo file, panoramica sistema |

---

## ⚠️ Importante da Sapere

### Funzionamento Offline
- ❌ Il sistema richiede connessione internet per funzionare
- Se offline, verrà usato un numero di default (2025/001)
- Il salvataggio in Firestore fallirà ma il PDF verrà comunque scaricato

### Sicurezza
- 🔓 Di default, chiunque può leggere/scrivere (solo per test!)
- 🔒 Per produzione, configura le regole di sicurezza (vedi FIREBASE-SETUP.md)
- 🔐 Opzionale: aggiungi Firebase Authentication per proteggere i dati

### Costi
- 💰 Firebase ha un piano gratuito molto generoso
- ✅ Piano Spark (gratuito): 50K letture/giorno, 20K scritture/giorno
- ✅ Per un'attività normale, il piano gratuito è più che sufficiente

---

## 🐛 Risoluzione Problemi

### Il numero non si genera automaticamente
1. Apri la Console del browser (F12)
2. Verifica se vedi: `✅ Firebase inizializzato correttamente`
3. Se vedi errori, controlla le credenziali Firebase

### "Permission denied" su Firestore
- Vai su Firebase Console → Firestore Database → Regole
- Verifica che le regole permettano lettura/scrittura
- Per test usa: `allow read, write: if true;`

### Il preventivo non si salva
- Verifica che Firestore sia attivato nel progetto Firebase
- Controlla la console del browser per errori
- Il PDF verrà comunque scaricato anche se il salvataggio fallisce

### Numeri duplicati
- Non dovrebbe succedere (usiamo transazioni Firestore)
- Se succede, elimina il documento `counters/preventivi` e ricrealo manualmente

---

## 🎓 Per Approfondire

### Documentazione Utile:
- [Firebase Console](https://console.firebase.google.com/)
- [Documentazione Firestore](https://firebase.google.com/docs/firestore)
- [Transazioni Firestore](https://firebase.google.com/docs/firestore/manage-data/transactions)

### Possibili Estensioni Future:
- 📧 Invio preventivo via email
- 💾 Salvataggio PDF in Firebase Storage
- 👥 Sistema multi-utente con autenticazione
- 📊 Dashboard con grafici e analytics
- 🔔 Notifiche preventivi scaduti
- 📱 App mobile

---

## ✅ Checklist Setup

- [ ] Creato progetto Firebase
- [ ] Attivato Firestore Database
- [ ] Copiato credenziali Firebase
- [ ] Inserito credenziali in `genera-preventivo.html`
- [ ] Inserito credenziali in `storico-preventivi.html`
- [ ] Configurato regole sicurezza Firestore
- [ ] Testato generazione preventivo
- [ ] Verificato salvataggio in Firestore
- [ ] Controllato storico preventivi

---

## 🎉 Conclusione

Hai ora un sistema professionale per:
- ✅ Generare preventivi con numerazione automatica
- ✅ Salvare tutto in cloud (Firebase/Firestore)
- ✅ Visualizzare lo storico completo
- ✅ Avere statistiche in tempo reale
- ✅ Filtrare e cercare preventivi passati

**Non serve premere nessun pulsante** - il numero viene generato automaticamente all'apertura della pagina! 🚀

---

**Supporto**: Se hai bisogno di aiuto, controlla prima `FIREBASE-SETUP.md` per la configurazione dettagliata.

