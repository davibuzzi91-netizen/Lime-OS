/* ===================================================================
   Lime OS — app-window.js
   Controla a abertura/fechamento das janelas de app (Configurações,
   Tester, Sobre). Janela expande até ocupar a tela; ao fechar, faz
   o caminho inverso. Fechar nesta versão: toque em qualquer lugar
   da janela aberta (ainda não há botão de voltar dedicado — pendente).
   =================================================================== */

const LimeAppWindow = {
  _current: null,

  open(appId) {
    const win = document.getElementById(`app-${appId}`);
    if (!win) return;

    this._current = win;

    win.classList.add('opening');
    // força reflow para garantir que a transição rode a partir do estado "fechado"
    void win.offsetWidth;
    win.classList.add('open');

    win.addEventListener('click', this._onWindowTap);
  },

  close() {
    const win = this._current;
    if (!win) return;

    win.classList.remove('open');

    win.removeEventListener('click', this._onWindowTap);

    const handleEnd = () => {
      win.classList.remove('opening');
      win.removeEventListener('transitionend', handleEnd);
    };
    win.addEventListener('transitionend', handleEnd);

    this._current = null;
  },

  _onWindowTap(e) {
    LimeAppWindow.close();
  }
};

LimeAppWindow._onWindowTap = LimeAppWindow._onWindowTap.bind(LimeAppWindow);
