class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #333;
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    font-size: 0.9rem;
                    margin-top: 20px;
                }
            </style>
            <footer>
                &copy; 2024 NoticiasApp. Todos los derechos reservados.
            </footer>
        `;
    }
}

customElements.define('footer-bar', Footer);
