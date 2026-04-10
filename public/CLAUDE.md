# CLAUDE.md — Contexto do Projeto Take 1 Comunicação

## Visão Geral do Projeto

Site institucional da **Take 1 Comunicação**, agência de comunicação integrada fundada em 1997.

**Arquivos do projeto:**
- `index.html` — Home
- `quem-somos.html` — Quem Somos
- `clientes.html` — Clientes
- `contato.html` — Fale Conosco
- `style.css` — Estilos globais
- `script.js` — JavaScript global

## Identidade Visual

```
Cor primária:     #AA2845 (vermelho Take 1)
Cor escura:       #171717 (preto)
Fundo principal:  #FCFCFC (branco)
Fundo alternado:  #F2F2F2 (cinza claro)
Texto secundário: #6B6B6B (cinza)
Fonte:            Poppins (Google Fonts — 300, 400, 500, 600, 700)
```

## Arquitetura de Decisões de Design

### Por que CSS Variables?
Todas as cores, shadows e transições estão em `:root` para facilitar manutenção e futuras trocas de tema.

### Por que SVG inline para logos?
Logos e ícones SVG são inline (não `<img src=".svg">`) para permitir controle via CSS (`.navbar--scrolled .navbar__logo text { fill: #171717; }`).

### Por que background-image CSS para heroes?
Heroes são `background-image` CSS para suportar o efeito parallax via `background-attachment: fixed` e facilitar overlays com pseudo-elementos.

### Sistema de animação `data-animate`
Elementos com `data-animate="fade-up"` (ou `fade-left`, `fade-right`, `zoom-in`) começam invisíveis (`opacity: 0`) e são ativados via Intersection Observer no `script.js`. Para delays escalonados, use `style="transition-delay: 0.Xs"` inline.

## Padrões de Código

### Nomenclatura CSS (BEM)
```
.bloco {}
.bloco__elemento {}
.bloco--modificador {}

Exemplos:
.navbar {}
.navbar__logo {}
.navbar__menu {}
.navbar--scrolled {}
.service-card {}
.service-card__image {}
.service-card__icon {}
.service-card__title {}
```

### Estrutura JavaScript
Cada funcionalidade é encapsulada em uma função nomeada (`initNavbar()`, `initCounters()`, etc.) e chamada no `DOMContentLoaded`. Sempre fazer null-check antes de acessar elementos DOM.

### Classes de estado
- `.is-open` — menu mobile aberto
- `.animated` — elemento já foi animado (Intersection Observer)
- `.has-focus` — campo de formulário com foco
- `.has-value` — campo de formulário com valor
- `.navbar--scrolled` — navbar após 50px de scroll
- `.active` — link de navegação da página atual

## Como Adicionar Novas Páginas

1. Copie a estrutura de qualquer página existente (ex: `clientes.html`)
2. Altere o `<title>`, meta description e o link ativo na navbar
3. Altere `class="page-hero page-hero--NOME-DA-PAGINA"` no hero
4. Adicione no `style.css` o background da nova página:
```css
.page-hero--nome-da-pagina {
  background-image: url('https://picsum.photos/seed/take1NOME/1920/500');
}
```
5. O script.js detectará automaticamente o link ativo via `window.location.pathname`

## Como Adicionar Novas Seções com Animação

1. Crie o HTML da seção:
```html
<section class="section bg-light">
  <div class="container">
    <h2 class="section-title" data-animate="fade-up">Título</h2>
    <p data-animate="fade-up" style="transition-delay:0.2s">Texto</p>
    <div data-animate="zoom-in" style="transition-delay:0.4s">Conteúdo</div>
  </div>
</section>
```
2. O Intersection Observer no `script.js` aplicará automaticamente a animação quando a seção entrar na viewport.
3. Tipos disponíveis de `data-animate`: `fade-up`, `fade-left`, `fade-right`, `zoom-in`

## Como Adicionar Novas Imagens (Mapa de Imagens)

1. Defina um ID único para a imagem (padrão: `IMG-XX99`)
2. Para imagens `<img>`: Use seed única no Picsum (`https://picsum.photos/seed/take1DESCRICAO/LARGxALT`) com atributo `loading="lazy"` e `alt` descritivo
3. Para backgrounds CSS: adicione no `style.css` em vez de `<img>`
4. Adicione o comentário `<!-- IMG-XX99 -->` antes da imagem no HTML
5. Documente no README.md na tabela de imagens
6. NUNCA use `<img>` para SVGs de logo/ícone — use SVG inline

## Armadilhas a Evitar

1. **NÃO usar `<img>` para backgrounds de seção** — Use CSS `background-image` para heroes e seções com overlay
2. **NÃO usar `<img src=".svg">` para logos/ícones** — Use SVG inline para controle via CSS
3. **NÃO esquecer `loading="lazy"`** — Obrigatório em todas as `<img>` (exceto hero que é background CSS)
4. **NÃO ter mais de 1 `<h1>` por página** — O único H1 é no hero/banner principal
5. **NÃO usar setTimeout para animações** — Use Intersection Observer (`script.js`)
6. **NÃO alterar as seeds Picsum** — As seeds garantem imagens consistentes ao recarregar
7. **NÃO usar `var` no JavaScript** — Sempre `const` ou `let`
8. **NÃO usar `style.css` com media queries de feature sem fallback** — Sempre incluir `@media (prefers-reduced-motion: reduce)` para desabilitar animações

## Checklist de QA para Futuras Alterações

### HTML
- [ ] Um único `<h1>` por página
- [ ] `alt` descritivo em todas as `<img>`
- [ ] `loading="lazy"` em todas as `<img>`
- [ ] Comentários `<!-- IMG-XXX -->` antes de cada imagem
- [ ] Tags semânticas usadas corretamente
- [ ] `aria-label` em links/botões sem texto visível
- [ ] `<label>` associado a cada `<input>`

### CSS
- [ ] Cores usando variáveis CSS (ex: `var(--color-primary)`)
- [ ] Sem inline styles desnecessários
- [ ] Responsividade testada em 320px, 768px, 1200px
- [ ] `prefers-reduced-motion` implementado

### JavaScript
- [ ] Null-check antes de acessar DOM
- [ ] Sem `console.error` no código final
- [ ] `prefers-reduced-motion` respeitado
- [ ] Formulário com validação e feedback

### Imagens
- [ ] Seeds Picsum corretas conforme tabela do README
- [ ] SVGs inline (não `<img>`) para logos e ícones
- [ ] Backgrounds de seção via CSS, não `<img>`
