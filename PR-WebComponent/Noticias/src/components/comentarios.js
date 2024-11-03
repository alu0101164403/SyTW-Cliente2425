class CommentsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .comments {
                    margin-top: 10px;
                }
                .comment-input {
                    width: 100%;
                    padding: 5px;
                }
                .comment {
                    margin: 5px 0;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            </style>
            <div class="comments">
                <textarea class="comment-input" placeholder="Escribe un comentario..."></textarea>
                <button class="submit-comment">Enviar</button>
                <div class="comment-list"></div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.submit-comment').addEventListener('click', this.addComment.bind(this));
    }

    addComment() {
        const commentInput = this.shadowRoot.querySelector('.comment-input');
        const commentList = this.shadowRoot.querySelector('.comment-list');
        const commentText = commentInput.value.trim();

        if (commentText) {
            const commentNode = document.createElement('div');
            commentNode.classList.add('comment');
            commentNode.innerText = commentText;
            commentList.appendChild(commentNode);
            commentInput.value = '';
        }
    }
}
