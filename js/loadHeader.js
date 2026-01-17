document.addEventListener("DOMContentLoaded", () => {
  const header = document.createElement("header");
  header.className = "site-header";

  header.innerHTML = `
    <div class="container">
      <h1 class="logo">
        <a href="index.html">Absolute Fansub</a>
      </h1>

      <nav class="main-nav">
        <ul>
          <li><a href="index.html">Início</a></li>
          <li><a href="post2.html">Posts</a></li>
        </ul>
      </nav>
    </div>
  `;

  document.body.insertBefore(header, document.body.firstChild);
});

