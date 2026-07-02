# Dom Barbearia

Site fictício desenvolvido como projeto de portfólio para freelance web.

## Sobre o projeto

Barbearia premium urbana localizada em Campinas — SP. O site foi desenvolvido com foco em identidade visual forte e dark, transmitindo sofisticação e estilo masculino.

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas (sem frameworks)
- JavaScript puro (ES2020+, sem dependências)
- Hospedagem: Vercel (deploy via GitHub)

## Funcionalidades

- Layout responsivo (mobile-first)
- Menu mobile com overlay e fechamento por ESC
- Scroll reveal com IntersectionObserver
- Active link no scroll
- Faixa animada com CSS (ticker)
- Galeria com lightbox — navegação por clique e teclado (← →)
- Formulário de agendamento ilustrativo
- Botão flutuante do WhatsApp (ilustrativo)
- Tooltips ilustrativos ativados no clique

## Estrutura

```
dom-barbearia/
├── css/
│   ├── style.css        ← estilos globais
│   └── responsive.css   ← breakpoints (1024px, 768px, 480px)
├── img/
├── js/
│   └── main.js          ← interações
└── index.html
```

## Seções

- **Hero** — imagem full-bleed com overlay, nome em tipo condensada gigante
- **Faixa animada** — ticker CSS com os serviços em dourado
- **Serviços** — grid com numeração, nome, descrição e preço
- **Galeria** — grid com lightbox e navegação por teclado
- **Equipe** — cards com foto em hover colorido
- **Agendamento** — formulário ilustrativo com seleção de barbeiro
- **Footer** — links e redes sociais ilustrativas

## Como rodar

```bash
# Clone e abra com Live Server (VS Code)
# ou qualquer servidor local
npx http-server .
```

---

Desenvolvido por [Eduardo Frois](https://www.linkedin.com/in/eduardo-frois)
