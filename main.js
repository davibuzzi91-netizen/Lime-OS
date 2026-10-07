/* ===================================================================
   Lime OS — main.js
   Orquestra a sequência de telas: boot → loading → lock → home.
   Cada módulo (LimeBoot, LimeLoading, LimeLock, LimeHome) cuida da
   própria lógica; este arquivo só troca qual <section class="screen">
   está visível e dispara o próximo passo.
   =================================================================== */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => {
    el.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function goToLoading() {
  showScreen('screen-loading');
  LimeLoading.start(goToLock);
}

function goToLock() {
  showScreen('screen-lock');
  LimeLock.start(goToHome);
}

function goToHome() {
  showScreen('screen-home');
  LimeHome.start();
}

// Registro do service worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // falha silenciosa: app continua funcionando normalmente sem o SW
    });
  });
}

// Início da sequência: boot
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-boot');
  LimeBoot.start(goToLoading);
});
