/* ===================================================================
   Lime OS — lock.js
   Controla a tela de bloqueio: relógio em tempo real + teclado de PIN.
   PIN inicial fixo: "0000" (sem personalização nesta versão).
   =================================================================== */

const LimeLock = {
  PIN_CODE: '0000',
  _enteredPin: '',
  _clockInterval: null,

  start(onUnlock) {
    this._enteredPin = '';
    this._updateDots();
    this._startClock();
    this._bindKeys(onUnlock);
  },

  stop() {
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = null;
    }
  },

  _startClock() {
    const timeEl = document.getElementById('lock-time');

    const render = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      timeEl.textContent = `${hh}:${mm}`;
    };

    render();
    this._clockInterval = setInterval(render, 1000);
  },

  _bindKeys(onUnlock) {
    const pad = document.getElementById('pin-pad');

    // evita múltiplos binds se a tela for reaberta
    const newPad = pad.cloneNode(true);
    pad.parentNode.replaceChild(newPad, pad);

    newPad.addEventListener('click', (e) => {
      const key = e.target.closest('.pin-key');
      if (!key || !key.dataset.key) return;

      const value = key.dataset.key;

      if (value === 'del') {
        this._enteredPin = this._enteredPin.slice(0, -1);
        this._updateDots();
        return;
      }

      if (this._enteredPin.length >= 4) return;

      this._enteredPin += value;
      this._updateDots();

      if (this._enteredPin.length === 4) {
        this._checkPin(onUnlock);
      }
    });
  },

  _checkPin(onUnlock) {
    if (this._enteredPin === this.PIN_CODE) {
      setTimeout(() => {
        this.stop();
        onUnlock();
      }, 200);
    } else {
      this._showError();
      setTimeout(() => {
        this._enteredPin = '';
        this._updateDots();
      }, 400);
    }
  },

  _updateDots() {
    const dots = document.querySelectorAll('#pin-dots .pin-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('filled', i < this._enteredPin.length);
      dot.classList.remove('error');
    });
  },

  _showError() {
    const dots = document.querySelectorAll('#pin-dots .pin-dot');
    dots.forEach((dot) => dot.classList.add('error'));
  }
};
