class NewsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div class="news-container">
                <news-card topic="technology"></news-card>
                <news-card topic="science"></news-card>
                <news-card topic="sports"></news-card>
            </div>
        `;
    }
}

customElements.define('news-container', NewsContainer);
