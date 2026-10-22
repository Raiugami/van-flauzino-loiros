# Van Flauzino | Loiros e Mechas

Site de uma página de Van Flauzino, especialista em loiros e mechas (loiro iluminado, mechas, morena iluminada e terapia capilar), com agendamento pelo WhatsApp.

- **Site publicado:** a definir (vanflauzino.imaguiar.com.br)
- **Instagram:** https://www.instagram.com/vanflauzino/

## Tecnologias

HTML5, CSS3 e JavaScript, sem build. Imagens em WebP. SEO com meta description, canonical, Open Graph, Twitter card e dados estruturados JSON-LD (schema.org). Hospedagem prevista no GitHub Pages, com domínio em subdomínio de `imaguiar.com.br` (DNS na Cloudflare).

**Exceção ao padrão de JavaScript puro:** este site usa **GSAP** e o plugin **ScrollTrigger**, carregados por CDN, para animações de movimento (decisão do Gabriel). A versão será fixada no `index.html` (com `integrity`/SRI) pelo Codex e pelo Dev. O conteúdo funciona sem JavaScript: as animações só realçam a página, e `prefers-reduced-motion` as desliga.

## Estrutura

```
index.html    página única (head com SEO e JSON-LD; corpo a preencher)
css/          estilos (style.css, a criar)
js/           animações com GSAP (a criar)
img/          imagens em WebP usadas no site
favicon.svg   ícone da aba (monograma "VF", provisório)
CNAME         domínio personalizado do GitHub Pages
robots.txt    regras para buscadores
sitemap.xml   mapa do site
```

## Seções previstas

Início, sobre, especialidades, galeria de resultados, dúvidas frequentes e botão fixo de agendar (WhatsApp).

## Pendências

- Corpo da página, CSS e animações: a fazer (visual primeiro, depois integração).
- Repositório no GitHub (`van-flauzino-loiros`, público), GitHub Pages e DNS: aguardando confirmação do Gabriel. O `CNAME` já está no projeto.
- Cidade, endereço, horários e preços: a informar; depois incluir no schema (`address`) e na página.
- Depoimentos, cursos e certificações: não informar até haver dados e autorização.
