/**
 * Conteúdo editável da home da Alpha Assessoria.
 *
 * - Tudo que estiver como {{PREENCHER}} é placeholder: substitua por dado real
 *   antes de publicar. Não deixe números ou depoimentos inventados no ar.
 * - Cada item com foto tem `image: { src, alt }` junto dos textos que descrevem
 *   aquela foto. Para trocar a foto, troque o par imagem + texto no mesmo item.
 * - Todo CTA tem um `href`. Use `whatsapp("origem")` para abrir o WhatsApp do
 *   consultor com mensagem dizendo de onde a pessoa veio, ou "#cta-final" para
 *   rolar até o contato.
 */

export type IconName =
  | "graduation"
  | "users"
  | "briefcase"
  | "handshake"
  | "trophy"
  | "calendar"
  | "map"
  | "rocket"
  | "target"
  | "mic"
  | "star"
  | "chart"
  | "building";

export type Img = { src: string; alt: string };
export type Cta = { label: string; href: string };

/* -------------------------------------------------------------------------- */
/* WhatsApp do consultor                                                       */
/* Defina NEXT_PUBLIC_WHATSAPP_URL no .env.local, ex.:                          */
/*   NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/5511999999999                       */
/* Sem a variável, os CTAs de WhatsApp rolam até o CTA final.                  */
/* -------------------------------------------------------------------------- */
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "";

export function whatsapp(origem: string): string {
  if (!WHATSAPP_URL) return "#cta-final";
  const url = new URL(WHATSAPP_URL);
  url.searchParams.set(
    "text",
    `Olá! Vim pelo site da Alpha (${origem}) e quero falar com um consultor.`,
  );
  return url.toString();
}

/* -------------------------------------------------------------------------- */
/* Fotos — salve os arquivos em /public/images com estes nomes.                */
/* O `alt` descreve o que a foto mostra de verdade.                            */
/* -------------------------------------------------------------------------- */
export const photos = {
  palestrantePalco: {
    src: "/images/palestrante-palco.jpg",
    alt: "Palestrante de terno falando ao microfone no palco do evento Alpha",
  },
  palcoAcoesTime: {
    src: "/images/palco-acoes-time-comercial.jpg",
    alt: "Palco com slide de ações: captação de talentos, entrevista estruturada e treinamento",
  },
  palcoTelaoPlateia: {
    src: "/images/palco-telao-plateia.jpg",
    alt: "Palco com telão e auditório cheio de participantes do evento Alpha",
  },
  certificadoApertoMao: {
    src: "/images/certificado-aperto-mao.jpg",
    alt: "Aperto de mão na entrega de certificado, com camisa amarela da Alpha",
  },
  abracoEventoPB: {
    src: "/images/abraco-evento-pb.jpg",
    alt: "Abraço emocionado entre participantes durante o evento, em preto e branco",
  },
  comemoracaoAmarelo: {
    src: "/images/comemoracao-camisa-amarela.jpg",
    alt: "Dois participantes de camisa amarela da Alpha comemorando",
  },
  palestranteBoasOpcoes: {
    src: "/images/palestrante-slide-boas-opcoes.jpg",
    alt: "Palestrante no palco diante do slide “O excesso de boas opções...”",
  },
} satisfies Record<string, Img>;

/* -------------------------------------------------------------------------- */
/* Geral                                                                       */
/* -------------------------------------------------------------------------- */
export const site = {
  name: "Alpha Assessoria",
  description:
    "Formações, estruturação de times comerciais e eventos que mudam a forma como você trabalha e cresce. Conheça a Alpha Assessoria.",
  ogImage: photos.palestrantePalco,
  studentAreaUrl: "#", // {{PREENCHER}} link da área do aluno
};

export const header = {
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "O que é a Alpha", href: "#o-que-e" },
    { label: "Para profissionais", href: "#profissionais" },
    { label: "Para empresas", href: "#empresas" },
    { label: "Para parceiros", href: "#parceiros" },
  ],
  cta: { label: "Começar agora", href: whatsapp("Cabeçalho - Começar agora") },
  studentLink: { label: "Já sou aluno", href: site.studentAreaUrl },
};

/* -------------------------------------------------------------------------- */
/* 2. Hero — foto: palestrante de terno com microfone                          */
/* -------------------------------------------------------------------------- */
export const hero = {
  image: photos.palestrantePalco,
  eyebrow: "Alpha Assessoria",
  title: "Aprenda com quem sobe no palco e vive o mercado.",
  highlight: "vive o mercado.",
  subtitle:
    "Formações, palestras e treinamentos conduzidos por quem faz na prática. Você sai do evento sabendo exatamente o que aplicar no dia seguinte.",
  primaryCta: { label: "Começar agora", href: whatsapp("Hero - Começar agora") },
  secondaryCta: { label: "Conhecer o ecossistema", href: "#o-que-e" },
};

/* -------------------------------------------------------------------------- */
/* 3. Ecossistema (sem foto — visual da esfera)                                */
/* -------------------------------------------------------------------------- */
export const ecosystem = {
  eyebrow: "O ecossistema",
  title: "Tudo o que você precisa para crescer, num só lugar.",
  text: "A Alpha conecta formação, estruturação de times, eventos e comunidade. Cada pilar alimenta o outro — e você no centro de tudo.",
  center: "Alpha",
  pillars: [
    { icon: "graduation", label: "Formações" },
    { icon: "briefcase", label: "Times comerciais" },
    { icon: "mic", label: "Palestras e eventos" },
    { icon: "users", label: "Comunidade" },
  ] satisfies { icon: IconName; label: string }[],
  strip: {
    text: "Não é só um curso. É um ambiente feito para você evoluir todos os dias.",
    cta: { label: "Explorar o ecossistema", href: "#metodo" },
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Impacto em números — foto: palco com telão e auditório cheio             */
/* -------------------------------------------------------------------------- */
export const numbers = {
  eyebrow: "Impacto em números",
  title: "Auditório cheio não é acaso. É resultado.",
  image: photos.palcoTelaoPlateia,
  imageCaption: "Cada evento Alpha reúne uma comunidade inteira querendo crescer junto.",
  items: [
    { icon: "graduation", value: "{{PREENCHER}}", label: "alunos formados" },
    { icon: "calendar", value: "{{PREENCHER}}", label: "eventos realizados" },
    { icon: "users", value: "{{PREENCHER}}", label: "participantes nos eventos" },
    { icon: "building", value: "{{PREENCHER}}", label: "empresas atendidas" },
  ] satisfies { icon: IconName; value: string; label: string }[],
};

/* -------------------------------------------------------------------------- */
/* 5. Método Alpha                                                             */
/* -------------------------------------------------------------------------- */
export const method = {
  eyebrow: "O método Alpha",
  title: "Mentalidade primeiro. Método em seguida. Resultado na sequência.",
  text: "Antes de qualquer técnica, a Alpha trabalha foco e decisão. Depois vem o método: conteúdo direto, acompanhamento de perto e prática desde o primeiro dia.",
  // Bloco de mentalidade — foto: palestrante com slide "O excesso de boas opções..."
  mindset: {
    image: photos.palestranteBoasOpcoes,
    label: "Mentalidade",
    title: "Crescer também é saber dizer não.",
    text: "Excesso de boas opções trava tanto quanto a falta delas. Na Alpha você aprende a escolher o que importa — e a executar até o fim.",
  },
  chooseLabel: "Escolha seu caminho",
  paths: [
    {
      // foto: palestrante de terno com microfone
      id: "profissionais",
      icon: "rocket",
      audience: "Para profissionais",
      image: photos.palestrantePalco,
      badge: "Formações",
      title: "Formações conduzidas por quem está no palco e no mercado.",
      tags: ["Formações", "Palestras ao vivo", "Certificado"],
      bullets: [
        "Aulas e palestras ao vivo com especialistas que vivem o que ensinam",
        "Conteúdo prático para aplicar no dia seguinte",
        "Certificado de conclusão ao final da formação",
      ],
      cta: { label: "Saber mais", href: whatsapp("Card Para profissionais - Formações") },
    },
    {
      // foto: palco com slide "AÇÕES / captação de talentos / entrevista estruturada / treinamento"
      id: "empresas",
      icon: "building",
      audience: "Para empresas",
      image: photos.palcoAcoesTime,
      badge: "Time comercial",
      title: "Estruture seu time comercial: da contratação ao treinamento.",
      tags: ["Captação de talentos", "Entrevista estruturada", "Treinamento"],
      bullets: [
        "Captação de talentos para montar o time comercial certo",
        "Entrevista estruturada para contratar com critério, não no feeling",
        "Treinamento contínuo para o time vender mais e melhor",
      ],
      cta: { label: "Saber mais", href: whatsapp("Card Para empresas - Time comercial") },
    },
    {
      // foto: aperto de mão / entrega de certificado (camisa amarela)
      id: "parceiros",
      icon: "handshake",
      audience: "Para parceiros",
      image: photos.certificadoApertoMao,
      badge: "Certificação",
      title: "Parceria que começa com um aperto de mão e um certificado.",
      tags: ["Parceria", "Certificação", "Reconhecimento"],
      bullets: [
        "Formação e certificação no método Alpha",
        "Reconhecimento a cada etapa conquistada",
        "O time Alpha ao seu lado, do primeiro aperto de mão em diante",
      ],
      cta: { label: "Saber mais", href: whatsapp("Card Para parceiros - Certificação") },
    },
  ] satisfies {
    id: string;
    icon: IconName;
    audience: string;
    image: Img;
    badge: string;
    title: string;
    tags: string[];
    bullets: string[];
    cta: Cta;
  }[],
};

/* -------------------------------------------------------------------------- */
/* 6. Palestras e eventos — banner: palestrante de terno com microfone         */
/* -------------------------------------------------------------------------- */
export const events = {
  eyebrow: "Palestras e eventos",
  title: "Contrate palestras e treinamentos",
  text: "Leve um palestrante Alpha para o palco do seu evento, convenção ou equipe. Conteúdo que inspira e, principalmente, que gera ação.",
  image: photos.palestrantePalco,
  tags: ["Palestras", "Workshops", "Convenções", "Treinamentos in company"],
  cta: { label: "Solicitar proposta", href: whatsapp("Banner Palestras e eventos") },
  gallery: [
    { image: photos.palcoTelaoPlateia, caption: "Auditório cheio" },
    { image: photos.palcoAcoesTime, caption: "Conteúdo aplicado" },
    { image: photos.certificadoApertoMao, caption: "Entrega de certificados" },
    { image: photos.comemoracaoAmarelo, caption: "Conquistas comemoradas" },
  ] satisfies { image: Img; caption: string }[],
};

/* -------------------------------------------------------------------------- */
/* 7. Faixa amarela — carrossel de fotos em moldura de celular                 */
/* -------------------------------------------------------------------------- */
export const showcase = {
  title: "Por dentro dos eventos Alpha",
  items: [
    photos.palestrantePalco,
    photos.palcoTelaoPlateia,
    photos.certificadoApertoMao,
    photos.comemoracaoAmarelo,
    photos.palcoAcoesTime,
    photos.abracoEventoPB,
    photos.palestranteBoasOpcoes,
  ] satisfies Img[],
};

/* -------------------------------------------------------------------------- */
/* 8. Para quem é (sem foto — cards com ícone)                                 */
/* -------------------------------------------------------------------------- */
export const audience = {
  eyebrow: "Para quem é",
  title: "Se você quer mais, a Alpha é para você.",
  items: [
    {
      icon: "rocket",
      title: "Quem está começando",
      text: "Quer entrar no mercado com base sólida e direção clara.",
    },
    {
      icon: "chart",
      title: "Quem quer acelerar",
      text: "Já atua, mas sabe que pode ir muito além do que está hoje.",
    },
    {
      icon: "briefcase",
      title: "Gestores comerciais",
      text: "Precisam contratar melhor e treinar o time para vender mais.",
    },
    {
      icon: "handshake",
      title: "Futuros parceiros",
      text: "Querem empreender com uma marca e um método que funcionam.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

/* -------------------------------------------------------------------------- */
/* 9. Depoimentos — "Histórias reais"                                          */
/* Fotos de destaque: comemoração de amarelo + entrega de certificado          */
/* -------------------------------------------------------------------------- */
export const testimonials = {
  eyebrow: "Histórias reais",
  title: "Reconhecimento que se comemora junto.",
  text: "Cada certificado entregue e cada meta batida é de alguém que decidiu levar o próprio crescimento a sério.",
  highlights: [
    {
      image: photos.comemoracaoAmarelo,
      caption: "Meta batida se comemora com o time.",
    },
    {
      image: photos.certificadoApertoMao,
      caption: "Certificação: o reconhecimento de quem fez o trabalho.",
    },
  ] satisfies { image: Img; caption: string }[],
  items: [
    {
      result: "+R$ {{PREENCHER}} em {{PREENCHER}} semanas",
      quote: "{{PREENCHER: depoimento real do aluno}}",
      name: "{{PREENCHER: nome}}",
      role: "{{PREENCHER: cargo / cidade}}",
      photo: null as Img | null, // ex.: { src: "/images/depoimentos/nome.jpg", alt: "Foto de Nome" }
    },
    {
      result: "+R$ {{PREENCHER}} em {{PREENCHER}} semanas",
      quote: "{{PREENCHER: depoimento real do aluno}}",
      name: "{{PREENCHER: nome}}",
      role: "{{PREENCHER: cargo / cidade}}",
      photo: null as Img | null,
    },
    {
      result: "+R$ {{PREENCHER}} em {{PREENCHER}} semanas",
      quote: "{{PREENCHER: depoimento real do aluno}}",
      name: "{{PREENCHER: nome}}",
      role: "{{PREENCHER: cargo / cidade}}",
      photo: null as Img | null,
    },
  ],
  moreTitle: "...e mais de centenas de histórias de sucesso",
  // Prints de mensagens/resultados de alunos.
  prints: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/prints/print-${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Print de mensagem de resultado de aluno ${i + 1}`,
  })) satisfies Img[],
};

/* -------------------------------------------------------------------------- */
/* 10. Empresas parceiras                                                      */
/* -------------------------------------------------------------------------- */
export const partners = {
  eyebrow: "Empresas parceiras",
  title: "Quem confia na Alpha",
  // image null mostra o nome no lugar do logo.
  // Ex.: { name: "Empresa", image: { src: "/images/logos/empresa.svg", alt: "Logo da Empresa" } }
  logos: Array.from({ length: 8 }, () => ({
    name: "{{PREENCHER}}",
    image: null as Img | null,
  })),
};

/* -------------------------------------------------------------------------- */
/* 11. CTA final — foto: abraço emocionado no evento (P&B)                     */
/* -------------------------------------------------------------------------- */
export const finalCta = {
  image: photos.abracoEventoPB,
  eyebrow: "Próximo passo",
  title: "Sua jornada começa agora",
  text: "A próxima história emocionante pode ser a sua. Fale com um consultor da Alpha e descubra o caminho certo para você ou para a sua empresa.",
  cta: { label: "Falar com um consultor", href: whatsapp("CTA final - Falar com um consultor") },
};

/* -------------------------------------------------------------------------- */
/* 12. FAQ                                                                     */
/* -------------------------------------------------------------------------- */
export const faq = {
  eyebrow: "Dúvidas frequentes",
  title: "Perguntas frequentes",
  items: [
    {
      q: "O que é a Alpha Assessoria?",
      a: "A Alpha reúne formações, estruturação de times comerciais, palestras e uma comunidade para profissionais, empresas e parceiros que querem crescer. {{PREENCHER: complemente}}",
    },
    { q: "Preciso ter experiência para começar?", a: "{{PREENCHER}}" },
    { q: "As formações têm certificado?", a: "{{PREENCHER}}" },
    {
      q: "Como funciona a estruturação de time comercial para empresas?",
      a: "{{PREENCHER}}",
    },
    { q: "Como me torno um parceiro Alpha?", a: "{{PREENCHER}}" },
    {
      q: "Como falo com um consultor?",
      a: "É só clicar em “Falar com um consultor” e chamar o nosso time no WhatsApp.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */
export const footer = {
  tagline: "Formações, times comerciais e eventos para quem quer crescer.",
  columns: [
    {
      title: "Alpha",
      links: [
        { label: "O que é a Alpha", href: "#o-que-e" },
        { label: "O método", href: "#metodo" },
        { label: "Palestras e eventos", href: "#eventos" },
        { label: "Histórias reais", href: "#depoimentos" },
      ],
    },
    {
      title: "Caminhos",
      links: [
        { label: "Para profissionais", href: "#profissionais" },
        { label: "Para empresas", href: "#empresas" },
        { label: "Para parceiros", href: "#parceiros" },
      ],
    },
    {
      title: "Contato",
      links: [
        { label: "WhatsApp", href: whatsapp("Rodapé") },
        { label: "Instagram", href: "#" }, // {{PREENCHER}}
        { label: "E-mail", href: "#" }, // {{PREENCHER}}
      ],
    },
  ],
  legal: "© 2026 Alpha Assessoria. Todos os direitos reservados.",
};
