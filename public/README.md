# Take 1 Comunicação — Site Institucional

## Descrição do Projeto
Site institucional completo da Take 1 Comunicação, agência fundada em 1997 com expertise em comunicação integrada: publicidade, comunicação empresarial, marketing digital (Take 1 LAB) e editoração e design gráfico.

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 puro (sem frameworks CSS)
- JavaScript ES6+ vanilla (sem jQuery/frameworks)
- Google Fonts: Poppins (300, 400, 500, 600, 700)
- Picsum Photos (mocks de imagens durante desenvolvimento)

## Estrutura de Arquivos
```
take1-site/
├── index.html           → Home
├── quem-somos.html      → Quem Somos
├── clientes.html        → Clientes
├── contato.html         → Fale Conosco
├── style.css            → Estilos globais compartilhados
├── script.js            → JavaScript global compartilhado
├── README.md            → Este arquivo
├── CLAUDE.md            → Contexto para IA
└── assets/
    └── images/          → Pasta para imagens reais (substituindo mocks Picsum)
        ├── hero/
        ├── sobre/
        ├── servicos/
        ├── numeros/
        ├── clientes/
        └── contato/
```

## Como Rodar Localmente

**⚠️ Nota sobre componentes header/footer dinâmicos:** O site usa `fetch()` para carregar header e footer dinamicamente. Por segurança dos navegadores, isso **não funciona** ao abrir o `index.html` diretamente pelo explorador de arquivos (`file://`). Para funcionar corretamente, escolha uma das opções:

- **Live Server do VS Code** (recomendado): Instale a extensão "Live Server" e clique em "Go Live"
- **Python HTTP Server**: Na pasta do projeto, execute `python -m http.server 8000` e acesse `http://localhost:8000`
- **Qualquer servidor web local**: XAMPP, WAMP, nginx, etc.

**Passo a passo:**
1. Clone ou baixe o projeto
2. Escolha um dos métodos acima para servir os arquivos via HTTP
3. Acesse o site via `http://localhost:8000` (ou a porta do seu servidor)
4. Para melhor experiência de desenvolvimento, use a extensão "Live Server" no VS Code

## Páginas e Seções

### Home (index.html)
- **Hero**: Banner full-screen com CTA principal
- **Sobre a Take 1**: Apresentação institucional com imagem
- **Serviços**: Grid 2×2 com 4 áreas de atuação
- **Números**: Contadores animados (27 anos, 200+ projetos, 50+ clientes, 4 áreas)
- **Clientes**: Grid com 12 logos de empresas parceiras
- **CTA Final**: Chamada para ação "Vamos trabalhar juntos?"

### Quem Somos (quem-somos.html)
- **Hero interno**: Banner com breadcrumb
- **Nossa História**: Origem em 1997, conexão Aracruz/Suzano
- **Nosso Diferencial**: Comunicação Integrada, Estratégia, Extensão da empresa
- **Take 1 LAB**: Braço digital da agência
- **Serviços Detalhados**: 4 cards com listas completas de cada área

### Clientes (clientes.html)
- **Hero interno**: Banner com breadcrumb
- **Intro Impactante**: Texto de abertura
- **Grid de Logos**: 12 logos SVG inline de clientes fictícios
- **Cases de Sucesso**: Imagem de portfólio com métricas
- **Depoimentos**: 3 cards com foto, nome, cargo e empresa

### Fale Conosco (contato.html)
- **Hero interno**: Banner com breadcrumb
- **Formulário de Contato**: 6 campos + validação + feedback de sucesso
- **Informações de Contato**: Endereço, telefone, WhatsApp, e-mail, redes sociais
- **Mapa Estilizado**: Imagem com pin SVG em #AA2845

## Guia de Identidade Visual

### Cores
| Nome | Hex | Uso |
|------|-----|-----|
| Vermelho Take 1 | `#AA2845` | Cor primária, CTAs, destaques, bordas |
| Preto | `#171717` | Fundo escuro, textos principais |
| Branco | `#FCFCFC` | Fundo principal, textos sobre escuro |
| Cinza Alt | `#F2F2F2` | Fundo alternado de seções |
| Cinza Texto | `#6B6B6B` | Textos secundários, legendas |

### Tipografia
- **Família**: Poppins (Google Fonts)
- **Pesos usados**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Hierarquia**: H1 (68px/mobile 32px) → H2 (40px) → H3 (24px) → Body (16px)

## Tabela Completa de Imagens

| ID | Página | Local no site | Dimensões | URL Mock (Picsum) | Caminho para imagem real | Prompt IA |
|----|--------|---------------|-----------|-------------------|--------------------------|-----------|
| IMG-H01 | Home | Hero background (CSS) | 1920×1080 | `https://picsum.photos/seed/take1hero/1920/1080` | `assets/images/hero/hero-home.jpg` | "Modern advertising agency office, diverse professional team in a strategic meeting around a large table with printed materials, brand presentations on screens, moodboards on the wall, warm natural lighting, dark moody tones, wide angle, photorealistic, 4K, editorial style photography" |
| IMG-H02 | Home | Seção "Sobre" — foto lateral direita | 800×600 | `https://picsum.photos/seed/take1sobre/800/600` | `assets/images/sobre/sobre-take1.jpg` | "Two or three business professionals reviewing printed graphic design layouts and brand materials on a conference table, corporate office with glass wall, engaged collaborative posture, professional editorial photography, warm office lighting, photorealistic" |
| IMG-H03 | Home | Card Publicidade — topo | 600×380 | `https://picsum.photos/seed/take1pub/600/380` | `assets/images/servicos/card-publicidade.jpg` | "Designer's desk with printed advertising campaign materials, magazine ads, banners, POS materials spread out, hands touching the prints, top-down view, warm neutral background with red accent colors, photorealistic editorial" |
| IMG-H04 | Home | Card Comunicação Empresarial — topo | 600×380 | `https://picsum.photos/seed/take1corp/600/380` | `assets/images/servicos/card-comunicacao.jpg` | "Corporate executive presenting brand identity guidelines to a team in a formal boardroom, brand manual on screen, professional business attire, confident body language, corporate photography style, photorealistic" |
| IMG-H05 | Home | Card Marketing Digital — topo | 600×380 | `https://picsum.photos/seed/take1digital/600/380` | `assets/images/servicos/card-marketing.jpg` | "Young digital marketing professional analyzing performance dashboards on multiple screens, social media metrics, ad campaign graphs, modern tech office, blue and red screen light, photorealistic editorial photography" |
| IMG-H06 | Home | Card Editoração — topo | 600×380 | `https://picsum.photos/seed/take1design/600/380` | `assets/images/servicos/card-design.jpg` | "Designer's flat lay with open brand catalogs, corporate magazines, logo sketches, color swatches, tablet with Illustrator, wooden desk, top-down overhead shot, warm natural light, photorealistic editorial style" |
| IMG-H07 | Home | Seção Números — background CSS | 1440×600 | `https://picsum.photos/seed/take1numeros/1440/600` | `assets/images/numeros/numeros-bg.jpg` | "Aerial view of a large Brazilian city at sunset with illuminated corporate skyscrapers, warm golden hour light, urban landscape, wide shot, photorealistic, high definition aerial photography" |
| IMG-H08 | Home | CTA Final — background CSS | 1440×400 | `https://picsum.photos/seed/take1cta/1440/400` | `assets/images/hero/cta-final.jpg` | "Close-up handshake between two business professionals in foreground, blurred modern corporate office in background, confidence and partnership, dark elegant tones, photorealistic editorial photography" |
| IMG-QS01 | Quem Somos | Hero interno — background CSS | 1920×500 | `https://picsum.photos/seed/take1qs-hero/1920/500` | `assets/images/hero/hero-quem-somos.jpg` | "Professional team photo of a creative agency, diverse age groups mixing experienced and young professionals, natural relaxed group posture, creative office environment, corporate editorial photography, photorealistic" |
| IMG-QS02 | Quem Somos | Nossa História — foto lateral | 700×500 | `https://picsum.photos/seed/take1historia/700/500` | `assets/images/sobre/historia.jpg` | "Two senior business partners in a classic sophisticated office reviewing corporate communication materials, confident experienced posture, editorial portrait style, professional business attire, warm office light, photorealistic" |
| IMG-QS03 | Quem Somos | Take 1 LAB — foto lateral | 750×500 | `https://picsum.photos/seed/take1lab/750/500` | `assets/images/sobre/take1lab.jpg` | "Young dynamic digital marketing team working in a modern open-space tech office with multiple monitors, collaborative work area, bright energetic environment, startup atmosphere with professional tone, photorealistic" |
| IMG-QS04 | Quem Somos | Card Publicidade — topo | 560×340 | `https://picsum.photos/seed/take1qs-pub/560/340` | `assets/images/servicos/qs-publicidade.jpg` | "Top-down flat lay of advertising campaign materials including outdoor banner mockup, printed ads, event materials on a white desk, creative rich color palette, photorealistic editorial" |
| IMG-QS05 | Quem Somos | Card Comunicação Empresarial — topo | 560×340 | `https://picsum.photos/seed/take1qs-corp/560/340` | `assets/images/servicos/qs-comunicacao.jpg` | "Open brand identity manual showing color palette, typography guidelines and logo applications on a clean white desk, brand design editorial photography, photorealistic" |
| IMG-QS06 | Quem Somos | Card Marketing Digital — topo | 560×340 | `https://picsum.photos/seed/take1qs-dig/560/340` | `assets/images/servicos/qs-marketing.jpg` | "Smartphone and tablet showing social media content feed for brands beside a laptop with analytics dashboard, clean modern desk, digital marketing concept, photorealistic editorial" |
| IMG-QS07 | Quem Somos | Card Editoração — topo | 560×340 | `https://picsum.photos/seed/take1qs-edi/560/340` | `assets/images/servicos/qs-design.jpg` | "Corporate magazines, catalogs and folders stacked and open showing professional editorial layout design, high quality printing textures, warm flat lay photography, photorealistic" |
| IMG-C01 | Clientes | Hero interno — background CSS | 1920×500 | `https://picsum.photos/seed/take1clientes/1920/500` | `assets/images/hero/hero-clientes.jpg` | "Business executives from different companies in a meeting room reviewing campaign results, marketing materials visible, confident partnership mood, corporate editorial photography, professional lighting, photorealistic" |
| IMG-C02 | Clientes | Depoimento 1 — avatar circular | 150×150 | `https://picsum.photos/seed/take1dep1/150/150` | `assets/images/clientes/dep-anapaula.jpg` | "Professional headshot portrait of a 45-year-old businesswoman, executive attire, confident smile, neutral blurred office background, corporate portrait photography, photorealistic" |
| IMG-C03 | Clientes | Depoimento 2 — avatar circular | 150×150 | `https://picsum.photos/seed/take1dep2/150/150` | `assets/images/clientes/dep-carlos.jpg` | "Professional headshot of a 40-year-old man in business attire with academic professional look, friendly approachable smile, neutral background, corporate portrait photography, photorealistic" |
| IMG-C04 | Clientes | Depoimento 3 — avatar circular | 150×150 | `https://picsum.photos/seed/take1dep3/150/150` | `assets/images/clientes/dep-mariana.jpg` | "Professional headshot of a 35-year-old businesswoman, smart casual corporate attire, dynamic confident smile, clean background, modern corporate portrait photography, photorealistic" |
| IMG-C05 | Clientes | Cases/Portfólio — foto lateral | 1100×600 | `https://picsum.photos/seed/take1cases/1100/600` | `assets/images/clientes/cases.jpg` | "Brand identity mockup composition with computer screen showing website, tablet with digital campaign, printed folder and magazine with cohesive visual identity, dark elegant background, professional branding photography, photorealistic" |
| IMG-CT01 | Contato | Hero interno — background CSS | 1920×500 | `https://picsum.photos/seed/take1contato/1920/500` | `assets/images/hero/hero-contato.jpg` | "Business professional talking on phone in a modern corporate office, positive open body language, team working in background, welcoming and approachable atmosphere, corporate editorial photography, photorealistic" |
| IMG-CT02 | Contato | Mapa estilizado — img tag | 600×400 | `https://picsum.photos/seed/take1mapa/600/400` | `assets/images/contato/mapa.jpg` | "Aerial top-down view of urban corporate district with streets and city blocks, slightly desaturated map-like treatment, clean geometric urban photography, photorealistic, high angle drone shot" |
| IMG-G01 | Todas | Logo navbar e footer | SVG inline | N/A (SVG tipográfico) | N/A | N/A — Logo tipográfica SVG |
| IMG-G02 | Todas | Ícone Publicidade | SVG inline 48×48 | N/A | N/A | N/A — Ícone SVG megafone |
| IMG-G03 | Todas | Ícone Comunicação Empresarial | SVG inline 48×48 | N/A | N/A | N/A — Ícone SVG balões |
| IMG-G04 | Todas | Ícone Marketing Digital | SVG inline 48×48 | N/A | N/A | N/A — Ícone SVG monitor/gráfico |
| IMG-G05 | Todas | Ícone Editoração e Design | SVG inline 48×48 | N/A | N/A | N/A — Ícone SVG lápis/folha |
| IMG-G06 | Home+Clientes | Logo cliente Valmeron | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G07 | Home+Clientes | Logo cliente Clinicare | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G08 | Home+Clientes | Logo cliente Instituto Avanço | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G09 | Home+Clientes | Logo cliente Maxstore | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G10 | Home+Clientes | Logo cliente NexusTech | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G11 | Home+Clientes | Logo cliente Edificar | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G12 | Home+Clientes | Logo cliente Terra Nova | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G13 | Home+Clientes | Logo cliente PowerGen | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G14 | Home+Clientes | Logo cliente SpeedLog | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G15 | Home+Clientes | Logo cliente Nutriverde | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G16 | Home+Clientes | Logo cliente Confiança Seg | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |
| IMG-G17 | Home+Clientes | Logo cliente Estilo Corp | SVG inline | N/A | N/A | N/A — Logo tipográfica SVG |

## Como Substituir Mocks por Imagens Reais

1. Crie a pasta `assets/images/` na raiz do projeto
2. Para imagens de fundo CSS (heroes, CTA, seção números), edite o `style.css`:
   - Encontre a regra com `background-image: url('https://picsum.photos/seed/...')`
   - Substitua pela URL local: `background-image: url('assets/images/hero/hero-home.jpg')`
3. Para imagens `<img>`, edite o HTML correspondente:
   - Substitua `src="https://picsum.photos/seed/..."` por `src="assets/images/.../nome.jpg"`
4. SVG inline (logos, ícones) não precisam de substituição — já são a versão final

## Dicas para Gerar Imagens com IA

### Midjourney
- Adicione `--ar 16:9` para heroes, `--ar 4:3` para cards
- Use `--style raw --v 6` para maior fidelidade fotorrealista
- Combine o prompt com `--q 2` para máxima qualidade
- Exemplo: `/imagine Modern advertising agency office... --ar 16:9 --v 6 --q 2`

### DALL-E 3 (ChatGPT/API)
- Use o prompt exatamente como descrito na tabela
- Selecione "HD" nas opções de qualidade
- Para imagens horizontais, especifique "wide format, 16:9 ratio"

### Adobe Firefly
- Funciona bem com os prompts desta tabela
- Use "Photo" como estilo de geração
- Ative "Match image size" para as dimensões corretas
