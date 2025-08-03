// comentarios.js

// === Variáveis e Elementos do Comentário ===
const form = document.getElementById('comentarioForm');
const lista = document.getElementById('listaComentarios');
const erroComentario = document.getElementById("erroComentario");

const contadorCaracteres = document.createElement('div');
contadorCaracteres.id = 'contador-caracteres';
contadorCaracteres.style.fontSize = '11px';
contadorCaracteres.style.color = '#666';
contadorCaracteres.style.textAlign = 'right';
contadorCaracteres.style.marginTop = '0px';

// Insere o contador após o campo de comentário
form.comentario.insertAdjacentElement('afterend', contadorCaracteres);

// Variáveis que serão preenchidas por data.js
let FORM_URL;
let ENTRY_NOME;
let ENTRY_COMENTARIO;
let CSV_URL;

// Caracteres proibidos para CSV
const caracteresProibidosCSV = /["\n\r,;]/g;

// Garante que as variáveis globais sejam atribuídas
document.addEventListener('DOMContentLoaded', () => {
    if (window.commentConfig) {
        FORM_URL = window.commentConfig.FORM_URL;
        ENTRY_NOME = window.commentConfig.ENTRY_NOME;
        ENTRY_COMENTARIO = window.commentConfig.ENTRY_COMENTARIO;
        CSV_URL = window.commentConfig.CSV_URL;

        carregarComentarios();
    } else {
        console.error("window.commentConfig não foi definido. Comentários não serão carregados corretamente.");
        lista.innerHTML = "<p>Erro na configuração dos comentários. Por favor, tente novamente mais tarde.</p>";
    }
});

const palavrasProibidasAnimes = [
    "fdp", "fila da puta", "filha da puta", "pau no cu", "cuzão", "merdinha", "cu", "buceta",
    "lixo", "verme", "nojento", "nojenta", "inútil", "retardado", "retardada",
    "inferno", "maldito", "maldita", "desgraçado", "desgraçada", "energúmeno",
    "piranha", "sirigaita", "quenga", "arrombado", "arrombada",
    "psicopata", "terrorista", "assassino", "assassina", "ladrão", "ladra",
    "bandido", "bandida", "marginal", "marginais"
];

// === Funções de Validação e Utilidade ===
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function contemPalavrasOfensivas(texto) {
    const textoLimpo = normalizar(texto);
    return palavrasProibidasAnimes.some(palavra => {
        const regex = new RegExp(`\\b${palavra}\\b`, 'i');
        return regex.test(textoLimpo);
    });
}

function marcarPalavrasOfensivas(texto) {
    const palavras = texto.split(/\s+/);
    return palavras.map(palavra => {
        const palavraNormalizada = normalizar(palavra);
        const ofensiva = palavrasProibidasAnimes.some(proibida =>
            palavraNormalizada.includes(proibida)
        );
        return ofensiva ? `<span style="text-decoration: underline; color: #ff0000ff;">fdp</span>` : palavra;
    }).join(' ');
}

function validarCampos(nome, comentario) {
    const regexNome = /^[a-zA-ZÀ-ÿ0-9\s]{2,30}$/;

    form.comentario.classList.remove("erro");
    erroComentario.textContent = "";

    if (!regexNome.test(nome)) {
        erroComentario.textContent = "* Nome inválido. Use apenas letras e números.";
        return false;
    }

    if (comentario.length > 300) {
        erroComentario.textContent = "* Comentário muito longo. Máximo de 300 caracteres.";
        form.comentario.classList.add("erro");
        return false;
    }

    if (caracteresProibidosCSV.test(comentario)) {
        erroComentario.textContent = "* Comentário contém caracteres inválidos (, \";\" quebras de linha etc).";
        form.comentario.classList.add("erro");
        return false;
    }

    if (contemPalavrasOfensivas(comentario)) {
        erroComentario.textContent = "* Seu comentário contém palavras inadequadas. Por favor, seja respeitoso.";
        form.comentario.classList.add("erro");
        return false;
    }

    return true;
}

function podeComentar() {
    const ultimoEnvio = localStorage.getItem("ultimoComentario");
    const agora = Date.now();
    if (ultimoEnvio && agora - ultimoEnvio < 60000) {
        erroComentario.textContent = "* Espere pelo menos 1 minuto antes de enviar outro comentário.";
        form.comentario.classList.add("erro");
        return false;
    }
    localStorage.setItem("ultimoComentario", agora);
    return true;
}

function escapeHtml(texto) {
    // Remove caracteres perigosos para CSV
    texto = texto.replace(caracteresProibidosCSV, ' ');

    const div = document.createElement('div');
    div.innerText = texto;
    return div.innerHTML;
}

// === Bloqueio TOTAL de quebras de linha ===
form.comentario.addEventListener('keydown', function (e) {
    // Bloqueia a tecla Enter completamente
    if (e.key === 'Enter') {
        e.preventDefault();
        return false;
    }
});

// Validação em tempo real
form.comentario.addEventListener('input', function (e) {
    // Remove qualquer tentativa de quebra de linha
    if (this.value.includes('\n') || this.value.includes('\r')) {
        this.value = this.value.replace(/[\n\r]/g, '');
    }

    // Atualiza contador de caracteres
    const restantes = 300 - this.value.length;
    contadorCaracteres.textContent = `${restantes} caracteres restantes`;
    contadorCaracteres.style.color = restantes < 0 ? 'red' : '#666';

    // Marca palavras ofensivas (visualização)
    if (contemPalavrasOfensivas(this.value)) {
        const preview = document.getElementById('previewOfensivas') ||
            document.createElement('div');
        preview.id = 'previewOfensivas';
        preview.style.color = '#ff6666';
        preview.style.fontSize = '12px';
        preview.innerHTML = `<strong>Aviso:</strong> Palavras ofensivas detectadas o comentario não será publicado: "${marcarPalavrasOfensivas(this.value)}"`;

        if (!document.getElementById('previewOfensivas')) {
            this.parentNode.appendChild(preview);
        }
    } else {
        const preview = document.getElementById('previewOfensivas');
        if (preview) preview.remove();
    }
});

// === Lógica de Envio de Comentários ===
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const comentario = form.comentario.value.trim();

    if (form.fakeEmail.value !== "") return;

    if (!validarCampos(nome, comentario)) return;
    if (!podeComentar()) return;

    const data = new FormData();
    data.append(ENTRY_NOME, nome);
    data.append(ENTRY_COMENTARIO, comentario);

    fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: data
    }).then(() => {
        form.reset();
        erroComentario.textContent = "";
        form.comentario.classList.remove("erro");
        carregarComentarios();
    }).catch(error => {
        console.error('Erro ao enviar comentário:', error);
        erroComentario.textContent = "Ocorreu um erro ao enviar seu comentário. Tente novamente.";
    });

    setTimeout(() => {
        carregarComentarios();
    }, 1000);
});

// === Lógica de Carregamento de Comentários ===
function carregarComentarios() {
    fetch(CSV_URL)
        .then(response => response.text())
        .then(data => {
            const linhas = data.split("\n").slice(1); // ignora cabeçalho
            const comentarios = [];

            for (const linha of linhas) {
                if (!linha.trim()) continue;

                // Extrai colunas respeitando vírgulas dentro de aspas
                const colunas = linha.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map(c => c.replace(/^"|"$/g, ""));

                if (!colunas || colunas.length < 3) continue;

                const timestamp = colunas[0];
                const nome = colunas[1];
                const comentario = colunas[2];

                if (!nome || !comentario) continue;

                comentarios.push({ nome, comentario, data: timestamp });
            }

            comentarios.reverse(); // do mais recente para o mais antigo

            const container = document.getElementById("listaComentarios");
            container.innerHTML = "";

            for (const c of comentarios) {
                const el = document.createElement("div");
                el.className = "comentario";

                // SVG do verificado (simulando o verificado do Instagram)
                const verificadoSvg = c.nome === "AbsoluteSUB" ? `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1997d3" style="height: 29px;width: 19px;"><path d="m352.46-85.39-71.38-120.3-135.54-29.7 13.23-139.53L66.93-480l91.84-105.08-13.23-139.53 135.54-29.7 71.38-120.3L480-820.46l127.54-54.15 71.38 120.3 135.54 29.7-13.23 139.53L893.07-480l-91.84 105.08 13.23 139.53-135.54 29.7-71.38 120.3L480-139.54 352.46-85.39ZM378-162l102-43.23L583.23-162 640-258l110-25.23L740-396l74-84-74-85.23L750-678l-110-24-58-96-102 43.23L376.77-798 320-702l-110 24 10 112.77L146-480l74 84-10 114 110 24 58 96Zm102-318Zm-42 128.15L650.15-564 608-607.38l-170 170-86-84.77L309.85-480 438-351.85Z"/></svg>
    ` : '';

                el.innerHTML = `
        <img class="profile" src="img/assets/profile.webp" alt="profile">
        <div style="width: 100%;">
            <div class="comentario-meta">
                <strong style="display: flex; flex-direction: row; align-items: center; gap: 3px; height: 21px;">${c.nome} ${verificadoSvg}</strong>
                <div style="font-size: 12px; color: #898989;">${c.data}</div>
            </div>
            <div class="com">${c.comentario}</div>
        </div>
    `;
                container.appendChild(el);
            }

            if (comentarios.length === 0) {
                container.innerHTML = "<p>Nenhum comentário ainda.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar comentários:", error);
            document.getElementById("listaComentarios").innerHTML = "<p>Erro ao carregar comentários.</p>";
        });
}