document.addEventListener("DOMContentLoaded", () => {
  atualizarAnoRodape();
  configurarMenuHamburguer();
  destacarPaginaAtiva();
  configurarFiltroProdutos();
  configurarFormularioContato();
});

/**
 * Atualiza o ano do rodapé automaticamente com base na data do sistema.
 */
function atualizarAnoRodape() {
  const elementoAno = document.getElementById("ano-atual");
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
}

/**
 * Abre e fecha o menu de navegação em telas pequenas (mobile).
 */
function configurarMenuHamburguer() {
  const botaoToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!botaoToggle || !navLinks) {
    return;
  }

  botaoToggle.addEventListener("click", () => {
    const estaAberto = navLinks.classList.toggle("aberto");
    botaoToggle.setAttribute("aria-expanded", String(estaAberto));
  });

  // Fecha o menu ao clicar em um link no mobile
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("aberto");
      botaoToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Garante que o link correspondente à página atual receba a classe 'ativo'.
 */
function destacarPaginaAtiva() {
  const links = document.querySelectorAll(".nav-link");
  if (!links.length) {
    return;
  }

  let paginaAtual = window.location.pathname.split("/").pop();
  if (!paginaAtual) {
    paginaAtual = "index.html";
  }

  links.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("ativo", href === paginaAtual);
  });
}

/**
 * Filtra os cartões de produtos na página produtos.html por categoria.
 */
function configurarFiltroProdutos() {
  const botoesFiltro = document.querySelectorAll(".filtro-btn");
  const cardsProduto = document.querySelectorAll(".produto-card");

  if (!botoesFiltro.length || !cardsProduto.length) {
    return;
  }

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoriaSelecionada = botao.dataset.categoria;

      botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
      botao.classList.add("ativo");

      cardsProduto.forEach((card) => {
        const categoriaCard = card.dataset.categoria;
        const deveExibir =
          categoriaSelecionada === "Todos" || categoriaCard === categoriaSelecionada;

        card.style.display = deveExibir ? "flex" : "none";
      });
    });
  });
}

/**
 * Valida os campos Nome, E-mail e Mensagem no formulário de contato.
 */
function configurarFormularioContato() {
  const form = document.getElementById("form-contato");
  if (!form) {
    return;
  }

  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputMensagem = document.getElementById("mensagem");

  const erroNome = document.getElementById("erro-nome");
  const erroEmail = document.getElementById("erro-email");
  const erroMensagem = document.getElementById("erro-mensagem");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formularioValido = true;
    mensagemSucesso.textContent = "";
    mensagemSucesso.classList.remove("visivel");

    // Limpa erros anteriores
    limparErroCampo(inputNome, erroNome);
    limparErroCampo(inputEmail, erroEmail);
    limparErroCampo(inputMensagem, erroMensagem);

    const nomeValor = inputNome.value.trim();
    const emailValor = inputEmail.value.trim();
    const mensagemValor = inputMensagem.value.trim();

    if (nomeValor === "") {
      mostrarErroCampo(inputNome, erroNome, "Por favor, informe seu nome.");
      formularioValido = false;
    }

    if (emailValor === "") {
      mostrarErroCampo(inputEmail, erroEmail, "Por favor, informe seu e-mail.");
      formularioValido = false;
    } else if (!regexEmail.test(emailValor)) {
      mostrarErroCampo(inputEmail, erroEmail, "Digite um endereço de e-mail válido.");
      formularioValido = false;
    }

    if (mensagemValor === "") {
      mostrarErroCampo(inputMensagem, erroMensagem, "Por favor, escreva sua mensagem.");
      formularioValido = false;
    }

    if (formularioValido) {
      form.reset();
      mensagemSucesso.textContent =
        "Mensagem enviada com sucesso! A equipe da Café Aroma Serrano retornará em breve.";
      mensagemSucesso.classList.add("visivel");
    }
  });
}

function mostrarErroCampo(input, elementoErro, textoErro) {
  input.classList.add("input-erro");
  elementoErro.textContent = textoErro;
}

function limparErroCampo(input, elementoErro) {
  input.classList.remove("input-erro");
  elementoErro.textContent = "";
}