// data.jsx — produtos, valores, depoimentos, copy

const ICONS = {
  cart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 6h2l2.5 11.5a1.5 1.5 0 0 0 1.5 1.2h8a1.5 1.5 0 0 0 1.5-1.2L21 9H6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20.5" r="1"/>
      <circle cx="17" cy="20.5" r="1"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6"/>
      <path d="m20 20-4.5-4.5" strokeLinecap="round"/>
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="9" r="3.5"/>
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" strokeLinecap="round"/>
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round"/>
    </svg>
  ),
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  leaf: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 21c0-6 0-10 5-13M5 8c0 6 3 11 7 13M5 8c4-1 7-2 12-5" strokeLinecap="round"/>
    </svg>
  ),
  drop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 3c-3 5-6 8-6 12a6 6 0 0 0 12 0c0-4-3-7-6-12Z" strokeLinejoin="round"/>
    </svg>
  ),
  sun: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" strokeLinecap="round"/>
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 19s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 9c0 5.5-7 10-7 10Z" strokeLinejoin="round"/>
    </svg>
  ),
};

// Logo mark — flower above wordmark, evocando a logo da Flora Bambini
function LogoMark({ small = false }) {
  return (
    <div className="logo-mark" style={{ transform: small ? "scale(.78)" : undefined, transformOrigin: "center" }}>
      <svg className="lm-icon" width="48" height="46" viewBox="0 0 36 34" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M18 10c-2-2-5-2-6 0-1 2 1 4 3 4M18 10c2-2 5-2 6 0 1 2-1 4-3 4M18 10v4M15 14c0 2 1.4 3 3 3s3-1 3-3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 17v12M14 22c2 1 4 1 4 0M22 26c-2 1-4 1-4 0" strokeLinecap="round"/>
      </svg>
      <div className="lm-name">FLORA BAMBINI</div>
      <div className="lm-sub">&amp; donna</div>
    </div>
  );
}

// Botanical decoration — soft sprig SVG used as accent
function Sprig({ size = 80, color = "var(--sage)", style }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none" stroke={color} strokeWidth="1.1" style={style}>
      <path d="M40 110V18" strokeLinecap="round"/>
      <path d="M40 30c-8-2-14-6-16-14M40 30c0-6 3-12 9-16M40 50c-9-1-16-6-18-14M40 50c1-7 5-12 12-15M40 70c-9-1-16-6-18-13M40 70c1-7 5-12 12-15" strokeLinecap="round"/>
      <ellipse cx="40" cy="14" rx="5" ry="8" transform="rotate(-15 40 14)" fill="rgba(255,255,255,0.08)"/>
    </svg>
  );
}

// ─────────── PRODUCT DATA ───────────
const PRODUCTS = [
  // BAMBINI
  { id: "p1", cat: "bambini", sub: "Cabelo", name: "Shampoo Suave de Camomila", priceLabel: "R$ 68", price: 68, vol: "200ml", tone: "sage", cap: "01", desc: "Limpa sem ressecar. Espuma cremosa que escorre sem arder nos olhos.", ingredients: ["Camomila orgânica", "Aloe vera", "Glicerina vegetal", "Óleo de coco"] },
  { id: "p2", cat: "bambini", sub: "Banho", name: "Sabonete Líquido Lavanda", priceLabel: "R$ 56", price: 56, vol: "250ml", tone: "mist", cap: "02", desc: "Banho calmante para a hora do sono. Toque sedoso, aroma sereno.", ingredients: ["Lavanda francesa", "Manteiga de karité", "Avena coloidal"] },
  { id: "p3", cat: "bambini", sub: "Corpo", name: "Creme para Assaduras", priceLabel: "R$ 72", price: 72, vol: "90g", tone: "cream", cap: "03", desc: "Barreira protetora com calêndula. Acalma vermelhidão em minutos.", ingredients: ["Calêndula", "Óxido de zinco", "Cera de abelha", "Camomila"] },
  { id: "p4", cat: "bambini", sub: "Corpo", name: "Loção Calêndula", priceLabel: "R$ 64", price: 64, vol: "200ml", tone: "bambini", cap: "04", desc: "Hidratação diária leve. Pele macia, sem oleosidade.", ingredients: ["Calêndula", "Óleo de girassol", "Pantenol"] },
  { id: "p5", cat: "bambini", sub: "Corpo", name: "Óleo de Massagem Bebê", priceLabel: "R$ 88", price: 88, vol: "100ml", tone: "cream", cap: "05", desc: "Toque suave para o ritual da noite. Aroma de algodão e baunilha.", ingredients: ["Óleo de amêndoas doces", "Vitamina E", "Camomila"] },
  { id: "p6", cat: "bambini", sub: "Sol", name: "Protetor Solar Mineral", priceLabel: "R$ 124", price: 124, vol: "60ml", tone: "stone", cap: "FPS50", desc: "Mineral, hipoalergênico, à prova d'água. Sem cheiro, sem manchas.", ingredients: ["Óxido de zinco", "Dióxido de titânio", "Manteiga de karité"] },
  { id: "p7", cat: "bambini", sub: "Higiene", name: "Pasta Dental Morango", priceLabel: "R$ 38", price: 38, vol: "60g", tone: "donna", cap: "06", desc: "Sem flúor. Sabor sutil que torna escovar uma brincadeira.", ingredients: ["Xilitol", "Carbonato de cálcio", "Óleo de morango"] },
  { id: "p8", cat: "bambini", sub: "Aromas", name: "Repelente Citronela", priceLabel: "R$ 52", price: 52, vol: "100ml", tone: "sage", cap: "07", desc: "Proteção vegetal por até 4 horas. Aroma cítrico fresco.", ingredients: ["Citronela", "Andiroba", "Hortelã-pimenta"] },

  // DONNA
  { id: "d1", cat: "donna", sub: "Face", name: "Sérum Rosa Mosqueta", priceLabel: "R$ 168", price: 168, vol: "30ml", tone: "donna", cap: "01", desc: "Concentrado de regeneração noturna. Pele acordada e iluminada.", ingredients: ["Rosa mosqueta orgânica", "Vitamina C estável", "Bakuchiol"] },
  { id: "d2", cat: "donna", sub: "Face", name: "Creme Anti-Olheiras", priceLabel: "R$ 142", price: 142, vol: "15ml", tone: "mist", cap: "02", desc: "Para as noites curtas. Reduz inchaço e descansa o olhar.", ingredients: ["Cafeína", "Niacinamida", "Ácido hialurônico", "Centella"] },
  { id: "d3", cat: "donna", sub: "Corpo", name: "Óleo para Estrias", priceLabel: "R$ 96", price: 96, vol: "150ml", tone: "cream", cap: "03", desc: "Elasticidade e nutrição profunda durante e depois da gestação.", ingredients: ["Rosa mosqueta", "Óleo de amêndoas", "Vitamina E", "Calêndula"] },
  { id: "d4", cat: "donna", sub: "Face", name: "Tônico Hamamelis", priceLabel: "R$ 74", price: 74, vol: "200ml", tone: "sage", cap: "04", desc: "Equilibra e prepara a pele. Aroma fresco de floresta orvalhada.", ingredients: ["Hamamélis", "Chá verde", "Pantenol"] },
  { id: "d5", cat: "donna", sub: "Corpo", name: "Desodorante Roll-on", priceLabel: "R$ 58", price: 58, vol: "60ml", tone: "stone", cap: "05", desc: "Sem alumínio, sem álcool. Proteção que respeita a amamentação.", ingredients: ["Bicarbonato suave", "Óleo de coco", "Sálvia"] },
  { id: "d6", cat: "donna", sub: "Corpo", name: "Manteiga de Cacau", priceLabel: "R$ 112", price: 112, vol: "200g", tone: "clay", cap: "06", desc: "Hidratação intensa para pele seca e barriga em mudança.", ingredients: ["Manteiga de cacau crua", "Manteiga de karité", "Vitamina E"] },
  { id: "d7", cat: "donna", sub: "Face", name: "Esfoliante Açúcar", priceLabel: "R$ 84", price: 84, vol: "150g", tone: "bambini", cap: "07", desc: "Renovação semanal com grãos finos de cana e mel.", ingredients: ["Açúcar mascavo", "Mel orgânico", "Óleo de jojoba"] },
  { id: "d8", cat: "donna", sub: "Cabelo", name: "Máscara de Argila", priceLabel: "R$ 98", price: 98, vol: "250g", tone: "deep", cap: "08", desc: "Detox capilar mensal. Devolve brilho e leveza aos fios.", ingredients: ["Argila branca", "Óleo de argan", "Babosa"] },
];

const BEST_SELLERS_IDS = ["d1", "p3", "p6", "d3", "p1", "d5"];
const NEW_ARRIVALS_IDS = ["d8", "p8", "d7", "p5"];

const VALUES = [
  { icon: ICONS.leaf, title: "Cultivado, não inventado", body: "Cada fórmula começa numa horta orgânica do interior. Sem petroquímicos, sem siliconados, sem promessas vazias." },
  { icon: ICONS.drop, title: "Testado em mães, nunca em animais", body: "Quem prova primeiro são as próprias famílias que cuidam dos cultivos. Cruelty-free certificado." },
  { icon: ICONS.sun,  title: "Para a casa toda", body: "O que é seguro para um bebê de três meses também faz bem para a mãe, o pai, a avó. Uma família, uma prateleira." },
  { icon: ICONS.heart, title: "Embalagens que voltam", body: "Vidro âmbar e refis em alumínio reciclado. Devolvemos 30% do valor a cada embalagem que volta." },
];

const TESTIMONIALS = [
  { who: "Beatriz, mãe da Olívia (1 ano)", quote: "A Olívia tinha dermatite atópica e a gente já tinha tentado de tudo. Em três semanas com o creme de calêndula, a pele dela mudou. Voltei a respirar." },
  { who: "Marina, mãe do Théo (3 anos)", quote: "Cheguei pela linha bambini e fiquei pela donna. O sérum de rosa mosqueta virou minha religião." },
  { who: "Rafaela, mãe de gêmeos", quote: "Pela primeira vez sinto que estou cuidando deles sem culpa. As fórmulas são limpas e o cheiro é uma memória que eu não tinha." },
];

const INGREDIENTS = [
  { name: "Calêndula", note: "Acalma, regenera" },
  { name: "Camomila", note: "Reduz vermelhidão" },
  { name: "Rosa Mosqueta", note: "Regenera, ilumina" },
  { name: "Karité", note: "Hidrata profundamente" },
  { name: "Lavanda", note: "Sereniza, prepara o sono" },
  { name: "Hamamélis", note: "Equilibra, refresca" },
];

// Copy presets — controlled by tweak "tone"
const COPY = {
  poetic: {
    heroEyebrow: "Cultivado com cuidado · Linha 2026",
    heroTitle: ["Cuidado", "que floresce", "junto."],
    heroBody: "Desodorante, sabonete, sérum. Tudo o que toca a sua família começa na horta — e termina nas suas mãos como ele deveria sempre ter chegado: limpo, lento, e com nome de planta.",
    heroCta: "Conhecer os rituais",
    aboutEyebrow: "A história de Flora",
    aboutTitle: <>Uma horta <em>no interior</em>, uma casa cheia de filhos pequenos.</>,
    aboutBody: "Tudo começou quando a Júlia procurou um creme para a primeira filha e voltou pra casa de mãos vazias. Hoje, sete anos depois, Flora Bambini é uma horta em Cunha-SP e uma cozinha de fórmulas que cuida da pele de dezenas de milhares de famílias brasileiras.",
    catBambiniTag: "Para os pequenos",
    catBambiniTitle: <>Cuidado <em>delicado</em>.</>,
    catBambiniBody: "Da hora do banho ao protetor solar do parque. Fórmulas tão suaves que poderiam ser bebidas — embora a gente prefira que fiquem na pele.",
    catDonnaTag: "Para as mães",
    catDonnaTitle: <>Cinco minutos <em>só seus</em>.</>,
    catDonnaBody: "Pensados para o tempo que sobra, não para o que falta. Sérum, óleo, manteiga: cuidados que cabem no intervalo entre uma mamada e outra.",
    bestTitle: <>O que as mães <em>não deixam</em> acabar.</>,
    newTitle: <>Recém-chegados <em>do campo</em>.</>,
    testTitle: <>Cartas de <em>cabeceira</em>.</>,
  },
  direct: {
    heroEyebrow: "Coleção 2026 · Linha bambini & donna",
    heroTitle: ["Cuidados", "naturais", "para a família."],
    heroBody: "Sabonete, shampoo, creme, sérum. Todos com ingredientes orgânicos, sem parabenos, sem fragrâncias sintéticas. Seguros para bebês a partir de 0 meses e para a pele adulta.",
    heroCta: "Comprar agora",
    aboutEyebrow: "Sobre a Flora Bambini",
    aboutTitle: <>Fórmulas naturais, <em>desenvolvidas no Brasil</em>.</>,
    aboutBody: "Flora Bambini é uma marca brasileira de skincare natural para crianças e mães. Nossas fórmulas são desenvolvidas em parceria com farmacêuticas e dermatologistas, usando ingredientes orgânicos de produtores locais. Sete anos no mercado, dezenas de milhares de clientes.",
    catBambiniTag: "Linha Bambini",
    catBambiniTitle: <>Para crianças de <em>0 a 12 anos</em>.</>,
    catBambiniBody: "Higiene e cuidado diário com fórmulas testadas dermatologicamente. Sem corantes, sem álcool, sem fragrâncias sintéticas.",
    catDonnaTag: "Linha Donna",
    catDonnaTitle: <>Skincare <em>para mães</em>.</>,
    catDonnaBody: "Cuidados focados em fases — gestação, pós-parto, rotina. Produtos compatíveis com a amamentação.",
    bestTitle: <>Mais vendidos.</>,
    newTitle: <>Lançamentos.</>,
    testTitle: <>O que dizem as clientes.</>,
  },
};

// Palette presets
const PALETTES = {
  salvia: { sage: "#93a78c", sageDeep: "#5d7159", sageDarker: "#3d4a3a", sagePale: "#c8d2bf", sageMist: "#dde4d3" },
  oliva:  { sage: "#9a9d6e", sageDeep: "#65684a", sageDarker: "#3f4230", sagePale: "#cdcfae", sageMist: "#e2e3cd" },
  eucalipto: { sage: "#7fa893", sageDeep: "#4f7a66", sageDarker: "#2f4d42", sagePale: "#bfd6c9", sageMist: "#d4e4db" },
  musgo: { sage: "#7d8d6a", sageDeep: "#4a5a3a", sageDarker: "#2c3624", sagePale: "#bcc6a8", sageMist: "#d2d9c0" },
};

window.FB = { PRODUCTS, BEST_SELLERS_IDS, NEW_ARRIVALS_IDS, VALUES, TESTIMONIALS, INGREDIENTS, COPY, PALETTES, ICONS, LogoMark, Sprig };
