class CicloVida extends HTMLElement {
    constructor() {
        super();
        console.log('Componente creado');
    }

    connectedCallback() {
        console.log('Elemento adjuntado al DOM');
    }

    disconnectedCallback() {
        console.log('Elemento separado del DOM');
    }

    static get observedAttributes() {
        return ['data-attribute'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Atributo cambiado: ${name}.`);
    }
}

customElements.define('my-web-component', CicloVida);
