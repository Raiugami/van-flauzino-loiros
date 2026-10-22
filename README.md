# Van Flauzino | Loiros e Mechas

Site de uma página de Van Flauzino, especialista em loiros e mechas (loiro iluminado, mechas, morena iluminada e terapia capilar), com agendamento pelo WhatsApp.

- **Site publicado:** a definir (vanflauzino.imaguiar.com.br)
- **Instagram:** https://www.instagram.com/vanflauzino/

## Tecnologias

HTML5, CSS3 e JavaScript, sem build. Imagens em WebP. SEO com meta description, canonical, Open Graph, Twitter card e dados estruturados JSON-LD (schema.org). Hospedagem prevista no GitHub Pages, com domínio em subdomínio de `imaguiar.com.br` (DNS na Cloudflare).

**Exceção ao padrão de JavaScript puro:** este site usa **GSAP 3.12.5** e o plugin **ScrollTrigger**, carregados por CDN (cdnjs) com versão fixada e `integrity` (SRI sha384) no `index.html`, para animações de movimento. O conteúdo funciona sem JavaScript (ou se o CDN falhar): as animações só realçam a página, e com `prefers-reduced-motion` a página fica estática.

**Fontes:** Manrope e Bodoni Moda (Google Fonts), carregadas por `<link>` no `<head>`, com fonte do sistema como alternativa.

## Estrutura

```
index.html    página única (head com SEO e JSON-LD)
css/          estilos (style.css)
js/           animações com GSAP (main.js)
img/          imagens em WebP usadas no site (fotos da galeria e van-retrato.webp)
favicon.svg   ícone da aba (monograma "VF")
CNAME         domínio personalizado do GitHub Pages
robots.txt    regras para buscadores
sitemap.xml   mapa do site
```

## Seções da página

Início, sobre, especialidades, galeria de resultados, dúvidas frequentes e botão de agendar (WhatsApp).

## Pendências

- Publicação: GitHub Pages na `main` (raiz) com `CNAME` `vanflauzino.imaguiar.com.br`; DNS e HTTPS pela Cloudflare. Depois de publicar, trocar "a definir" pelo link no topo deste README.
- Cidade, endereço, horários e preços: a informar; depois incluir no schema (`address`) e na página.
- Depoimentos, cursos e certificações: não informar até haver dados e autorização.
