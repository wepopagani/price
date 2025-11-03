# 🔥 Guida Configurazione Firebase per Preventivi

## 📋 Prerequisiti
- Account Google (gratuito)
- Accesso a [Firebase Console](https://console.firebase.google.com/)

---

## 🚀 Passo 1: Crea un Progetto Firebase

1. Vai su [console.firebase.google.com](https://console.firebase.google.com/)
2. Clicca su **"Aggiungi progetto"** o **"Add project"**
3. Inserisci un nome per il progetto (es. "3dmakes-preventivi")
4. (Facoltativo) Disattiva Google Analytics se non ti serve
5. Clicca su **"Crea progetto"**

---

## 🌐 Passo 2: Registra la tua App Web

1. Nella dashboard del progetto, clicca sull'icona **Web** (`</>`)
2. Inserisci un nickname per l'app (es. "Generatore Preventivi")
3. **NON** spuntare "Firebase Hosting" (a meno che non lo usi)
4. Clicca su **"Registra app"**

---

## 🔑 Passo 3: Copia le Credenziali

Firebase ti mostrerà un codice simile a questo:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnop",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**COPIA QUESTI VALORI!** Ti serviranno tra poco.

---

## 📊 Passo 4: Attiva Firestore Database

1. Nel menu laterale di Firebase, vai su **"Firestore Database"**
2. Clicca su **"Crea database"** o **"Create database"**
3. Scegli la modalità:
   - **Modalità produzione** (consigliata) - più sicura
   - **Modalità test** - per iniziare rapidamente (scade dopo 30 giorni)
4. Scegli la località più vicina (es. "europe-west1" per l'Europa)
5. Clicca su **"Attiva"**

---

## 🔒 Passo 5: Configura le Regole di Sicurezza

1. In Firestore Database, vai su **"Regole"** (Rules)
2. Sostituisci il contenuto con queste regole:

### Opzione A: Per sviluppo/test (TUTTI possono leggere/scrivere)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permetti accesso a tutti (SOLO PER TEST!)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Opzione B: Accesso limitato in lettura, scrittura libera
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Preventivi: tutti possono scrivere, solo tu puoi leggere
    match /preventivi/{preventivoId} {
      allow create: if true;  // Chiunque può creare
      allow read, update, delete: if false;  // Nessuno può leggere/modificare
    }
    
    // Counter: tutti possono leggere e aggiornare
    match /counters/{counterId} {
      allow read, write: if true;
    }
  }
}
```

### Opzione C: Con autenticazione (PIÙ SICURA - consigliata per produzione)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo utenti autenticati possono accedere
    match /preventivi/{preventivoId} {
      allow read, write: if request.auth != null;
    }
    
    match /counters/{counterId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clicca su **"Pubblica"**

> ⚠️ **IMPORTANTE**: Per la produzione, usa l'Opzione C con autenticazione. Le altre sono solo per test.

---

## ⚙️ Passo 6: Configura il File HTML

1. Apri il file **`genera-preventivo.html`**
2. Cerca questa sezione (circa linea 541):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. **SOSTITUISCI** con i valori che hai copiato al Passo 3

### Esempio:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC1234567890abcdefghijklmnop",
    authDomain: "3dmakes-preventivi.firebaseapp.com",
    projectId: "3dmakes-preventivi",
    storageBucket: "3dmakes-preventivi.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

4. **Salva il file**

---

## 🎯 Come Funziona la Numerazione Sequenziale

Il sistema utilizza un **contatore Firestore** per garantire numeri sequenziali:

### Struttura del Database:

```
📁 counters (collection)
  └── 📄 preventivi (document)
       ├── counter: 15
       ├── year: 2025
       └── lastUpdated: timestamp

📁 preventivi (collection)
  ├── 📄 [ID automatico]
  │    ├── numeroOfferta: "2025/001"
  │    ├── data: "2025-11-03"
  │    ├── cliente: { nome: "Mario Rossi", indirizzo: "..." }
  │    ├── righe: [...]
  │    ├── totale: 250.00
  │    ├── valuta: "CHF"
  │    ├── createdAt: timestamp
  │    └── updatedAt: timestamp
  ├── 📄 [ID automatico]
  │    └── numeroOfferta: "2025/002"
  └── ...
```

### Come funziona:

1. **All'apertura della pagina**: il sistema legge il contatore da `counters/preventivi`
2. **Incrementa il numero**: aggiunge +1 in modo atomico (usando transazioni Firestore)
3. **Genera il numero**: formato `ANNO/NNN` (es. 2025/001, 2025/002, ecc.)
4. **Ogni anno ricomincia da 1**: il contatore si resetta automaticamente al cambio anno

---

## ✅ Passo 7: Testa il Sistema

1. Apri `genera-preventivo.html` nel browser
2. Apri la **Console del browser** (F12 → Console)
3. Dovresti vedere: `✅ Firebase inizializzato correttamente`
4. Il campo "Numero Offerta" dovrebbe mostrare automaticamente: `2025/001`

### Se vedi errori:

- **"Firebase non configurato"**: hai dimenticato di sostituire le credenziali
- **"Permission denied"**: controlla le regole di sicurezza in Firestore
- **"Network error"**: controlla la connessione internet

---

## 📱 Verifica i Dati Salvati

1. Genera un preventivo e clicca su **"📥 Scarica PDF"**
2. Vai su Firebase Console → Firestore Database
3. Dovresti vedere:
   - Collection **`counters`** → Document **`preventivi`** con counter = 1
   - Collection **`preventivi`** → Un nuovo documento con i dati del preventivo

---

## 🔐 Sicurezza per Produzione

Se vuoi proteggere i tuoi dati, aggiungi **Firebase Authentication**:

### Setup Rapido:

1. In Firebase Console, vai su **"Authentication"**
2. Clicca su **"Inizia"**
3. Abilita **"Email/Password"** come metodo di accesso
4. Aggiungi gli utenti manualmente o crea un form di login

### Modifica `genera-preventivo.html`:

Aggiungi prima del tag `</head>`:
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
```

Aggiungi dopo l'inizializzazione Firebase:
```javascript
// Login anonimo automatico (opzione semplice)
firebase.auth().signInAnonymously()
    .then(() => console.log('✅ Utente autenticato'))
    .catch((error) => console.error('❌ Errore autenticazione:', error));
```

Poi usa le **regole di sicurezza Opzione C** (vedi Passo 5).

---

## 📊 Visualizzare i Preventivi

I dati sono salvati in Firestore e puoi:

1. **Visualizzarli direttamente in Firebase Console** (Firestore Database)
2. **Creare una pagina web** per listare tutti i preventivi
3. **Esportare i dati** in CSV/JSON dalla console Firebase

---

## 💰 Costi

Firebase ha un **piano gratuito** (Spark) che include:
- ✅ 50,000 letture/giorno
- ✅ 20,000 scritture/giorno
- ✅ 1 GB storage

Per un'attività come la tua, il piano gratuito è **più che sufficiente**!

---

## 🆘 Problemi Comuni

| Problema | Soluzione |
|----------|-----------|
| "Firebase non configurato" | Sostituisci le credenziali nel codice |
| "Permission denied" | Controlla le regole di sicurezza |
| Numero non si genera | Apri la console (F12) per vedere l'errore |
| Preventivo non si salva | Verifica che Firestore sia attivato |
| "Network error" | Controlla connessione internet |

---

## 📚 Risorse Utili

- [Documentazione Firebase](https://firebase.google.com/docs)
- [Firestore Regole di Sicurezza](https://firebase.google.com/docs/firestore/security/rules-structure)
- [Prezzi Firebase](https://firebase.google.com/pricing)

---

## ✨ Cosa Hai Ottenuto

✅ Numerazione automatica e sequenziale dei preventivi (2025/001, 2025/002, ...)  
✅ Salvataggio automatico in cloud quando scarichi il PDF  
✅ Database persistente accessibile da ovunque  
✅ Reset automatico del contatore ogni anno  
✅ Sistema scalabile e professionale  

---

**Fatto! 🎉** 

Ora ogni volta che apri `genera-preventivo.html`, otterrai automaticamente il prossimo numero sequenziale!

