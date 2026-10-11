// home.jsx — Homepage sections

const { useState: useStateH } = React;

function Hero({ copy, onShop, featured }) {
  return (
    <section style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="fade-in">
            <div className="eyebrow" style={{ marginBottom: 24 }}>{copy.heroEyebrow}</div>
            <h1 className="display" style={{ fontSize: "clamp(64px, 7.5vw, 104px)", lineHeight: 1.08, letterSpacing: "-0.015em" }}>
              {copy.heroTitle.map((line, i) => {
                const isMid = i === 1;
                return (
                  <span key={i} style={{ display: "block" }}>
                    {isMid ? <em style={{ fontStyle: "italic", color: "var(--sage-deep)" }}>{line}</em> : line}
                  </span>
                );
              })}
            </h1>
            <p style={{ marginTop: 32, maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              {copy.heroBody}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <button className="btn btn-primary btn-lg" onClick={onShop}>{copy.heroCta} {window.FB.ICONS.arrow}</button>
              <button className="btn btn-ghost btn-lg">Conhecer a horta</button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--line)", color: "var(--ink-soft)" }}>
              <div>
                <div className="display" style={{ fontSize: 28, color: "var(--sage-deep)" }}>+38k</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>famílias atendidas</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 28, color: "var(--sage-deep)" }}>97%</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>ingredientes orgânicos</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 28, color: "var(--sage-deep)" }}>0</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>parabenos, sulfatos, animais testados</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -40, right: -40, opacity: .5, color: "var(--sage)" }}>
              <window.FB.Sprig size={140} />
            </div>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ paddingTop: 60 }}>
                <Placeholder p={featured[0]} />
                <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
                  <span className="label-mini" style={{ color: "var(--ink-soft)" }}>{featured[0].sub}</span>
                  <span className="label-mini" style={{ color: "var(--ink-soft)" }}>{featured[0].priceLabel}</span>
                </div>
              </div>
              <div>
                <Placeholder p={featured[1]} />
                <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
                  <span className="label-mini" style={{ color: "var(--ink-soft)" }}>{featured[1].sub}</span>
                  <span className="label-mini" style={{ color: "var(--ink-soft)" }}>{featured[1].priceLabel}</span>
                </div>
              </div>
            </div>

            {/* Floating tag */}
            <div style={{ position: "absolute", left: -32, bottom: 24, background: "var(--bg-paper)", padding: "14px 18px", borderRadius: 999, boxShadow: "var(--shadow-soft)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "var(--sage-deep)" }}></span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink)" }}>Colheita de Maio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories({ copy, onNavigate }) {
  return (
    <section className="section" style={{ background: "var(--bg-warm)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Bambini card */}
          <div
            onClick={() => onNavigate("bambini")}
            style={{ background: "var(--bambini-pale)", borderRadius: "var(--r-xl)", padding: "56px 48px", position: "relative", overflow: "hidden", minHeight: 460, display: "flex", flexDirection: "column", gap: 48 }}>
            <div style={{ position: "absolute", right: -30, top: -20, opacity: .4, color: "#9a8a4f" }}>
              <window.FB.Sprig size={180} />
            </div>
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "#7a6a3f" }}>{copy.catBambiniTag}</div>
              <h2 className="display" style={{ fontSize: 48, marginTop: 16, maxWidth: "14ch", lineHeight: 1.12 }}>
                {copy.catBambiniTitle}
              </h2>
              <p style={{ marginTop: 20, maxWidth: 360, color: "var(--ink-soft)", lineHeight: 1.6 }}>{copy.catBambiniBody}</p>
            </div>
            <div style={{ position: "relative", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <button className="btn btn-outline">Explorar Bambini {window.FB.ICONS.arrow}</button>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>0 — 12 anos</div>
            </div>
          </div>

          {/* Donna card */}
          <div
            onClick={() => onNavigate("donna")}
            style={{ background: "var(--donna-pale)", borderRadius: "var(--r-xl)", padding: "56px 48px", position: "relative", overflow: "hidden", minHeight: 460, display: "flex", flexDirection: "column", gap: 48 }}>
            <div style={{ position: "absolute", right: -30, top: -20, opacity: .35, color: "#8a5a4a" }}>
              <window.FB.Sprig size={180} />
            </div>
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "#8a5a4a" }}>{copy.catDonnaTag}</div>
              <h2 className="display" style={{ fontSize: 48, marginTop: 16, maxWidth: "14ch", lineHeight: 1.12 }}>
                {copy.catDonnaTitle}
              </h2>
              <p style={{ marginTop: 20, maxWidth: 360, color: "var(--ink-soft)", lineHeight: 1.6 }}>{copy.catDonnaBody}</p>
            </div>
            <div style={{ position: "relative", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <button className="btn btn-outline">Explorar Donna {window.FB.ICONS.arrow}</button>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Gestação · Pós · Rotina</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellers({ copy, products, onOpen, onAdd }) {
  const [filter, setFilter] = useStateH("todos");
  const shown = useMemo(() => {
    if (filter === "todos") return products;
    return products.filter(p => p.cat === filter);
  }, [filter, products]);

  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow">Best sellers · Maio</div>
            <h2 className="display" style={{ fontSize: 56, marginTop: 16, maxWidth: "16ch", lineHeight: 1.1 }}>
              {copy.bestTitle}
            </h2>
          </div>
          <div className="cat-tabs">
            <button className={filter === "todos" ? "on" : ""} onClick={() => setFilter("todos")}>Todos</button>
            <button className={filter === "bambini" ? "on" : ""} onClick={() => setFilter("bambini")}>Bambini</button>
            <button className={filter === "donna" ? "on" : ""} onClick={() => setFilter("donna")}>Donna</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, rowGap: 64 }}>
          {shown.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
}

function About({ copy }) {
  return (
    <section className="section grain about-section" style={{ background: "var(--sage-deep)", color: "var(--bg-paper)" }}>
      <style>{`.about-section em { color: var(--bambini-pale) !important; }`}</style>
      <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden", aspectRatio: "4/5", background: "#6c7e64", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(135deg, transparent 0, transparent 30px, rgba(255,255,255,.06) 30px, rgba(255,255,255,.06) 31px)" }}></div>
          <div style={{ position: "absolute", top: 32, right: 32, color: "rgba(255,255,255,.4)" }}>
            <window.FB.Sprig size={160} color="currentColor" />
          </div>
          <div style={{ position: "relative", color: "var(--bg-paper)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", opacity: .8 }}>Fotografia</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 24, marginTop: 6, opacity: .9 }}>Júlia colhendo calêndula · horta de Cunha</div>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ color: "rgba(250,247,239,.7)" }}>{copy.aboutEyebrow}</div>
          <h2 className="display" style={{ fontSize: 60, marginTop: 24, lineHeight: 1.14, color: "var(--bg-paper)", paddingBottom: "0.25em" }}>
            {copy.aboutTitle}
          </h2>
          <p style={{ marginTop: 28, maxWidth: 540, fontSize: 16, lineHeight: 1.7, color: "rgba(250,247,239,.82)" }}>{copy.aboutBody}</p>
          <button className="btn" style={{ marginTop: 32, background: "var(--bg-paper)", color: "var(--sage-darker)" }}>
            A história completa {window.FB.ICONS.arrow}
          </button>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section-sm" style={{ background: "var(--bg-paper)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {window.FB.VALUES.map((v, i) => (
            <div key={i}>
              <div style={{ color: "var(--sage-deep)", marginBottom: 16 }}>{v.icon}</div>
              <h3 className="display" style={{ fontSize: 22, lineHeight: 1.2 }}>{v.title}</h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  return (
    <section className="section">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="eyebrow">Ingredientes</div>
            <h2 className="display" style={{ fontSize: 56, marginTop: 16, lineHeight: 1.1 }}>
              O que vai na sua pele <em style={{ color: "var(--sage-deep)" }}>devia ter nome</em>.
            </h2>
            <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 400 }}>
              Cada um dos nossos ingredientes principais vem de produtores locais que conhecemos pelo primeiro nome. Sem nomes científicos escondidos: se você não consegue ler, não vai pra fórmula.
            </p>
            <button className="btn btn-outline" style={{ marginTop: 28 }}>Todos os ingredientes {window.FB.ICONS.arrow}</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {window.FB.INGREDIENTS.map((ing, i) => {
              const tones = ["sage", "mist", "donna", "bambini", "cream", "stone"];
              return (
                <div key={i} style={{ borderRadius: "var(--r-lg)", padding: 24, aspectRatio: "1/1", background: `var(--${tones[i]==="sage"?"sage-pale":tones[i]==="mist"?"sage-mist":tones[i]==="donna"?"donna-pale":tones[i]==="bambini"?"bambini-pale":tones[i]==="cream"?"bg-warm":"line-soft"})`, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", right: -10, top: -10, color: "rgba(60,60,40,.15)" }}>
                    <window.FB.Sprig size={100} color="currentColor" />
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-soft)", position: "relative" }}>0{i+1}</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ fontFamily: "var(--display)", fontSize: 26, lineHeight: 1.1, color: "var(--ink)" }}>{ing.name}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>{ing.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivals({ copy, products, onOpen, onAdd }) {
  return (
    <section className="section" style={{ background: "var(--bg-warm)" }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div className="eyebrow">Recém-chegados</div>
            <h2 className="display" style={{ fontSize: 56, marginTop: 16, lineHeight: 1.1 }}>
              {copy.newTitle}
            </h2>
          </div>
          <button className="btn btn-ghost">Ver todos {window.FB.ICONS.arrow}</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
          {products.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ copy }) {
  return (
    <section className="section">
      <div className="wrap-narrow" style={{ textAlign: "center" }}>
        <div className="eyebrow">Cartas de quem usa</div>
        <h2 className="display" style={{ fontSize: 56, marginTop: 16, lineHeight: 1.1 }}>
          {copy.testTitle}
        </h2>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {window.FB.TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ textAlign: "left", padding: 28, borderRadius: "var(--r-lg)", border: "1px solid var(--line)", background: "var(--bg-paper)" }}>
              <div style={{ color: "var(--sage-deep)", fontFamily: "var(--display)", fontSize: 40, lineHeight: 1, marginBottom: 4 }}>“</div>
              <p style={{ fontFamily: "var(--display)", fontSize: 20, lineHeight: 1.35, color: "var(--ink)", margin: 0 }}>{t.quote}</p>
              <div style={{ marginTop: 20, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>— {t.who}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="wrap-narrow" style={{ textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: -20, transform: "translateX(-50%)", color: "var(--sage)", opacity: .6 }}>
          <window.FB.Sprig size={70} />
        </div>
        <h2 className="display" style={{ fontSize: 80, lineHeight: 1.08, paddingTop: 80, paddingBottom: "0.05em" }}>
          Bem-vindas à <em style={{ color: "var(--sage-deep)" }}>cesta</em>.
        </h2>
        <p style={{ marginTop: 24, fontSize: 17, color: "var(--ink-soft)", maxWidth: 540, margin: "24px auto 0" }}>
          15% off na primeira compra · frete grátis acima de R$ 240 · embalagens que voltam.
        </p>
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 12 }}>
          <button className="btn btn-primary btn-lg">Ver a coleção {window.FB.ICONS.arrow}</button>
        </div>
      </div>
    </section>
  );
}

function Home({ copy, onOpenProduct, onAdd, onNavigate }) {
  const PRODUCTS = window.FB.PRODUCTS;
  const byId = (id) => PRODUCTS.find(p => p.id === id);
  const bestSellers = window.FB.BEST_SELLERS_IDS.map(byId);
  const newArrivals = window.FB.NEW_ARRIVALS_IDS.map(byId);
  const featured = [byId("d1"), byId("p1")];

  return (
    <div className="page">
      <Hero copy={copy} onShop={() => onNavigate("bambini")} featured={featured} />
      <Categories copy={copy} onNavigate={onNavigate} />
      <BestSellers copy={copy} products={bestSellers} onOpen={onOpenProduct} onAdd={onAdd} />
      <About copy={copy} />
      <Values />
      <Ingredients />
      <NewArrivals copy={copy} products={newArrivals} onOpen={onOpenProduct} onAdd={onAdd} />
      <Testimonials copy={copy} />
      <CTA />
    </div>
  );
}

Object.assign(window, { Home });
