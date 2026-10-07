/* ===================================================================
   Lime OS — boot.js
   Controla a tela de boot ("Davi OS" / "Powered by Android" / robô).
   Duração: 3 segundos, depois chama o callback para ir à tela de loading.
   =================================================================== */

const LimeBoot = {
  DURATION_MS: 3000,

  /**
   * Inicia a sequência de boot e chama onFinish() ao fim da duração.
   */
  start(onFinish) {
    setTimeout(() => {
      onFinish();
    }, this.DURATION_MS);
  }
};
