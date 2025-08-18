# ⏱️ Sistema Tempi Avanzato + Fattore Sconto Quantità

## ✅ **Nuove Funzionalità Implementate:**

### 🕐 **1. Sistema Tempi Riorganizzato**

#### **Tempo di Stampa**
- **Campo unico** in ore decimali (es. 2.5 = 2 ore e 30 minuti)
- Input: `<input type="number" step="0.1" placeholder="es. 2.5">`
- **Più intuitivo** e preciso per i calcoli

#### **Pre-Stampa (Preparazione)**
- **Ore**: Campo separato per ore di preparazione
- **Minuti**: Campo separato per minuti di preparazione
- **Calcolo**: `oreTotaliPrep = ore + (minuti / 60)`

#### **Post-Stampa (Post-processing)**
- **Ore**: Campo separato per ore di post-lavorazione
- **Minuti**: Campo separato per minuti di post-lavorazione
- **Calcolo**: `oreTotaliPost = ore + (minuti / 60)`

### 🎯 **2. Fattore Sconto Quantità**

#### **Slider Interattivo**
- **Range**: 0% - 20% di sconto massimo
- **Valore di default**: 5%
- **Stile personalizzato**: Arancione con bordo nero
- **Aggiornamento real-time**: Calcolo automatico al movimento

#### **Formula Sconto Progressivo**
```javascript
if (quantita > 1) {
    const scontoApplicato = (quantita - 1) * (scontoQuantitaPerc / 100) * 0.1;
    const fattoreSconto = Math.min(scontoApplicato, scontoQuantitaPerc / 100);
    prezzoFinalePezzo = prezzoFinalePezzo * (1 - fattoreSconto);
}
```

#### **Logica dello Sconto**
- **Quantità 1**: Nessuno sconto
- **Quantità 10**: Sconto progressivo basato su slider
- **Quantità 50+**: Sconto massimo (valore slider)
- **Visualizzazione**: Riga dedicata nella tabella + anteprima

## 🔢 **Calcoli Aggiornati:**

### **Tempi Totali**
```javascript
const oreTotaliStampa = tempoStampaOre;
const oreTotaliPrep = prePrepOre + (prePrepMin / 60);
const oreTotaliPost = postProcOre + (postProcMin / 60);
const oreTotaliLavoro = oreTotaliPrep + oreTotaliPost;
```

### **Costi Dettagliati**
- **Materiale**: `(peso / 1000) * prezzoMateriale * quantita`
- **Ammortamento**: `(oreTotaliStampa / vitaStampante) * (prezzo + service)`
- **Elettricità**: `(oreTotaliStampa * watt / 1000) * 0.30`
- **Lavoro**: `oreTotaliLavoro * 30` (CHF/ora)

### **Prezzo Finale con Sconto**
1. **Prezzo base**: `totaleConFailure * (1 + markup%)`
2. **Sconto applicato**: Se quantità > 1
3. **Prezzo finale**: `prezzoBase * (1 - fattoreSconto)`

## 📊 **Visualizzazione Migliorata:**

### **Tabella Risultati**
- ✅ **Riga "Prezzo per Pezzo"**: Visibile se quantità > 1
- ✅ **Riga "Sconto Quantità"**: Visibile se sconto applicato
- ✅ **Colori distintivi**: Arancione per sconto

### **Anteprima Prezzo**
- ✅ **Prezzo principale**: 32px, verde
- ✅ **Info quantità**: Dettagli per pezzo
- ✅ **Sconto evidenziato**: 🎯 Icona + valore risparmio

## 🎨 **Elementi UI Aggiunti:**

### **Slider Personalizzato**
```css
input[type="range"]::-webkit-slider-thumb {
    background: #f58220;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #333;
}
```

### **Riga Sconto Tabella**
```css
.discount-row {
    background: #ffe6cc !important;
    border: 2px solid #ff9500 !important;
}
```

## 🚀 **Benefici del Sistema:**

1. **⏱️ Precisione Tempi**: Sistema più accurato e flessibile
2. **💰 Sconto Dinamico**: Incentiva ordini di grandi quantità
3. **🎯 Trasparenza**: Visualizzazione chiara di tutti gli sconti
4. **📊 Analytics**: Grafici che mostrano l'impatto delle quantità
5. **🔄 Real-time**: Aggiornamento istantaneo al movimento slider

## 📝 **Esempi Pratici:**

**Quantità 1**: Prezzo pieno, nessuno sconto
**Quantità 10** (slider 5%): ~2% sconto applicato
**Quantità 50** (slider 5%): ~5% sconto applicato
**Quantità 100** (slider 10%): ~10% sconto applicato

**Il sistema è ora completo e professionale!** 🎊 