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
| `LEAD_WEBHOOK_URL` | Sim | Webhook (n8n) que recebe os leads: planilha + mensagem no WhatsApp. Fica só no servidor e nunca vai para o navegador. Sem ela, o formulário dá erro em produção. |
| `NEXT_PUBLIC_SITE_URL` | Sim | Domínio do site, ex.: `https://www.alphabusinessschool.com.br`. Usada na OG image, no canonical e no sitemap. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Não | WhatsApp do time (`https://wa.me/55...`). Só é usado no botão "Falar com o time agora" da página `/obrigado`. Sem ela, o botão fica oculto. |

As variáveis `NEXT_PUBLIC_*` são lidas no build. Depois de alterar uma delas, faça um novo deploy (**Deployments → ⋯ → Redeploy**).

## Formulário e envio do lead

- Todos os botões da página rolam até o formulário (`#formulario`). Nenhum leva para fora da LP.
- Na primeira página da sessão, o site guarda (first-touch, em `sessionStorage`) `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `gclid`, `fbclid`, a `landing_page` e o `referrer`. Esses valores vão em campos ocultos do formulário.
- O formulário faz `POST /api/lead`. A validação (zod) roda no navegador e no servidor. O servidor monta o JSON abaixo e envia para `LEAD_WEBHOOK_URL`, com timeout de 10 s. Se o webhook responder fora de 2xx, a API devolve 502 e o formulário mostra um erro, sem redirecionar.
- Chaves enviadas ao webhook (string vazia quando não houver valor): `nome`, `whatsapp` (só dígitos, com 55), `whatsapp_formatado`, `email`, `agencia`, `faturamento`, `tamanho_time`, `inicio`, `consentimento`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `gclid`, `fbclid`, `landing_page`, `referrer`, `pagina_envio`, `user_agent`, `ip`, `origem` (`lp-alpha-business-school`) e `enviado_em` (ISO 8601, horário de São Paulo).
- Sem `LEAD_WEBHOOK_URL` no ambiente local, o envio funciona e o JSON aparece só no terminal.

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `Area-tech-alpha/lp_treinamento_franquia`.
2. A Vercel detecta Next.js sozinha. Não altere os comandos de build.
3. Cadastre as variáveis acima e clique em **Deploy**.

Cada push na `main` gera um deploy de produção, e cada push em outras branches (como a `develop`) gera um preview. Os previews não são indexados (`robots.txt` bloqueia), e `/obrigado` tem `noindex`.

No primeiro deploy, confira no log se aparecem `Detected Next.js version` e `Running onBuildComplete from Vercel`. Se não aparecerem e o site responder 404, o projeto estava configurado com outro framework: ajuste o preset para Next.js e faça um redeploy.

## Apontar o domínio

1. Na Vercel, vá em **Project → Settings → Domains** e adicione o domínio (com e sem `www`).
2. No painel DNS do domínio (Registro.br, Cloudflare etc.), crie os registros que a Vercel mostrar. Normalmente são:
   - domínio raiz: registro **A** apontando para `76.76.21.21`
   - `www`: registro **CNAME** apontando para `cname.vercel-dns.com`
3. Aguarde a propagação. O HTTPS é emitido automaticamente.
4. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um redeploy.
