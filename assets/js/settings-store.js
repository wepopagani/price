/*
 SettingsStore: storage astratto per impostazioni condivise

 Priorità:
 1) Endpoint REST remoto (window.SETTINGS_ENDPOINT) con API:
    - GET  {endpoint} -> { stampanti, materiali, impostazioni }
    - PUT  {endpoint} body JSON identico
 2) localStorage fallback (chiave '3dmakes_settings')

 Note:
 - Mantiene stesso schema usato nel progetto per compatibilità
 - Nessuna dipendenza esterna
*/

(function () {
  const LOCAL_KEY = '3dmakes_settings';

  function getConfiguredEndpoint() {
    const fromWindow = window.SETTINGS_ENDPOINT || '';
    const fromLocal = localStorage.getItem('3dmakes_settings_endpoint') || '';
    return fromWindow || fromLocal || '';
  }

  function isEndpointConfigured() {
    const url = getConfiguredEndpoint();
    return typeof url === 'string' && url.startsWith('http');
  }

  async function fetchRemoteSettings(endpointUrl) {
    const response = await fetch(endpointUrl, { method: 'GET', credentials: 'omit' });
    if (!response.ok) throw new Error('Impossibile leggere le impostazioni dal server');
    return await response.json();
  }

  async function putRemoteSettings(endpointUrl, settings) {
    const response = await fetch(endpointUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
      credentials: 'omit',
    });
    if (!response.ok) throw new Error('Impossibile salvare le impostazioni sul server');
  }

  function loadLocalSettings() {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }

  function saveLocalSettings(settings) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings));
  }

  const SettingsStore = {
    async getSettings(defaults) {
      function mergeWithDefaults(source, base) {
        const out = { ...base };
        if (source && typeof source === 'object') {
          // stampanti/materiali: usa source solo se ha almeno 1 chiave
          out.stampanti = source.stampanti && Object.keys(source.stampanti).length ? source.stampanti : base.stampanti;
          out.materiali = source.materiali && Object.keys(source.materiali).length ? source.materiali : base.materiali;
          // impostazioni: merge per chiavi note
          out.impostazioni = { ...base.impostazioni, ...(source.impostazioni || {}) };
        }
        return out;
      }

      // 1) remoto
      if (isEndpointConfigured()) {
        try {
          const remote = await fetchRemoteSettings(getConfiguredEndpoint());
          return mergeWithDefaults(remote, defaults);
        } catch (e) {
          console.warn('[SettingsStore] Errore remoto, fallback a localStorage:', e.message);
        }
      }
      // 2) localStorage
      const local = loadLocalSettings();
      if (local) return mergeWithDefaults(local, defaults);
      // 3) defaults
      return defaults;
    },

    async saveSettings(settings) {
      // salva sempre localmente per avere fallback offline
      saveLocalSettings(settings);

      if (isEndpointConfigured()) {
        try {
          await putRemoteSettings(getConfiguredEndpoint(), settings);
          return { ok: true, remote: true };
        } catch (e) {
          console.warn('[SettingsStore] Salvataggio remoto fallito, conservato localmente:', e.message);
          return { ok: false, remote: false, error: e.message };
        }
      }
      return { ok: true, remote: false };
    },
  };

  // Esporta
  window.SettingsStore = SettingsStore;
})();

