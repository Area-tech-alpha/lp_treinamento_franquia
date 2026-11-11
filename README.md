# LP Alpha Assessoria

Landing page institucional da Alpha Assessoria, feita em Next.js (App Router) com Tailwind CSS.

## Rodar local

Requer Node.js 20.9 ou superior.

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # http://localhost:3000
```

Antes de subir alterações, rode `npm run lint` e `npm run build`.

## Onde editar

- **Textos, CTAs e fotos:** `content/home.ts`. Cada card tem a foto (`src` + `alt`) e os textos juntos. Os itens marcados com `{{PREENCHER}}` precisam de dado real antes de publicar.
- **Fotos:** coloque os arquivos em `public/images`, com os nomes listados no mapa `photos` em `content/home.ts`.
- **Seções:** `components/sections/`.

## Variáveis de ambiente

Na Vercel, cadastre em **Project → Settings → Environment Variables**, marcando Production e Preview. A lista completa está em `.env.example`.

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_URL` | Sim | WhatsApp do consultor, ex.: `https://wa.me/5511999999999`. Sem ela, os CTAs só rolam até o contato. |
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | Domínio final, ex.: `https://www.alpha.com.br`. Usada na OG image, no canonical e no sitemap. Se ficar vazia, a Vercel usa o domínio de produção do projeto. |
| `NEXT_PUBLIC_GA_ID` | Não | ID do Google Analytics 4 (`G-XXXXXXXXXX`). |
| `NEXT_PUBLIC_META_PIXEL_ID` | Não | ID do Meta Pixel. |

As variáveis `NEXT_PUBLIC_*` são lidas no momento do build. Depois de alterar uma delas na Vercel, faça um novo deploy (**Deployments → ⋯ → Redeploy**).

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `Area-tech-alpha/lp_treinamento_franquia`.
2. A Vercel detecta Next.js sozinha. Não altere os comandos de build.
3. Cadastre as variáveis de ambiente acima e clique em **Deploy**.

Cada push na `main` gera um deploy de produção, e cada push em outras branches (como a `develop`) gera um deploy de preview. Os previews não são indexados pelo Google (`robots.txt` bloqueia).

## Apontar o domínio

1. Na Vercel, vá em **Project → Settings → Domains** e adicione o domínio (ex.: `alpha.com.br` e `www.alpha.com.br`).
2. No painel DNS do domínio (Registro.br, Cloudflare etc.), crie os registros que a Vercel mostrar. Normalmente são:
   - domínio raiz (`alpha.com.br`): registro **A** apontando para `76.76.21.21`
   - `www`: registro **CNAME** apontando para `cname.vercel-dns.com`
3. Aguarde a propagação. A Vercel emite o certificado HTTPS automaticamente.
4. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um redeploy.
