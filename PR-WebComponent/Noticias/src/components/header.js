class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            .header {
                background-color: #444;
                color: white;
                padding: 2em;
                text-align: center;
                font-size: 2em;
                font-weight: bold;
            }
        </style>
        <header class="header">
            <h1>Noticias de Mundo</h1>
            <p>Las últimas noticias y valoraciones</p>
        </header>
    `;
    }
}

customElements.define('header-component', HeaderComponent);
