/**
 * Conteúdo da LP Alpha Business School.
 * Fonte da verdade: briefing "LP Alpha Business School: briefing para o web designer".
 *
 * REGRAS
 * - Texto igual ao briefing. Valores que o briefing trazia entre colchetes
 *   (R$50 milhões, R$30 mil, 42 playbooks, 30 minutos, o seu investimento)
 *   aparecem normais, sem colchetes.
 * - O que o briefing deixou só como [X], [nome], [data], [resultado] está como
 *   `null`. Enquanto for null, o elemento inteiro some da tela.
 * - Cada foto tem `src` + `alt` (o alt descreve a foto de verdade).
 * - Todo botão tem `href` e rola suave até uma âncora da página ("#formulario"
 *   ou "#secao"). Nenhum botão leva para fora da LP.
 *
 * FALTA PREENCHER (campos null / listas vazias)
 * - stats.franqueados ......... nº de franqueados → hero, Seção 3, Seção 10 e Seção 13
 * - stats.cidades ............. nº de cidades → Seção 13
 * - hero.proof.avatars ........ 5 fotos de franqueados (lista vazia)
 * - guests.items .............. Convidados 1 a 4: nome, cargo/empresa, tema, foto (lista vazia)
 * - guests.team[].name / .role  nome e função dos 2 palestrantes do time Alpha
 * - guests.teamLine ........... nome e função do professor-âncora, consultores e monitores
 * - whyNow.nextStart .......... data do próximo início (Seção 8)
 * - testimonials.items[1..3] .. resultado, nome e cidade dos franqueados 2, 3 e 4
 * - logos.items ............... logos das empresas e franquias (lista vazia)
 * - faq "Quanto tempo por semana?" → duração e formato dos encontros
 * - footer.instagram .......... URL do Instagram
 * - footer.cnpj ............... CNPJ
 * - privacy.body .............. texto da política de privacidade
 */

export type Img = { src: string; alt: string; position?: string };
export type Cta = { label: string; href: string };
export type IconName =
  | "megaphone"
  | "handshake"
  | "cog"
  | "users"
  | "wallet"
  | "scale"
  | "chart"
  | "lock"
  | "briefcase"
  | "target"
  | "clock"
  | "calendar"
  | "gift"
  | "shield";

/* -------------------------------------------------------------------------- */
/* Links                                                                       */
/* -------------------------------------------------------------------------- */
/**
 * WhatsApp do time (opcional, NEXT_PUBLIC_WHATSAPP_URL). Só é usado no botão
 * "Falar com o time agora" da página /obrigado, que fica oculto sem a variável.
 */
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "";

const FORM = "#formulario";

/* -------------------------------------------------------------------------- */
/* Números da Alpha (usados em várias seções)                                  */
/* -------------------------------------------------------------------------- */
export const stats = {
  faturamento: "R$50 milhões",
  franqueados: null as string | null, // ex.: "40"
  cidades: null as string | null, // ex.: "25"
};

/* -------------------------------------------------------------------------- */
/* Marca — arquivos oficiais em /public/brand (não editar/redesenhar)          */
/* -------------------------------------------------------------------------- */
export const brand = {
  name: "Alpha Business School",
  color: "#FFAB00",
  // "Símbolo da ABS" do briefing
  symbol: { src: "/brand/alpha-simbolo.png", alt: "", width: 2716, height: 2856 },
  // Logo da Alpha Assessoria (rodapé e Seção 13)
  alphaLogo: {
    src: "/brand/alpha-logo.png",
    alt: "Alpha Assessoria",
    width: 1391,
    height: 396,
  },
  schoolOf: "uma escola da",
};

/* -------------------------------------------------------------------------- */
/* Fotos — SOMENTE fotos reais da Alpha, em /public/images.                    */
/* Para repetir uma foto, use crop() com outro object-position.                 */
/* -------------------------------------------------------------------------- */
export const photos = {
  heroTimeAlpha: {
    src: "/images/hero-time-alpha.jpg",
    alt: "Time da Alpha reunido em evento, comemorando",
  },
  comemoracaoTimeAmarelo: {
    src: "/images/comemoracao-time-amarelo.jpg",
    alt: "Dois membros do time Alpha de camisa amarela se abraçando e sorrindo, com colegas comemorando ao fundo",
  },
  palestranteTelaoComunidade: {
    src: "/images/palestrante-telao-comunidade.jpg",
    alt: "Palestrante de terno no palco diante de um telão com a foto da comunidade Alpha reunida",
  },
  palestrantePalcoTelaoVermelho: {
    src: "/images/palestrante-palco-telao-vermelho.jpg",
    alt: "Palestrante de terno com microfone de cabeça falando no palco, com telão vermelho ao fundo",
  },
  palestranteSlideGenialidade: {
    src: "/images/palestrante-slide-genialidade.jpg",
    alt: "Palestrante de terno falando ao microfone diante do slide “O excesso de boas opções… genialidade”",
  },
  palcoSlideAcoes: {
    src: "/images/palco-slide-acoes-treinamento.jpg",
    alt: "Palestrante no palco diante do telão com o slide “Ações”: canais de captação de talentos, entrevista estruturada e treinamento",
  },
  apertoDeMaoCertificado: {
    src: "/images/aperto-de-mao-certificado.jpg",
    alt: "Aperto de mão entre dois membros da Alpha de camisa amarela, um deles segurando um certificado",
  },
  abracoEventoPB: {
    src: "/images/abraco-evento-pb.jpg",
    alt: "Participantes de terno se abraçando emocionados no salão do evento, em preto e branco",
  },
} satisfies Record<string, Img>;

/** Mesma foto com outro recorte (CSS object-position). */
const crop = (img: Img, position: string): Img => ({ ...img, position });

/* -------------------------------------------------------------------------- */
/* Seção 0 — Menu                                                              */
/* -------------------------------------------------------------------------- */
export const menu = {
  links: [
    { label: "O que é", href: "/#o-que-e" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Convidados", href: "/#convidados" },
    { label: "Resultados", href: "/#resultados" },
    { label: "Dúvidas", href: "/#duvidas" },
  ],
  cta: { label: "Quero minha análise", href: "/#formulario" },
};

/* -------------------------------------------------------------------------- */
/* Seção 1 — Hero                                                              */
/* -------------------------------------------------------------------------- */
export const hero = {
  headline: "Faça sua agência crescer com quem já fez a Alpha crescer.",
  highlight: "a Alpha crescer.",
  sub: "Treinamento individual para donos de agência: um plano feito só para o seu negócio, um monitor só seu e aulas reais com nomes renomados do mercado.",
  cta: { label: "Quero minha análise", href: FORM },
  // Fundo full-bleed. Recorte: object-[center_45%] (fileira de trás + escultura de luz).
  image: photos.heroTimeAlpha,
  // "grayscale" (padrão): P&B + brightness 0.35 | "color": só escurecida (brightness 0.4)
  treatment: "grayscale" as "grayscale" | "color",
  proof: {
    // 5 fotos de franqueados. Ex.: { src: "/images/franqueados/nome.jpg", alt: "Nome, franqueado Alpha" }
    avatars: [] as Img[],
    // valor em negrito + rótulo. Franqueados some enquanto stats.franqueados for null.
    revenue: { value: stats.faturamento, label: "faturados por ano" },
    franchisees: stats.franqueados
      ? { value: stats.franqueados, label: "franqueados aplicando o método Alpha" }
      : null,
  },
};

/* -------------------------------------------------------------------------- */
/* Seção 2 — O que é                                                           */
/* -------------------------------------------------------------------------- */
export const about = {
  label: "O que é a Alpha Business School",
  title: "O treinamento que transforma método em faturamento",
  text: "A Alpha Business School é um treinamento individual para donos de agência. Você aprende com o time que estrutura a Alpha todos os dias e com convidados de mercado, e aplica tudo na sua própria agência, com um monitor validando cada entrega.",
  pillars: [
    { icon: "megaphone", label: "Marketing" },
    { icon: "handshake", label: "Comercial" },
    { icon: "cog", label: "Operação" },
    { icon: "users", label: "Gestão e Time" },
    { icon: "wallet", label: "Financeiro" },
    { icon: "scale", label: "Jurídico" },
  ] satisfies { icon: IconName; label: string }[],
  strip: {
    text: "Cada pilar é uma alavanca do mesmo resultado: crescer com método, não com sorte.",
    cta: { label: "Conhecer o treinamento", href: "#como-funciona" },
  },
};

/* -------------------------------------------------------------------------- */
/* Seção 3 — Números (card com value null some). Fundo: alpha-logo.png desfocada */
/* -------------------------------------------------------------------------- */
export const numbers = {
  title: "Crescimento comprovado dentro de casa.",
  items: [
    { value: stats.faturamento as string | null, label: "faturados por ano pela Alpha" },
    { value: stats.franqueados, label: "franqueados aplicando o método" },
    { value: "32" as string | null, label: "entregáveis aplicados na sua agência" },
    { value: "17" as string | null, label: "semanas de treinamento e acompanhamento" },
  ],
  closing: "Não é teoria. É o que roda na Alpha todos os dias.",
};

/* -------------------------------------------------------------------------- */
/* Seção 5 — Como funciona                                                     */
/* -------------------------------------------------------------------------- */
export const howItWorks = {
  label: "Como funciona",
  title: "Um treinamento individual, do diagnóstico ao resultado",
  text: "Nada de turma genérica. O plano, o monitor e os entregáveis são da sua agência.",
  image: crop(photos.palcoSlideAcoes, "35% 45%"),
  steps: [
    {
      number: "01",
      when: "Semana 0",
      title: "Diagnóstico",
      text: "Business Score da sua agência em 6 pilares e plano individual montado com o seu monitor.",
    },
    {
      number: "02",
      when: "Semanas 1 a 9",
      title: "Imersão",
      text: "3 encontros ao vivo por semana, entre aulas e laboratórios em que você apresenta e recebe correção na hora. 1:1 semanal com o seu monitor.",
    },
    {
      number: "03",
      when: "Semanas 10 a 17",
      title: "Acompanhamento",
      text: "Implementação assistida na sua agência, com 1:1 a cada 15 dias.",
    },
    {
      number: "04",
      when: "Semana 17",
      title: "Resultado",
      text: "Novo Business Score para medir a evolução, e certificação.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Seção 6 — Convidados                                                        */
/* -------------------------------------------------------------------------- */
export type Person = {
  name: string | null;
  role: string | null;
  theme?: string | null;
  image: Img;
};

export const guests = {
  label: "Quem ensina",
  title: "Aulas reais com quem é referência no mercado",
  text: "Além do time da Alpha, convidados renomados do mercado conduzem aulas reais: números, cases e bastidores de quem constrói empresas que crescem.",
  // Convidados 1 a 4. Enquanto vazio, o bloco não aparece.
  // Ex.: { name: "Nome", role: "Cargo, Empresa", theme: "Tema da aula",
  //        image: { src: "/images/convidados/nome.jpg", alt: "Nome, cargo na Empresa" } }
  items: [] as Person[],
  // Time Alpha que conduz o treinamento (fotos em P&B, nome em âmbar quando houver).
  team: [
    { name: null, role: null, image: crop(photos.palestranteSlideGenialidade, "55% 30%") },
    { name: null, role: null, image: crop(photos.palestrantePalcoTelaoVermelho, "45% 20%") },
  ] as Person[],
  // "E o time Alpha que conduz o treinamento: [nome e função do professor-âncora,
  //  dos consultores e dos monitores]." — some enquanto for null.
  teamLine: null as string | null,
  tags: ["Aulas reais", "Cases", "Bastidores"],
};

/* -------------------------------------------------------------------------- */
/* Seção 7 — Para quem é                                                       */
/* -------------------------------------------------------------------------- */
export const audience = {
  title: "Para quem quer crescer de verdade",
  image: crop(photos.palestranteTelaoComunidade, "20% 60%"),
  items: [
    {
      icon: "chart",
      title: "Dono de agência travado nos 30-50 mil.",
      text: "Fatura o mesmo há meses e não sabe qual alavanca mexer primeiro.",
    },
    {
      icon: "lock",
      title: "Dono preso no operacional.",
      text: "A agência para quando você para.",
    },
    {
      icon: "briefcase",
      title: "Sócios que querem profissionalizar.",
      text: "Financeiro, contratos e time organizados como empresa.",
    },
    {
      icon: "target",
      title: "Agência sem comercial.",
      text: "Quer um time que vende sem depender de você.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
  notFor: {
    label: "Não é para:",
    text: "quem ainda não tem clientes ou não pode dedicar tempo às aulas e entregas.",
  },
};

/* -------------------------------------------------------------------------- */
/* Seção 8 — Por que agora                                                     */
/* -------------------------------------------------------------------------- */
export const whyNow = {
  title: "Por que agora é o momento de estruturar a sua agência",
  nextStart: null as string | null, // data do próximo início, ex.: "10 de março"
  get items() {
    return [
      {
        icon: "clock" as IconName,
        title: "Cada mês travado custa faturamento.",
        text: "O teto de hoje vira o teto do ano que vem.",
      },
      {
        icon: "users" as IconName,
        title: "Acompanhamento individual tem vagas limitadas.",
        text: "Cada monitor acompanha poucos alunos por vez.",
      },
      // Some enquanto nextStart for null.
      this.nextStart
        ? {
            icon: "calendar" as IconName,
            title: `Próximo início: ${this.nextStart}.`,
            text: "As vagas fecham quando o grupo de monitores estiver completo.",
          }
        : null,
    ].filter((i) => i !== null);
  },
  cta: { label: "Garantir minha vaga", href: FORM },
};

/* -------------------------------------------------------------------------- */
/* Seção 9 — O que você leva                                                   */
/* -------------------------------------------------------------------------- */
export const deliverables = {
  title: "Tudo o que você leva pronto para a sua agência",
  pillars: [
    {
      icon: "megaphone",
      title: "Marketing",
      items: [
        "oferta e planos",
        "landing page",
        "WhatsApp automático",
        "campanhas e painel",
        "lead rastreado até a venda",
      ],
    },
    {
      icon: "handshake",
      title: "Comercial",
      items: [
        "script de qualificação",
        "follow-up",
        "roteiro de reunião",
        "contrato TCV",
        "CRM e comissão do time",
      ],
    },
    {
      icon: "cog",
      title: "Operação",
      items: ["onboarding", "retenção", "Health Score", "NPS e upsell"],
    },
    {
      icon: "users",
      title: "Gestão e Time",
      items: ["organograma", "plano de carreira", "vagas com DISC", "metas por função"],
    },
    {
      icon: "wallet",
      title: "Financeiro",
      items: ["DRE", "fluxo de caixa", "pró-labore", "margem por cliente", "preço mínimo"],
    },
    {
      icon: "scale",
      title: "Jurídico",
      items: ["contrato com clientes", "contrato de colaboradores", "marca", "LGPD"],
    },
  ] satisfies { icon: IconName; title: string; items: string[] }[],
  bonus: {
    title: "Bônus",
    image: crop(photos.apertoDeMaoCertificado, "45% 35%"),
    items: [
      "Acesso aos 42 playbooks internos que a Alpha usa nas próprias operações.",
      "Business Score de entrada e de saída da sua agência.",
      "Certificado Alpha Business School.",
      "Para quem se certifica: convite para conhecer a franquia Alpha, com crédito na taxa.",
    ],
  },
  investment: { label: "Investimento:", text: "a partir de R$30 mil." },
  guarantee: {
    title: "Garantia",
    text: "Business Score no início e no fim. Cumpriu presença e entregáveis e o score não evoluiu? Devolvemos o seu investimento.",
  },
  cta: { label: "Quero minha análise", href: FORM },
};

/* -------------------------------------------------------------------------- */
/* Seção 10 — Depoimentos (card com result null some)                          */
/* -------------------------------------------------------------------------- */
export type Testimonial = {
  result: string | null;
  name: string | null;
  city: string | null;
  photo: Img | null; // foto real, ex.: { src: "/images/depoimentos/nome.jpg", alt: "Nome" }
};

export const testimonials = {
  title: "Histórias reais de quem aplicou o método Alpha",
  background: crop(photos.abracoEventoPB, "50% 65%"),
  items: [
    {
      result: "De 30 mil/mês para + de R$1 milhão no 1º ano.",
      name: "Kaique Takeshida",
      city: "Goiânia",
      photo: null,
    },
    { result: null, name: null, city: null, photo: null }, // Franqueado 2
    { result: null, name: null, city: null, photo: null }, // Franqueado 3
    { result: null, name: null, city: null, photo: null }, // Franqueado 4
  ] as Testimonial[],
  // "… e mais [X] franqueados aplicando o método Alpha." — some enquanto stats.franqueados for null
  more: stats.franqueados
    ? `… e mais ${stats.franqueados} franqueados aplicando o método Alpha.`
    : null,
  disclaimer:
    "Resultados de franqueados da Alpha. Variam conforme a execução de cada negócio.",
};

/* -------------------------------------------------------------------------- */
/* Seção 11 — Logos e formulário                                               */
/* -------------------------------------------------------------------------- */
export const logos = {
  title: "Empresas e franquias que rodam o método Alpha",
  // Enquanto vazio, a faixa de logos não aparece.
  // Ex.: { src: "/images/logos/empresa.svg", alt: "Logo da Empresa" }
  items: [] as Img[],
};

/** Opções do formulário (mesmas faixas do formulário da franquia). */
export const leadOptions = {
  faturamento: [
    "Até 20 mil",
    "20 a 50 mil",
    "50 a 100 mil",
    "100 a 300 mil",
    "Acima de 300 mil",
  ],
  time: ["Só eu", "2 a 5", "6 a 15", "Mais de 15"],
  investimento: ["Sim, à vista", "Sim, parcelado", "Ainda não"],
  prazo: ["Próxima turma", "Em até 3 meses", "6 meses ou mais"],
} as const;

export const form = {
  title: "Sua agência começa a crescer com método agora.",
  text: "Preencha e receba uma análise gratuita da sua agência. Nosso time te chama no WhatsApp em até 1 minuto.",
  labels: {
    nome: "Nome",
    whatsapp: "WhatsApp",
    email: "E-mail",
    agencia: "Agência (nome ou @)",
    faturamento: "Faturamento mensal",
    time: "Tamanho do time",
    investimento: "Tem R$30 mil para investir?",
    prazo: "Quando quer começar",
  },
  consent: {
    text: "Aceito receber contato da Alpha Business School",
    linkLabel: "política de privacidade",
    href: "/privacidade",
  },
  submit: "Quero minha análise",
  sending: "Enviando...",
  error: "Não conseguimos enviar agora. Confira sua conexão e tente de novo em instantes.",
};

/* -------------------------------------------------------------------------- */
/* Seção 12 — Dúvidas (partes null somem)                                      */
/* -------------------------------------------------------------------------- */
const duracaoEncontros = null as string | null; // "[Duração e formato dos encontros]"

export const faq = {
  label: "Dúvidas",
  items: [
    {
      q: "Como é a análise da minha agência?",
      a: [
        "Uma conversa de 30 minutos, online, com um especialista da Alpha. Leve seus números e suas travas. Pode levar o sócio.",
      ],
    },
    {
      q: "O treinamento é mesmo individual?",
      a: ["Sim. Plano, monitor, 1:1 e entregáveis são da sua agência."],
    },
    {
      q: "Quem dá as aulas?",
      a: ["O time da Alpha e convidados renomados do mercado, em aulas reais e ao vivo."],
    },
    {
      q: "Quanto tempo por semana?",
      a: [
        "3 encontros ao vivo, o 1:1 com o monitor e o tempo para aplicar os entregáveis.",
        duracaoEncontros,
      ],
    },
    {
      q: "E se eu faltar?",
      a: [
        "Presença mínima de 90%. Faltas podem ser abonadas com seminário ou vídeo-resumo em até 3 dias.",
      ],
    },
    {
      q: "Como funciona a garantia?",
      a: [
        "Business Score no início e no fim. Cumpriu presença e entregáveis e não evoluiu? Devolvemos o seu investimento.",
      ],
    },
    {
      q: "Vou virar franqueado?",
      a: [
        "Não automaticamente. Quem se certifica pode receber o convite, com crédito na taxa se a compra for em até 30 dias.",
      ],
    },
  ] satisfies { q: string; a: (string | null)[] }[],
};

/* -------------------------------------------------------------------------- */
/* Seção 13 — Fechamento                                                       */
/* -------------------------------------------------------------------------- */
export const closing = {
  title: "Alpha Business School: a escola da Alpha",
  // "A Alpha fatura R$50 milhões por ano e tem [X] franqueados em [X] cidades."
  // A parte dos franqueados/cidades só aparece quando stats.franqueados e stats.cidades existirem.
  numbers:
    stats.franqueados && stats.cidades
      ? `A Alpha fatura ${stats.faturamento} por ano e tem ${stats.franqueados} franqueados em ${stats.cidades} cidades.`
      : `A Alpha fatura ${stats.faturamento} por ano.`,
  text: "A Alpha Business School é a forma de levar esse mesmo método para dentro da sua agência.",
  image: crop(photos.comemoracaoTimeAmarelo, "50% 12%"),
  ctas: [
    { label: "Quero minha análise", href: FORM },
    {
      label: "Falar com o time no WhatsApp",
      href: FORM, // mantém o texto/ícone de WhatsApp, mas rola até o formulário
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Seção 14 — Rodapé, obrigado e privacidade                                   */
/* -------------------------------------------------------------------------- */
export const footer = {
  links: [
    { label: "Sobre", href: "/#o-que-e" },
    { label: "Dúvidas", href: "/#duvidas" },
    { label: "Contato", href: "/#formulario" },
    { label: "Política de privacidade", href: "/privacidade" },
  ],
  instagram: null as string | null, // URL do Instagram
  cnpj: null as string | null,
};

export const thanks = {
  title: "Recebemos! Agora fique de olho no WhatsApp.",
  // Só aparece se NEXT_PUBLIC_WHATSAPP_URL existir.
  cta: WHATSAPP_URL ? { label: "Falar com o time agora", href: WHATSAPP_URL } : null,
};

export const privacy = {
  title: "Política de privacidade",
  // Texto da política (coleta, uso e compartilhamento de dados, base legal LGPD,
  // direitos do titular e contato do encarregado). Parágrafos separados.
  body: null as string[] | null,
};

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */
export const seo = {
  title: "Alpha Business School | Treinamento individual para donos de agência",
  description: hero.sub,
  // OG image: app/opengraph-image.jpg (gerada a partir de comemoracao-time-amarelo.jpg + alpha-simbolo.png)
};
