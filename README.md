# LP Alpha Business School

Landing page da Alpha Business School em Next.js (App Router), TypeScript e Tailwind CSS, pronta para deploy na Vercel.

## Rodar local

Requer Node.js 20.9 ou superior.

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
```

Antes de subir alterações, rode `npm run lint` e `npm run build`.

Os dados que o briefing deixou em aberto ([X], [nome], [data] etc.) estão como `null` em `content/abs.ts`. Enquanto forem `null`, o elemento some da tela. A lista completa do que falta está no comentário no topo desse arquivo.

Sem `LEAD_WEBHOOK_URL` no ambiente local, o formulário funciona normalmente e o lead aparece só no terminal.

## Onde editar

| O quê | Onde |
|---|---|
| Textos, cards, FAQ, convidados, depoimentos, links e fotos | `content/abs.ts` |
| O que falta preencher | comentário "FALTA PREENCHER" no topo de `content/abs.ts`: troque cada `null` pelo valor real |
| Fotos | `public/images`. Só as 7 fotos reais da Alpha, com os nomes listados em `photos` |
| Marca | `public/brand/alpha-simbolo.png` (símbolo da ABS: menu, hero, pilares, favicon e OG) e `alpha-logo.png` (Alpha Assessoria: rodapé e seção 13). Arquivos oficiais, só recortados. Cor da marca: `#FFAB00` (`app/globals.css`) |
| Favicon e OG image | `app/icon.png`, `app/apple-icon.png` e `app/opengraph-image.jpg`, gerados a partir do símbolo |
| Fotos de franqueados (hero), convidados e logos | listas vazias em `content/abs.ts`. O bloco só aparece quando houver itens |
| Seções | `components/sections/` (uma por arquivo) |

## Variáveis de ambiente

Na Vercel, cadastre em **Project → Settings → Environment Variables**, marcando Production e Preview.

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `LEAD_WEBHOOK_URL` | Sim | Webhook do n8n que recebe os leads (planilha + WhatsApp). Fica só no servidor e nunca vai para o navegador. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Sim | WhatsApp do time, ex.: `https://wa.me/5511999999999`. |
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | Domínio final, ex.: `https://www.alphabusinessschool.com.br`. Usada na OG image, no canonical e no sitemap. Se ficar vazia, a Vercel usa o domínio de produção do projeto. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Não | ID do Meta Pixel. |
| `NEXT_PUBLIC_GTM_ID` | Não | Container do GTM (`GTM-XXXXXXX`) ou ID do GA4 direto (`G-XXXXXXXXXX`). |

As variáveis `NEXT_PUBLIC_*` são lidas no build. Depois de alterar uma delas, faça um novo deploy (**Deployments → ⋯ → Redeploy**).

## Formulário e rastreamento

- O formulário faz `POST /api/lead`. A validação (zod) roda no navegador e no servidor, e o servidor repassa o lead para `LEAD_WEBHOOK_URL`.
- O payload leva os campos do formulário, as UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`), `whatsapp_digitos` (com 55), `origem`, `pagina` e `enviado_em`.
- As UTMs são lidas da URL na chegada e guardadas na sessão do navegador. Assim continuam valendo mesmo se a pessoa navegar antes de preencher.
- PageView do Pixel e do GTM/GA4 em todas as páginas. O evento **Lead** (Pixel `Lead` e `generate_lead` no dataLayer/GA4) dispara **somente** em `/obrigado`, e só quando a pessoa chega pelo envio do formulário. Recarregar a página não duplica o evento.
- Se usar GTM: crie no container a tag do GA4 e um gatilho para o evento `generate_lead`.

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `Area-tech-alpha/lp_treinamento_franquia`.
2. A Vercel detecta Next.js sozinha. Não altere os comandos de build.
3. Cadastre as variáveis acima e clique em **Deploy**.

Cada push na `main` gera um deploy de produção, e cada push em outras branches (como a `develop`) gera um preview. Os previews não são indexados (`robots.txt` bloqueia), e `/obrigado` tem `noindex`.

## Apontar o domínio

1. Na Vercel, vá em **Project → Settings → Domains** e adicione o domínio (com e sem `www`).
2. No painel DNS do domínio (Registro.br, Cloudflare etc.), crie os registros que a Vercel mostrar. Normalmente são:
   - domínio raiz: registro **A** apontando para `76.76.21.21`
   - `www`: registro **CNAME** apontando para `cname.vercel-dns.com`
3. Aguarde a propagação. O HTTPS é emitido automaticamente.
4. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um redeploy.
