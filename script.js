document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.links a');
    const secoes = document.querySelectorAll('section[id]');
    const elementosRevelar = document.querySelectorAll('.reveal');
    const formulario = document.querySelector('.formulario');
    const nomeInput = document.getElementById('nome');
    const assuntoInput = document.getElementById('assunto');
    const mensagemInput = document.getElementById('mensagem');
    const anoAtual = document.getElementById('ano-atual');

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    links.forEach((link) => {
        link.addEventListener('click', () => {
            links.forEach((item) => item.classList.remove('ativo'));
            link.classList.add('ativo');
        });
    });

    const observerSecoes = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach((link) => {
                    const isAtivo = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('ativo', isAtivo);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    secoes.forEach((secao) => observerSecoes.observe(secao));

    if ('IntersectionObserver' in window) {
        const observerRevelar = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerRevelar.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elementosRevelar.forEach((elemento) => observerRevelar.observe(elemento));
    } else {
        elementosRevelar.forEach((elemento) => elemento.classList.add('visible'));
    }

    const foto = document.querySelector('.foto');
    if (foto) {
        foto.addEventListener('mousemove', (event) => {
            const rect = foto.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            foto.style.transform = `perspective(1000px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.03)`;
        });

        foto.addEventListener('mouseleave', () => {
            foto.style.transform = '';
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = nomeInput.value.trim();
            const assunto = assuntoInput.value.trim();
            const mensagem = mensagemInput.value.trim();

            if (!nome || !assunto || !mensagem) {
                alert('Preencha todos os campos antes de enviar a mensagem.');
                return;
            }

            const statusMensagem = document.createElement('p');
            statusMensagem.textContent = `Obrigado, ${nome}! Sua mensagem sobre "${assunto}" foi enviada com sucesso.`;
            statusMensagem.className = 'mensagem-status';

            const mensagemExistente = document.querySelector('.mensagem-status');
            if (mensagemExistente) {
                mensagemExistente.remove();
            }

            formulario.insertAdjacentElement('afterend', statusMensagem);
            formulario.reset();
        });
    }
});
