const KeyboardFnc = () => {
  const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
    },

    eventHandlers: {
      oninput: null,
      onclose: null,
    },

    properties: {
      value: '',
      capsLock: false,
    },

    init() {
      // Create
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');

      // Setup
      this.elements.main.classList.add('keyboard');
      this.elements.keysContainer.appendChild(this.createKeys());

      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

      // Add
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);

      document.querySelectorAll('.use-keyboard-input').forEach((el) => {
        const theEl = el;
        theEl.addEventListener('focus', () => {
          this.open(theEl.value, (currentValue) => {
            theEl.value = currentValue;
          });
        });
      });
    },

    createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
        'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
        'ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl',
      ];

      // Create HTML for an icon
      const createIconHTML = (iconName) => `${iconName}`;

      keyLayout.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');

        switch (key) {
          case 'backspace':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('Backspace');

            keyElement.addEventListener('click', () => {
              this.properties.value = this.properties.value
                .substring(0, this.properties.value.length - 1);
              this.triggerEvent('oninput');
            });

            break;

          case 'caps':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('CapsLock');

            keyElement.addEventListener('click', () => {
              this.properties.value = this.properties.value
                .substring(0, this.properties.value.length - 1);
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
            });

            break;

          case 'enter':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('Enter');

            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this.triggerEvent('oninput');
            });

            break;

          case 'space':
            keyElement.classList.add('keyboard__key--extra-wide');
            keyElement.innerHTML = createIconHTML('Space');

            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this.triggerEvent('oninput');
            });

            break;

          case 'done':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
            keyElement.innerHTML = createIconHTML('Shift');

            keyElement.addEventListener('click', () => {
              this.close();
              this.triggerEvent('onclose');
            });

            break;

          default:
            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener('click', () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this.triggerEvent('oninput');
            });

            break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
          fragment.appendChild(document.createElement('br'));
        }
      });

      return fragment;
    },

    triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] === 'function') {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },

    toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      // for (const key of this.elements.keys) {
      //   if (key.childElementCount === 0) {
      //     key.textContent = this.properties.capsLock
      //       ? key.textContent.toUpperCase()
      //       : key.textContent.toLowerCase();
      //   }
      // }
      this.elements.keys.forEach((key) => {
        const theKey = key;
        if (theKey.childElementCount === 0) {
          theKey.textContent = this.properties.capsLock
            ? theKey.textContent.toUpperCase()
            : theKey.textContent.toLowerCase();
        }
      });
    },

    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || '';
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    },

  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
  });
};

export default KeyboardFnc;
