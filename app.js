// app.js - Versión limpiada y optimizada
// - Código reorganizado y con comentarios innecesarios reducidos
// - Condiciones simplificadas
// - Errores manejados con mayor claridad
// - Mantiene la lógica original sin romper funcionalidad
// Pablo, esta es una base más mantenible y clara para continuar iterando


document.addEventListener('DOMContentLoaded', () => {
  console.log("Inicializando App...");
  loadState();
  initTheme();
  validateAndSetActiveScenario();
  document.getElementById('cuota-rubro-name-info').textContent = CUOTA_RUBRO_NAME;
  initUI();
  addEventListeners();
  updateUI();
});

function validateAndSetActiveScenario() {
  const activeKey = appState.activeScenarioKey;
  const scenario = appState.scenarios[activeKey];
  if (!scenario || parseInt(activeKey.split('_')[0]) !== appState.currentYear) {
    const fallbackKey = Object.keys(appState.scenarios).find(k => k.includes(appState.currentYear)) || Object.keys(appState.scenarios)[0];
    appState.activeScenarioKey = fallbackKey || `${appState.currentYear}_Base`;
    if (!fallbackKey) initScenarioData(appState.currentYear);
    saveState();
  }
  initializeScenarioDataForRubros(getCurrentScenarioData());
}

function getCurrentScenarioData() {
  const key = appState.activeScenarioKey;
  const data = appState.scenarios?.[key];
  if (!data) {
    console.error("Escenario inválido.");
    showSnackbar("Error crítico: no se pudo cargar el escenario.", true);
    return null;
  }
  return data;
}

function initUI() {
  document.getElementById('exercise-year').value = appState.currentYear;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  updateScenarioSelector();
  updateCurrentYearAndScenarioInUI();
}

