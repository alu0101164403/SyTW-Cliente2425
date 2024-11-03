class CommentsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div class="comments-container">
                <h3>Comentarios</h3>
                <ul id="comments-list"></ul>
            </div>
        `;
        document.addEventListener('comment-news', this.handleCommentNews.bind(this));
    }

    handleCommentNews(event) {
        const article = event.detail.article;
        const list = this.shadowRoot.getElementById('comments-list');
        const listItem = document.createElement('li');
        listItem.innerText = `Comentaste sobre: ${article.title}`;
        list.appendChild(listItem);
    }
}

customElements.define('comments-component', CommentsComponent);