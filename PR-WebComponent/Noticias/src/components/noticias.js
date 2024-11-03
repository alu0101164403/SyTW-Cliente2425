class NewsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .news-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr); /* 4 columnas */
                    gap: 20px;
                    margin-top: 20px;
                    padding: 20px; /* Ajustar padding general */
                }
                .news-title {
                    grid-column: span 4; /* Hacer que el título ocupe todas las columnas */
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 1.5em; 
                    color: #333;
                }
                .news-card {
                    border: 1px solid #000;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .news-card img {
                    width: 100%;
                    height: auto;
                    max-height: 150px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    object-fit: cover;
                }
                .news-card h3 {
                    margin: 0 0 5px;
                    font-size: 1.1em;
                }
                .news-card p {
                    font-size: 0.9em;
                    color: #555;
                }
            </style>
            <div class="news-container">
                <h2 class="news-title"></h2>
            </div>
        `;
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        const topic = this.getAttribute('topic') || 'technology';
        const apiKey = '27ed3557dfb9494fb42efb0eb483f325';
        const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.articles) {
            this.renderNews(data.articles, topic);
            this.dispatchEvent(new CustomEvent('news-updated', {
                detail: { articles: data.articles },
                bubbles: true,
                composed: true
            }));
        }
    }

    renderNews(articles, topic) {
        const container = this.shadowRoot.querySelector('.news-container');
        const titleElement = container.querySelector('.news-title');
        titleElement.innerText = `${topic.charAt(0).toUpperCase() + topic.slice(1)}`;

        articles.slice(0, 4).forEach(article => {
            const newsNode = document.createElement('div');
            newsNode.classList.add('news-card');
            const daysSincePublished = this.calculateDaysSincePublished(article.publishedAt);
            newsNode.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image">
                <h3 class="title">${article.title}</h3>
                <p class="source">${article.author || 'Desconocido'}</p>
                <p class="date">${new Date(article.publishedAt).toLocaleDateString()}  -  Hace ${daysSincePublished} días</p>
            `;

            container.appendChild(newsNode);
        });
    }
    calculateDaysSincePublished(publishedAt) {
        const publishedDate = new Date(publishedAt);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - publishedDate);
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }
}

customElements.define('news-card', NewsCard);
