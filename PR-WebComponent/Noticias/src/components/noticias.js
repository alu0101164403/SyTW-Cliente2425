class NewsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.apiKey = '27ed3557dfb9494fb42efb0eb483f325';
        this.interval = null;
        this.topic = this.getAttribute('topic') || 'technology';
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .news-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin-top: 20px;
                    padding: 20px;
                }
                .news-title {
                    grid-column: span 4;
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
                .buttons {
                    margin-top: 10px;
                }
                .buttons button {
                    margin: 5px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .buttons button.rate {
                    background-color: #4CAF50;
                    color: white;
                }
                .buttons button.comment {
                    background-color: #008CBA;
                    color: white;
                }
            </style>
            <div class="news-container">
                <h2 class="news-title"></h2>
            </div>
        `;
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.fetchAndRenderNews(); 
        this.interval = setInterval(() => this.fetchAndRenderNews(), 120000);
    }

    disconnectedCallback() {
        if (this.interval) clearInterval(this.interval);
    }

    async fetchAndRenderNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${this.topic}&apiKey=${this.apiKey}`);
            const data = await response.json();

            if (data.articles) {
                this.renderNews(data.articles);
                this.dispatchEvent(new CustomEvent('news-updated', {
                    detail: { articles: data.articles },
                    bubbles: true,
                    composed: true
                }));
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    renderNews(articles) {
        const container = this.shadowRoot.querySelector('.news-container');
        
        // Limpiar el contenedor antes de agregar nuevas noticias
        container.innerHTML = '';
        
        const titleElement = document.createElement('h2');
        titleElement.classList.add('news-title');
        titleElement.innerText = `${this.topic.charAt(0).toUpperCase() + this.topic.slice(1)}`;
        container.appendChild(titleElement);

        articles.slice(0, 4).forEach((article, index) => {
            const newsNode = document.createElement('div');
            newsNode.classList.add('news-card');
            const daysSincePublished = this.calculateDaysSincePublished(article.publishedAt);
            newsNode.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image">
                <h3 class="title">${article.title}</h3>
                <p class="source">${article.author || 'Desconocido'}</p>
                <p class="date">${new Date(article.publishedAt).toLocaleDateString()}  -  Hace ${daysSincePublished} días</p>
                <div class="buttons">
                    <button class="rate" data-index="${index}">Valorar</button>
                    <button class="comment" data-index="${index}">Comentar</button>
                </div>
            `;
            container.appendChild(newsNode);

            newsNode.querySelector('.rate').addEventListener('click', () => this.handleRate(article));
            newsNode.querySelector('.comment').addEventListener('click', () => this.handleComment(article));
        });
    }

    handleRate(article) {
        this.dispatchEvent(new CustomEvent('rate-news', {
            detail: { article },
            bubbles: true,
            composed: true
        }));
    }

    handleComment(article) {
        this.dispatchEvent(new CustomEvent('comment-news', {
            detail: { article },
            bubbles: true,
            composed: true
        }));
    }

    calculateDaysSincePublished(publishedAt) {
        const publishedDate = new Date(publishedAt);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - publishedDate);
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }
}

customElements.define('news-card', NewsCard);
