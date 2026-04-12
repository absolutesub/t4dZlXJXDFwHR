// js/post-detail-logic.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'));

    const postAuthorElement = document.getElementById('post-detail-author');
    const postDateElement = document.getElementById('post-detail-date');
    const postImageElement = document.getElementById('post-detail-image');
    const postContentElement = document.getElementById('post-detail-content');
    const postPageTitleElement = document.getElementById('post-page-title');

    if (!postId) {
        if (postPageTitleElement) postPageTitleElement.textContent = 'Nenhum Post Especificado';
        if (postContentElement) postContentElement.innerHTML = '<p>Por favor, especifique um ID de post na URL (ex: contentpost.html?id=1).</p>';
        if (postImageElement) postImageElement.remove();
        return;
    }

    const post = posts.find(p => p.id === postId);

    if (!post) {
        if (postPageTitleElement) postPageTitleElement.textContent = 'Post Não Encontrado';
        if (postContentElement) postContentElement.innerHTML = '<p>Desculpe, o post que você procura não foi encontrado.</p>';
        if (postImageElement) postImageElement.remove();
        window.location.href = '404.html';
        return;
    }

    // SEO dinâmico
    document.title = `${post.title} - Absolute Fansub`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', post.summary || post.fullContent.replace(/<[^>]*>/g, '').slice(0, 150));
    }

    document.getElementById("og-title")?.setAttribute("content", post.title);
    document.getElementById("og-description")?.setAttribute("content", post.summary || post.fullContent.replace(/<[^>]*>/g, '').slice(0, 150));
    document.getElementById("og-image")?.setAttribute("content", location.origin + '/' + post.thumbnail);
    document.getElementById("og-url")?.setAttribute("content", location.href);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": new Date(post.date).toISOString(),
        "image": location.origin + '/' + post.thumbnail,
        "articleBody": post.fullContent.replace(/<[^>]*>/g, '').slice(0, 500),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": location.href
        }
    };

    const ldJson = document.getElementById("structured-data");
    if (ldJson) ldJson.textContent = JSON.stringify(structuredData);

    if (postPageTitleElement) postPageTitleElement.textContent = post.title;
    if (postAuthorElement) postAuthorElement.textContent = post.author;

    const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (postDateElement) {
        postDateElement.textContent = formattedDate;
        postDateElement.setAttribute("datetime", post.date);
    }

    // Define o src da imagem
    if (postImageElement && post.thumbnail) {
        postImageElement.src = post.thumbnail;
        postImageElement.alt = `Imagem de destaque para o anime ${post.title}`;
    } else if (postImageElement) {
        postImageElement.remove();
    }

    if (postContentElement) postContentElement.innerHTML = post.fullContent;
});
