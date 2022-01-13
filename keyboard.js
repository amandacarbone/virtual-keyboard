const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        specialChar: false
    },

    init() {

        // create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // setup main elements
        this.elements.main.classList.add('keyboard', '1keyboardHidden');
        this.elements.keysContainer.classList.add('keyboardKeys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboardKey");

        // add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // automatically use keyboard for elements with .useKeyboardInput
        document.querySelectorAll('.useKeyboardInput').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });

    },

    _createKeys() {

        // setup keyboard layout
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'special', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
            'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
            'space'
        ];

        // setup special character keyboard layout
        const specialCharKeyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'special', '+', 'x', '&#247', '=', '/', '_', '<', '>', '[', ']',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'enter',
            'done', '-', "'", ':', ';', '`', '~', '|', ',', '.', '?',
            'space'
        ];

        // create HTML for an icon
        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        };

        // create keyboard keys and insert line breaks where needed
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            // add attributes and classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboardKey');

            switch(key) {
                case 'backspace':
                    keyElement.classList.add('keyboardKeyWide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', event => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                
                break;

                case 'caps':
                    keyElement.classList.add('keyboardKeyWide', 'keyboardKeyToggle');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', event => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboardKeyActive', this.properties.capsLock);
                    });
                
                break;

                case 'enter':
                    keyElement.classList.add('keyboardKeyWide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', event => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });
                
                break;

                case 'space':
                    keyElement.classList.add('keyboardKeyExtraWide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', event => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });
                
                break;

                case 'done':
                    keyElement.classList.add('keyboardKeyWide', 'keyboardKeyDark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', event => {
                        this.close();
                        this._triggerEvent('onclose');
                    });
                
                break;

                case 'special':
                    keyElement.classList.add('keyboardKeyWide');
                    keyElement.innerHTML = createIconHTML('star');

                    keyElement.addEventListener('click', event => {
                        this._toggleSpecialChar();
                        keyElement.innerHTML = createIconHTML('abc');
                    });
                
                break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', event => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    });
                
                break;
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }

        });

        return fragment;

    },

    _triggerEvent(handlerName) {
        if(typeof this.eventHandlers[handlerName] === 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for(const key of this.elements.keys) {
            if(key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleSpecialChar() {
        this.properties.specialChar = !this.properties.specialChar;

        for(const key of this.elements.keys) {
            if(key.childElementCount === 0) {
                key.textContent = this.properties.specialChar ? key.textContent.specialCharKeyLayout : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboardHidden');
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboardHidden');
    }
};

window.addEventListener('DOMContentLoaded', function () {
    keyboard.init();
    document.querySelector('.useKeyboardInput').value = '';
});