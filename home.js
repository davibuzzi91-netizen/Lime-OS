/* ===================================================================
   Lime OS — home.js
   Controla a tela inicial: detecta toque em um dos ícones de app
   e aciona a abertura da respectiva janela (via app-window.js).
   Para adicionar um novo app no futuro: criar o botão .app-icon em
   index.html com data-app="novo-id" e a section #app-novo-id.
   =================================================================== */

const LimeHome = {
  start() {
    const grid = document.querySelector('.app-grid');

    grid.addEventListener('click', (e) => {
      const icon = e.target.closest('.app-icon');
      if (!icon) return;

      const appId = icon.dataset.app;
      LimeAppWindow.open(appId);
    });
  }
};
