// js/global.js

// -------------------------------------------------------------------------
// DADOS DE REFERÊNCIA (Data do Projeto e Data do Encontro)
// -------------------------------------------------------------------------
const DATA_INICIO_PROJETO = new Date(2025, 9, 17, 22, 0, 0); 
const DATA_PRIMEIRO_ENCONTRO = new Date(2021, 7, 14, 9, 10, 0); 

// -------------------------------------------------------------------------
// FUNÇÃO DE UTILIDADE PARA FORMATAR O TEMPO
// -------------------------------------------------------------------------
function formatarTempo(diferencaMs) {
    const segundos = Math.floor(diferencaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    const anos = Math.floor(dias / 365.25);
    const meses = Math.floor(dias / 30.44);

    return `${anos} anos, ` +
           `${meses % 12} meses, ` +
           `${dias % 30} dias, ` +
           `${horas % 24}h, ` + 
           `${minutos % 60}m, ` + 
           `${segundos % 60}s`;
}

// -------------------------------------------------------------------------
// 1. LÓGICA DO DARK MODE (PERSISTÊNCIA E TOGGLE)
// -------------------------------------------------------------------------

// Função para ALTERNAR o modo escuro (Chamada pelo clique no botão)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode-enabled', isDarkMode);
    
    // Altera o ícone visível (Lua 🌙 ou Sol ☀️)
    const toggleIcon = document.getElementById('dark-mode-toggle');
    if (toggleIcon) {
        toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

// Inicializa o Dark Mode na abertura da página (Corre em todas as páginas)
(function initializeDarkMode() {
    if (localStorage.getItem('dark-mode-enabled') === 'true') {
        document.body.classList.add('dark-mode');
    }
})();


// -------------------------------------------------------------------------
// 2. LÓGICA DOS CONTADORES
// -------------------------------------------------------------------------

function atualizarContadores() {
    const agora = new Date();
    
    // Contadores de Tempo
    const elementoTempoProjeto = document.getElementById('tempo-decorrido');
    const elementoTempoEncontro = document.getElementById('tempo-vida-decorrido');
    const toggleIcon = document.getElementById('dark-mode-toggle');

    if (elementoTempoProjeto) {
        const diferencaProjetoMs = agora.getTime() - DATA_INICIO_PROJETO.getTime();
        elementoTempoProjeto.textContent = formatarTempo(diferencaProjetoMs);
    }
    
    if (elementoTempoEncontro) {
        const diferencaEncontroMs = agora.getTime() - DATA_PRIMEIRO_ENCONTRO.getTime();
        elementoTempoEncontro.textContent = formatarTempo(diferencaEncontroMs);
    }

    // Inicializa o ícone do Dark Mode corretamente no carregamento
    if (toggleIcon) {
         const isDarkMode = document.body.classList.contains('dark-mode');
         toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
}

// Inicia a atualização dos contadores a cada segundo
atualizarContadores(); // Executa imediatamente para evitar o "A calcular..."
setInterval(atualizarContadores, 1000);