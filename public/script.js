'use strict';

/**
 * script.js - Take 1 Comunicação
 * Sistema completo de interatividade do website
 * Sem dependências externas, vanilla JavaScript puro
 */

// ================================================
// CONFIGURAÇÕES GLOBAIS
// ================================================

const CONFIG = {
  navbarScrollThreshold: 50,
  animationThreshold: 0.15,
  counterDuration: 2000,
  formDebounceDelay: 300,
  parallaxFactor: 0.4,
  mobileBreakpoint: 768,
  navbarOffset: 80,
};

let scrollThrottleId = null;
let parallaxRequestId = null;

// ================================================
// LOAD COMPONENTS (Header + Footer dinâmicos)
// ================================================
async function loadComponents() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch('components/header.html'),
      fetch('components/footer.html')
    ]);

    if (headerSlot && headerRes.ok) {
      headerSlot.innerHTML = await headerRes.text();
    }
    if (footerSlot && footerRes.ok) {
      footerSlot.innerHTML = await footerRes.text();
      // Atualizar ano do copyright
      const yearEl = document.getElementById('footerYear');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  } catch (err) {
    console.warn('Take 1: Componentes não carregados via fetch. Verifique se está rodando em servidor web.', err);
  }

  // Inicializar tudo após componentes carregados
  initNavbar();
  initHamburger();
  setActiveNavLink();
  initAnimations();
  initParallax();
  initCounters();
  initSmoothScroll();
  initForm();
  initFloatingLabels();

  // Inicializar Lucide Icons após DOM estar pronto
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ================================================
// NAVBAR SCROLL LISTENER
// ================================================

/**
 * Inicializa o listener de scroll na navbar
 * Adiciona classe 'navbar--scrolled' ao ultrapassar threshold
 * Implementa throttle para otimização de performance
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > CONFIG.navbarScrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  };

  const throttledScroll = () => {
    if (scrollThrottleId) {
      cancelAnimationFrame(scrollThrottleId);
    }
    scrollThrottleId = requestAnimationFrame(handleScroll);
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
  handleScroll();
}

// ================================================
// HAMBURGER MENU (MOBILE)
// ================================================

/**
 * Inicializa o menu hambúrguer para dispositivos móveis
 * Gerencia abertura, fechamento e toggle do menu
 */
function initHamburger() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const menu = document.querySelector('.navbar__menu');
  const body = document.body;

  if (!hamburger || !menu) return;

  /**
   * Toggle do menu com gerenciamento de scroll do body
   */
  const toggleMenu = () => {
    hamburger.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    body.classList.toggle('menu-open');
  };

  /**
   * Fecha o menu
   */
  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    menu.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  // Click no hamburger
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fechar ao clicar em um link do menu
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Fechar ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

// ================================================
// INTERSECTION OBSERVER (ANIMAÇÕES DE ENTRADA)
// ================================================

/**
 * Inicializa animações de entrada com Intersection Observer
 * Respeita preferência de movimento reduzido do usuário
 */
function initAnimations() {
  // Verificar se o usuário prefere movimento reduzido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const elementsToAnimate = document.querySelectorAll('[data-animate]');
  if (elementsToAnimate.length === 0) return;

  const observerOptions = {
    threshold: CONFIG.animationThreshold,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

// ================================================
// PARALLAX NO HERO
// ================================================

/**
 * Inicializa efeito parallax no hero
 * Apenas em desktop, respeita preferência de movimento reduzido
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Verificar preferência de movimento reduzido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Desabilitar em mobile
  if (window.innerWidth < CONFIG.mobileBreakpoint) return;

  /**
   * Aplica o efeito parallax usando requestAnimationFrame
   */
  const updateParallax = () => {
    const scrollY = window.scrollY;
    const parallaxOffset = scrollY * CONFIG.parallaxFactor;
    hero.style.backgroundPosition = `center ${-parallaxOffset}px`;
  };

  const handleScroll = () => {
    if (parallaxRequestId) {
      cancelAnimationFrame(parallaxRequestId);
    }
    parallaxRequestId = requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateParallax();
}

// ================================================
// CONTADOR ANIMADO DE NÚMEROS
// ================================================

/**
 * Easing function para animação suave (easeOutQuart)
 * @param {number} progress - Progresso de 0 a 1
 * @returns {number} Valor easeOutQuart
 */
function easeOutQuart(progress) {
  return 1 - Math.pow(1 - progress, 4);
}

/**
 * Inicializa contadores animados
 * Anima números quando ficam visíveis
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';

        const finalValue = parseInt(entry.target.dataset.counter, 10);
        const suffix = entry.target.dataset.suffix || '';
        const startTime = Date.now();

        /**
         * Loop de animação do contador
         */
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / CONFIG.counterDuration, 1);

          if (prefersReducedMotion) {
            entry.target.textContent = finalValue + suffix;
          } else {
            const easeProgress = easeOutQuart(progress);
            const currentValue = Math.floor(finalValue * easeProgress);
            entry.target.textContent = currentValue + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ================================================
// SMOOTH SCROLL PARA ÂNCORAS
// ================================================

/**
 * Inicializa smooth scroll para links com âncoras
 * Ajusta offset para compensar a navbar fixa
 */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // Fechar menu mobile se aberto
    const menu = document.querySelector('.navbar__menu');
    if (menu && menu.classList.contains('is-open')) {
      const hamburger = document.querySelector('.navbar__hamburger');
      hamburger.classList.remove('is-open');
      menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }

    // Calcular posição com offset
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - CONFIG.navbarOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  });
}

// ================================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ================================================

/**
 * Valida um endereço de e-mail
 * @param {string} email - E-mail a validar
 * @returns {boolean} True se válido
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida um número de telefone
 * @param {string} phone - Telefone a validar
 * @returns {boolean} True se válido ou vazio
 */
function isValidPhone(phone) {
  if (!phone) return true;
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Exibe erro em um campo
 * @param {HTMLElement} input - Campo do formulário
 * @param {string} message - Mensagem de erro
 */
function showFieldError(input, message) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  formGroup.classList.add('field-error');

  let errorElement = formGroup.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

/**
 * Remove erro de um campo
 * @param {HTMLElement} input - Campo do formulário
 */
function clearFieldError(input) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  formGroup.classList.remove('field-error');
  const errorElement = formGroup.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Inicializa validação e comportamento do formulário de contato
 */
function initForm() {
  const form = document.querySelector('#contactForm') || document.querySelector('form[name="contact"]') || document.querySelector('form');
  if (!form) return;

  const nameInput = form.querySelector('input[name="nome"]') || form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const phoneInput = form.querySelector('input[name="telefone"]') || form.querySelector('input[name="phone"]');
  const messageInput = form.querySelector('textarea[name="mensagem"]') || form.querySelector('textarea[name="message"]');
  const submitButton = form.querySelector('button[type="submit"]');

  if (!nameInput || !emailInput || !messageInput || !submitButton) return;

  let isSubmitting = false;

  /**
   * Valida o formulário inteiro
   * @returns {boolean} True se válido
   */
  const validateForm = () => {
    let isValid = true;

    // Validar nome
    if (nameInput.value.trim().length < 3) {
      showFieldError(nameInput, 'Nome deve ter pelo menos 3 caracteres');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validar e-mail
    if (!isValidEmail(emailInput.value.trim())) {
      showFieldError(emailInput, 'E-mail inválido');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validar telefone (opcional)
    if (phoneInput && phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
      showFieldError(phoneInput, 'Telefone inválido');
      isValid = false;
    } else if (phoneInput) {
      clearFieldError(phoneInput);
    }

    // Validar mensagem
    if (messageInput.value.trim().length < 10) {
      showFieldError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres');
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    return isValid;
  };

  // Validação em tempo real ao desfocar
  const inputsToValidate = [nameInput, emailInput, messageInput].filter(Boolean);
  inputsToValidate.forEach((input) => {
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        validateForm();
      }
    });
  });

  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim()) {
        validateForm();
      }
    });
  }

  // Submit do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';

    // Simular envio
    setTimeout(() => {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
      submitButton.textContent = originalText;

      // Mostrar mensagem de sucesso
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      form.insertBefore(successMessage, form.firstChild);

      // Resetar formulário
      form.reset();

      // Limpar campos floating labels
      form.querySelectorAll('.form-group').forEach((group) => {
        group.classList.remove('has-value', 'has-focus');
      });

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }, 1500);
  });
}

// ================================================
// FLOATING LABELS
// ================================================

/**
 * Inicializa floating labels dos campos do formulário
 * Anima o label ao focar ou ao ter valor
 */
function initFloatingLabels() {
  const formGroups = document.querySelectorAll('.form-group');
  if (formGroups.length === 0) return;

  formGroups.forEach((group) => {
    const input = group.querySelector('input, textarea');
    if (!input) return;

    /**
     * Verifica se o input tem valor
     */
    const updateLabel = () => {
      if (input.value.trim()) {
        group.classList.add('has-value');
      } else {
        group.classList.remove('has-value');
      }
    };

    // Focus
    input.addEventListener('focus', () => {
      group.classList.add('has-focus');
    });

    // Blur
    input.addEventListener('blur', () => {
      group.classList.remove('has-focus');
      updateLabel();
    });

    // Input
    input.addEventListener('input', updateLabel);

    // Verificar ao carregar (para prefilled inputs)
    updateLabel();
  });
}

// ================================================
// ACTIVE STATE NA NAVBAR
// ================================================

/**
 * Define o link ativo na navbar baseado na URL atual
 * Compatível com fetch de componentes dinâmicos
 */
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.navbar__link, nav a');
  if (navLinks.length === 0) return;

  const currentPath = window.location.pathname;
  const currentFilename = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    const dataPage = link.getAttribute('data-page');

    if (!href) return;

    // Extrair o nome do arquivo do href
    const linkFilename = href.split('/').pop() || 'index.html';

    // Comparar nomes de arquivo
    if (linkFilename === currentFilename) {
      link.classList.add('active');
      return;
    }

    // Comparar com data-page para fallback
    if (dataPage && currentFilename === (dataPage + '.html')) {
      link.classList.add('active');
      return;
    }

    // Para homepage: se currentFilename é vazio ou index.html
    if ((currentFilename === 'index.html' || currentFilename === '') && dataPage === 'index') {
      link.classList.add('active');
    }
  });
}

// ================================================
// INICIALIZAÇÃO DO DOCUMENTO
// ================================================

/**
 * Executa loadComponents quando o DOM está pronto
 * Que por sua vez chama todas as demais inicializações
 */
document.addEventListener('DOMContentLoaded', loadComponents);

// ================================================
// EVENT LISTENERS ADICIONAIS
// ================================================

/**
 * Reinicializar parallax ao redimensionar janela
 */
window.addEventListener('resize', () => {
  if (window.innerWidth >= CONFIG.mobileBreakpoint) {
    initParallax();
  }
});
