// pages.jsx — Category listing + Product detail page

const { useState: useStateP, useMemo: useMemoP } = React;

function CategoryPage({ category, onOpenProduct, onAdd, onNavigate }) {
  const [sub, setSub] = useStateP("todos");
  const all = window.FB.PRODUCTS.filter(p => p.cat === category);
  const subs = useMemoP(() => ["todos", ...Array.from(new Set(all.map(p => p.sub)))], [category]);
  const shown = sub === "todos" ? all : all.filter(p => p.sub === sub);

  const meta = category === "bambini"
    ? {
        eyebrow: "Linha Bambini",
        title: <>Cuidados para os <em style={{ color: "var(--sage-deep)" }}>pequeninos</em>.</>,
        body: "Da hora do banho ao protetor solar do parque, todos os rituais para a primeira década. Fórmulas testadas dermatológica e pediatricamente. Seguras de 0 meses em diante.",
        bg: "var(--bambini-pale)",
      }
    : {
        eyebrow: "Linha Donna",
        title: <>Para quem cuida de <em style={{ color: "var(--sage-deep)" }}>todo mundo</em>.</>,
        body: "Skincare para gestação, pós-parto e o restinho de tempo que sobra. Fórmulas compatíveis com a amamentação e com a fase em que você está.",
        bg: "var(--donna-pale)",
      };

  return (
    <div className="page">
      {/* Category banner */}
      <section style={{ background: meta.bg, padding: "72px 0 88px", position: "relative", overflow: "hidden" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
            <div>
              <div className="eyebrow">{meta.eyebrow}</div>
              <h1 className="display" style={{ fontSize: "clamp(64px, 8vw, 112px)", lineHeight: 1.08, marginTop: 20, maxWidth: 14 + "ch" }}>
                {meta.title}
              </h1>
              <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: 540 }}>{meta.body}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
              <div style={{ color: category === "bambini" ? "#9a8a4f" : "#8a5a4a", opacity: .5 }}>
                <window.FB.Sprig size={180} color="currentColor" />
              </div>
              <div style={{ display: "flex", gap: 24, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                <span>{all.length} produtos</span>
                <span>·</span>
                <span>{subs.length - 1} categorias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section style={{ padding: "32px 0", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {subs.map(s => (
              <button key={s}
                onClick={() => setSub(s)}
                className={"chip"}
                style={{
                  cursor: "default",
                  background: sub === s ? "var(--sage-deep)" : "rgba(255,255,255,.6)",
                  color: sub === s ? "var(--bg-paper)" : "var(--ink-soft)",
                  borderColor: sub === s ? "var(--sage-deep)" : "var(--line)",
                  padding: "8px 16px",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}>
                {s === "todos" ? "Todos" : s}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            Ordenar — Mais amados ↓
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, rowGap: 64 }}>
            {shown.map(p => <ProductCard key={p.id} p={p} onOpen={onOpenProduct} onAdd={onAdd} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────── PRODUCT DETAIL ───────────
function ProductPage({ product, onAdd, onNavigate, onOpenProduct }) {
  const [qty, setQty] = useStateP(1);
  const [variant, setVariant] = useStateP(0);
  const [tab, setTab] = useStateP("descricao");
  const [added, setAdded] = useStateP(false);

  const variants = useMemoP(() => ([
    { label: product.vol, mult: 1 },
    { label: product.cat === "bambini" ? "Refil 500ml" : "Refil 200ml", mult: 1.8 },
  ]), [product]);

  const variantPrice = Math.round(product.price * variants[variant].mult);
  const PRODUCTS = window.FB.PRODUCTS;
  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  const onAddClick = () => {
    onAdd({ ...product, vol: variants[variant].label, price: variantPrice, priceLabel: `R$ ${variantPrice}` }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div className="wrap" style={{ paddingTop: 28, paddingBottom: 12, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
        <a onClick={() => onNavigate("home")}>Início</a>
        <span style={{ margin: "0 10px" }}>/</span>
        <a onClick={() => onNavigate(product.cat)}>{product.cat === "bambini" ? "Bambini" : "Donna"}</a>
        <span style={{ margin: "0 10px" }}>/</span>
        <span style={{ color: "var(--ink-soft)" }}>{product.sub}</span>
      </div>

      <section style={{ padding: "32px 0 80px" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "auto 1.1fr .9fr", gap: 32, alignItems: "start" }}>
          {/* Thumbs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 72 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 72, height: 90, borderRadius: 10, border: i === 0 ? "1.5px solid var(--sage-deep)" : "1px solid var(--line)", overflow: "hidden", padding: 6, background: "var(--bg-paper)", display: "grid", placeItems: "center" }}>
                <Placeholder p={{...product, cap: ""}} withCap={false} className="ph-thumb" />
              </div>
            ))}
          </div>

          {/* Main image */}
          <div style={{ position: "relative" }}>
            <Placeholder p={product} />
            <div style={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: 8 }}>
              <span className="chip" style={{ background: "var(--bg-paper)" }}>0 meses+</span>
              <span className="chip" style={{ background: "var(--bg-paper)" }}>Dermatologicamente testado</span>
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ paddingLeft: 16 }}>
            <div className="eyebrow">{product.sub} · {product.cat === "bambini" ? "Bambini" : "Donna"}</div>
            <h1 className="display" style={{ fontSize: 48, marginTop: 16, lineHeight: 1.1 }}>{product.name}</h1>
            <p style={{ marginTop: 18, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>{product.desc}</p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28 }}>
              <span className="display" style={{ fontSize: 38 }}>R$ {variantPrice}</span>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>ou 3× de R$ {Math.round(variantPrice/3)} sem juros</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <div className="label-mini" style={{ color: "var(--ink-soft)", marginBottom: 10 }}>Tamanho</div>
              <div style={{ display: "flex", gap: 10 }}>
                {variants.map((v, i) => (
                  <button key={i}
                    onClick={() => setVariant(i)}
                    style={{
                      padding: "12px 18px",
                      border: variant === i ? "1.5px solid var(--sage-deep)" : "1px solid var(--line)",
                      background: variant === i ? "var(--sage-mist)" : "var(--bg-paper)",
                      borderRadius: "var(--r-md)",
                      fontFamily: "var(--body)",
                      fontSize: 13,
                      color: "var(--ink)",
                      textAlign: "left",
                      minWidth: 120,
                    }}>
                    <div style={{ fontWeight: 500 }}>{v.label}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>R$ {Math.round(product.price * v.mult)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "stretch" }}>
              <div className="qty" style={{ height: 52, borderRadius: 999, borderColor: "var(--ink)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, fontSize: 18 }}>−</button>
                <div className="qval" style={{ fontSize: 15, minWidth: 28 }}>{qty}</div>
                <button onClick={() => setQty(qty + 1)} style={{ width: 44, fontSize: 18 }}>+</button>
              </div>
              <button onClick={onAddClick} className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }}>
                {added ? "✓ Adicionado à cesta" : `Adicionar — R$ ${variantPrice * qty}`}
              </button>
            </div>

            <div style={{ marginTop: 32, padding: 20, background: "var(--bg-paper)", borderRadius: "var(--r-lg)", border: "1px solid var(--line-soft)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ color: "var(--sage-deep)", marginTop: 2 }}>{window.FB.ICONS.leaf}</span>
                <div><b style={{ color: "var(--ink)" }}>Em estoque</b> · envio em até 24h</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ color: "var(--sage-deep)", marginTop: 2 }}>{window.FB.ICONS.drop}</span>
                <div><b style={{ color: "var(--ink)" }}>Frete grátis</b> em pedidos acima de R$ 240</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ color: "var(--sage-deep)", marginTop: 2 }}>{window.FB.ICONS.heart}</span>
                <div><b style={{ color: "var(--ink)" }}>Devolva a embalagem</b> e recupere 30% do valor em crédito</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ background: "var(--bg-paper)", padding: "72px 0", borderTop: "1px solid var(--line-soft)" }}>
        <div className="wrap">
          <div style={{ display: "flex", gap: 32, borderBottom: "1px solid var(--line)", marginBottom: 48 }}>
            {[
              { id: "descricao", label: "Descrição" },
              { id: "ingredientes", label: "Ingredientes" },
              { id: "modo",        label: "Como usar" },
              { id: "avaliacoes",  label: "Avaliações · 124" },
            ].map(t => (
              <button key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  background: "none",
                  border: 0,
                  borderBottom: tab === t.id ? "2px solid var(--sage-deep)" : "2px solid transparent",
                  color: tab === t.id ? "var(--ink)" : "var(--ink-muted)",
                  padding: "16px 0",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  marginBottom: -1,
                }}>{t.label}</button>
            ))}
          </div>

          {tab === "descricao" && (
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
              <div>
                <p className="display" style={{ fontSize: 28, lineHeight: 1.3, color: "var(--ink)" }}>
                  {product.desc} {product.cat === "bambini" ? "Pensado para o ritual entre o banho e o sono." : "Pensado para o momento em que a casa silencia."}
                </p>
                <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)" }}>
                  Cada lote é produzido em pequena escala na nossa cozinha de fórmulas em Cunha-SP, com matéria-prima orgânica certificada e controle dermatológico em cada bateladas. Aprovado por pediatras e dermatologistas.
                </p>
              </div>
              <div style={{ background: "var(--sage-mist)", borderRadius: "var(--r-lg)", padding: 28 }}>
                <div className="label-mini" style={{ color: "var(--sage-darker)" }}>Indicado para</div>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 16, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--display)", fontSize: 19 }}>
                  <li>· Pele {product.cat === "bambini" ? "delicada de bebês e crianças" : "ressecada e madura"}</li>
                  <li>· Uso diário</li>
                  <li>· {product.cat === "bambini" ? "0 meses em diante" : "Compatível com gestação e amamentação"}</li>
                  <li>· Veganos e cruelty-free</li>
                </ul>
              </div>
            </div>
          )}

          {tab === "ingredientes" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
              <div>
                <h3 className="display" style={{ fontSize: 28, marginBottom: 20 }}>Os principais</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {product.ingredients.map((ing, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--line-soft)" }}>
                      <div style={{ fontFamily: "var(--display)", fontSize: 20 }}>{ing}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-muted)", alignSelf: "center" }}>orgânico</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "var(--bg-warm)", borderRadius: "var(--r-lg)", padding: 32 }}>
                <h3 className="display" style={{ fontSize: 24, marginBottom: 16 }}>O que <em>não</em> tem</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14, color: "var(--ink-soft)" }}>
                  {["Parabenos", "Sulfatos", "Petrolatos", "Fragrâncias sintéticas", "Corantes", "Álcool denat", "Silicones", "Microplásticos"].map(n => (
                    <div key={n}>× {n}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "modo" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { n: "01", title: "Aplique uma porção pequena", body: "Comece com uma quantidade do tamanho de uma amêndoa. Um pouco rende bastante." },
                { n: "02", title: "Massageie em movimentos suaves", body: "Distribua de baixo para cima até a absorção completa. Aproveite o ritual." },
                { n: "03", title: product.cat === "bambini" ? "Use após o banho" : "Use de manhã e à noite", body: product.cat === "bambini" ? "Idealmente com a pele ainda úmida para potencializar a hidratação." : "Pele limpa, antes do hidratante. Resultados visíveis em 4 semanas." },
              ].map(s => (
                <div key={s.n} style={{ padding: 24, background: "var(--bg-warm)", borderRadius: "var(--r-lg)" }}>
                  <div className="display" style={{ fontSize: 40, color: "var(--sage-deep)" }}>{s.n}</div>
                  <div className="display" style={{ fontSize: 22, marginTop: 8 }}>{s.title}</div>
                  <p style={{ marginTop: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>{s.body}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "avaliacoes" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60 }}>
              <div>
                <div className="display" style={{ fontSize: 72, lineHeight: 1 }}>4.9</div>
                <div style={{ fontSize: 16, color: "var(--sage-deep)", marginTop: 4 }}>★★★★★</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 8 }}>baseado em 124 avaliações</div>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[5,4,3,2,1].map(n => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--ink-soft)" }}>
                      <span style={{ width: 14 }}>{n}★</span>
                      <div style={{ flex: 1, height: 4, background: "var(--line-soft)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${[92, 70, 22, 8, 4][5-n]}%`, background: "var(--sage-deep)" }}></div>
                      </div>
                      <span style={{ width: 28, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{[114, 7, 2, 1, 0][5-n]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {window.FB.TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ padding: 24, background: "var(--bg-warm)", borderRadius: "var(--r-lg)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div className="label-mini" style={{ color: "var(--ink-soft)" }}>{t.who}</div>
                      <div style={{ color: "var(--sage-deep)", fontSize: 13 }}>★★★★★</div>
                    </div>
                    <p style={{ marginTop: 12, fontFamily: "var(--display)", fontSize: 19, lineHeight: 1.35, color: "var(--ink)" }}>{t.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <h3 className="display" style={{ fontSize: 42 }}>Combina com</h3>
            <button className="btn btn-ghost">Ver linha {product.cat === "bambini" ? "Bambini" : "Donna"} {window.FB.ICONS.arrow}</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
            {related.map(p => <ProductCard key={p.id} p={p} onOpen={onOpenProduct} onAdd={(prod) => onAdd(prod, 1)} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CategoryPage, ProductPage });
