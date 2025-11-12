
// Função para alternar idiomas
function switchLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[id="pt"]').forEach(el => {
        el.style.display = lang === 'pt-br' ? 'block' : 'none';
    });
    document.querySelectorAll('[id="en"]').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    document.getElementById('btn-pt').classList.toggle('active', lang === 'pt-br');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.title = lang === 'pt-br' ? 'Conquistas' : 'Achievements';
}

// Função para alternar entre seções
function toggleSection(section) {
    // Atualizar botões
    document.querySelectorAll('.section-toggle button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });

    // Atualizar seções de conteúdo
    document.querySelectorAll('.content-section').forEach(el => {
        const isActive = el.id === `${section}-section`;
        el.style.display = isActive ? 'block' : 'none';
        el.classList.toggle('active', isActive);
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar idioma
    switchLang('pt-br');

    // Configurar modal para certificados e workshops
    const modal = document.getElementById('modal');
    const modalImg = modal.querySelector('img');
    
    // Adicionar eventos de clique nas imagens
    document.querySelectorAll('.certificate-card img, .workshop-card img').forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
        });
    });

    // Fechar modal ao clicar
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // Configurar botão voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    // Esconder botão inicialmente
    backToTop.style.display = 'none';

    // Configurar eventos de clique nos botões de seção
    document.querySelectorAll('.section-toggle button').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleSection(btn.dataset.section);
        });
    });

    // Inicializar primeira seção
    toggleSection('certificates');
});