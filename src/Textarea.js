const drawTextarea = () => {
  const Textarea = {
    textInfo: {
      textarea: null,
      osInfo: null,
      titlte: null,
    },

    drawKeyboardInput() {
      // create
      this.textInfo.textarea = document.createElement('textarea');
      this.textInfo.titlte = document.createElement('h1');
      this.textInfo.osInfo = document.createElement('p');

      // setup
      this.textInfo.textarea.classList.add('use-keyboard-input');

      this.textInfo.titlte.innerHTML = 'Virtual Keyboard';
      this.textInfo.osInfo.innerHTML = 'Keyboard created on Windows opertion system';

      // add
      document.body.append(this.textInfo.titlte);
      document.body.append(this.textInfo.textarea);
      document.body.append(this.textInfo.osInfo);
    },

  };
  window.addEventListener('DOMContentLoaded', () => {
    Textarea.drawKeyboardInput();
  });
};

export default drawTextarea;
