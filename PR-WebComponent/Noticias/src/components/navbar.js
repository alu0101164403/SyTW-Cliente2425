class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    background-color: #333;
                    padding: 1em;
                    text-align: center;
                }
                .navbar a {
                    color: white;
                    margin: 0 1em;
                    text-decoration: none;
                    font-weight: bold;
                }
                .navbar a:hover {
                    text-decoration: underline;
                }
            </style>
            <nav class="navbar">
                <a href="#">Home</a>
                <a href="#">Noticias</a>
                <a href="#">Valoraciones</a>
                <a href="#">Contacto</a>
            </nav>
        `;
    }
}

customElements.define('nav-bar', NavBar);
