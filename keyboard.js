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
        capsLock: false
    },

    init() {

        // create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // setup main elements
        this.elements.main.classList.add('keyboard', '1keyboardHidden');
        this.elements.keysContainer.classList.add('keys');

        // add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {

        // setup keyboard layout
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
            'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
            'space'
        ];

        // create HTML for an icon
        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        };

        // create keyboard keys and insert line breaks where needed
        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== 1;
        });

    },

    _triggerEvent(handlerName) {
        console.log('Event Triggered! Event Name: ' + handlerName);
    },

    _toggleCapsLock() {
        console.log('Caps Lock Toggled');
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', function () {
    keyboard.init();
});