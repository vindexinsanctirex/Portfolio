document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Função para alternar tema
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    }

    // Função para atualizar o botão de tema
    function updateThemeButton(theme) {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        const themeText = themeToggle.querySelector('.theme-text');

        if (theme === 'dark') {
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Light Mode';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Dark Mode';
        }

        // Sempre atualiza estado responsivo (caso texto esteja oculto)
        applyResponsiveLayout();
    }

    // Ajusta botão para telas menores (mostra só ícone)
    function applyResponsiveLayout() {
        const themeText = themeToggle.querySelector('.theme-text');
        if (!themeText) return;

        const smallScreen = window.matchMedia('(max-width: 520px)').matches;
        if (smallScreen) {
            themeText.style.display = 'none';
            // manter acessibilidade
            themeToggle.setAttribute('aria-label', themeText.textContent || 'Alternar tema');
        } else {
            themeText.style.display = '';
            themeToggle.removeAttribute('aria-label');
        }
    }

    // Verificar tema salvo ou preferência do sistema
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        updateThemeButton(document.documentElement.getAttribute('data-theme'));
    }

    // Eventos
    themeToggle.addEventListener('click', toggleTheme);

    // Atualiza quando a largura muda (reactivo)
    const mq = window.matchMedia('(max-width: 520px)');
    mq.addEventListener('change', applyResponsiveLayout);
    window.addEventListener('resize', applyResponsiveLayout);

    // Inicializar
    initTheme();
});