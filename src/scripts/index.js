/* Variáveis */

let formulario = document.getElementById("formulario");
let campos = document.querySelectorAll(".campo");
let arrayCampos = [...campos]
let mensagemAtiva = false;


/* Códigos reutilizáveis */

function removerEstiloErro(campo) {
    campo.classList.remove("campo-erro");
    /* A variável com nextElementSibling deve ser o aviso de erro após o campo do
    formulário, neste caso */
    const aviso = campo.nextElementSibling;
    if(aviso && aviso.classList.contains("aviso-erro")) {
        aviso.classList.remove("mostrar-aviso-erro");
    }
}

function adicionarEstiloErro(campo) {
    campo.classList.add("campo-erro");
    const aviso = campo.nextElementSibling;
    if (aviso && aviso.classList.contains("aviso-erro")) {
        aviso.classList.add("mostrar-aviso-erro");
    }
}

function mensagemPopup(mensagem, duracao) {
    if (mensagemAtiva) return;
    mensagemAtiva = true;
    const elementoMensagem = document.createElement("h3");
    elementoMensagem.textContent = mensagem;
    elementoMensagem.classList.add("mensagem");
    document.querySelector("main").prepend(elementoMensagem);
    elementoMensagem.offsetHeight;
    elementoMensagem.style.opacity = 1;
    setTimeout(() => {
        elementoMensagem.style.opacity = 0;
        elementoMensagem.addEventListener('transitionend', function handler() {
            elementoMensagem.remove();
            mensagemAtiva = false;
            elementoMensagem.removeEventListener('transitionend', handler);
        })
    }, duracao);
}


/* Scripts principais */

arrayCampos.forEach(campo => {
    campo.addEventListener("input", () => removerEstiloErro(campo));
});

formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        const erros = arrayCampos.filter(campo => campo.value.trim() === "");
        if(erros.length > 0) {
            erros.forEach(campo => adicionarEstiloErro(campo));
            mensagemPopup("Há campos obrigatórios não preenchidos!", 1000);
        } else {
            mensagemPopup("Formulário enviado com sucesso!", 1000);
            arrayCampos.forEach(campo => campo.value = "");
        }
    }
)

