class RatingComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.ratingValue = 0;
        this.totalVotes = 0;

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .rating {
                    display: flex;
                    align-items: center;
                }
                .star {
                    cursor: pointer;
                    font-size: 24px;
                    color: #ddd;
                }
                .star.selected {
                    color: gold;
                }
                .count {
                    margin-left: 10px;
                    font-size: 1em;
                }
            </style>
            <div class="rating">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
                <span class="count">0 valoraciones</span>
            </div>
        `;
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.stars = this.shadowRoot.querySelectorAll('.star');
        this.countElement = this.shadowRoot.querySelector('.count');

        this.addStarEventListeners();
    }

    static get observedAttributes() {
        return ['news-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'news-id') {
            this.newsId = newValue; // Guarda el ID de la noticia
            this.loadRating(); // Carga la valoración si es necesario
        }
    }

    addStarEventListeners() {
        this.stars.forEach(star => {
            star.addEventListener('click', () => {
                this.ratingValue = parseInt(star.dataset.value);
                this.updateStars();
                this.updateCount();
                this.dispatchEvent(new CustomEvent('rating-changed', {
                    detail: { newsId: this.newsId, rating: this.ratingValue },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    updateStars() {
        this.stars.forEach(star => {
            star.classList.remove('selected');
            if (parseInt(star.dataset.value) <= this.ratingValue) {
                star.classList.add('selected');
            }
        });
    }

    updateCount() {
        this.totalVotes += 1;
        this.countElement.innerText = `${this.totalVotes} valoraciones`;
    }

    loadRating() {
        // Aquí podrías cargar la valoración desde un almacenamiento o API si es necesario
    }
}

customElements.define('rating-component', RatingComponent);
