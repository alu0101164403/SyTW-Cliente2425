class RatingComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div class="rating-container">
                <h3>Valoraciones</h3>
                <ul id="rating-list"></ul>
            </div>
        `;
        document.addEventListener('rate-news', this.handleRateNews.bind(this));
    }

    handleRateNews(event) {
        const article = event.detail.article;
        const list = this.shadowRoot.getElementById('rating-list');
        const listItem = document.createElement('li');
        listItem.innerText = `Valoraste: ${article.title}`;
        list.appendChild(listItem);
    }
}

customElements.define('rating-component', RatingComponent);

