/* ===================================================================
   Lime OS — loading.js
   Controla a tela de carregamento: anima o limão (2 giros + deslocamento
   lateral) e depois revela o logo "LimeOS".
   Duração total: 4 segundos, depois chama o callback para ir à tela de bloqueio.
   =================================================================== */

const LimeLoading = {
  DURATION_MS: 4000,
  SPIN_START_DELAY_MS: 200,   // pequena pausa antes do limão começar a girar
  LOGO_REVEAL_DELAY_MS: 1900, // quando o logo aparece (logo após o giro do limão)

  start(onFinish) {
    const lemon = document.getElementById('lemon');
    const logo = document.getElementById('lime-os-logo');

    // reset de estado (garante que, se a tela for reaberta no futuro, anime de novo)
    lemon.classList.remove('spin-move');
    logo.classList.remove('visible');

    setTimeout(() => {
      lemon.classList.add('spin-move');
    }, this.SPIN_START_DELAY_MS);

    setTimeout(() => {
      logo.classList.add('visible');
    }, this.LOGO_REVEAL_DELAY_MS);

    setTimeout(() => {
      onFinish();
    }, this.DURATION_MS);
  }
};
