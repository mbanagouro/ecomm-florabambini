// app.jsx — root app with routing + cart state + tweaks

const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "salvia",
  "tone": "poetic"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useStateA("home");        // home | bambini | donna | product | ingredientes | diario
  const [openProduct, setOpenProduct] = useStateA(null);
  const [cartOpen, setCartOpen] = useStateA(false);
  const [cart, setCart] = useStateA([]);

  // Apply palette tweak
  useEffectA(() => {
    const p = window.FB.PALETTES[t.palette] || window.FB.PALETTES.salvia;
    const root = document.documentElement;
    root.style.setProperty("--sage", p.sage);
    root.style.setProperty("--sage-deep", p.sageDeep);
    root.style.setProperty("--sage-darker", p.sageDarker);
    root.style.setProperty("--sage-pale", p.sagePale);
    root.style.setProperty("--sage-mist", p.sageMist);
  }, [t.palette]);

  // Cart
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(it => it.id === product.id);
      if (found) {
        return prev.map(it => it.id === product.id ? { ...it, qty: it.qty + qty } : it);
      }
      return [...prev, { ...product, qty }];
    });
    setCartOpen(true);
  };
  const onQty = (id, delta) => {
    setCart(prev => prev.flatMap(it => {
      if (it.id !== id) return [it];
      const next = it.qty + delta;
      if (next <= 0) return [];
      return [{ ...it, qty: next }];
    }));
  };
  const onRemove = (id) => setCart(prev => prev.filter(it => it.id !== id));

  const cartCount = cart.reduce((acc, it) => acc + it.qty, 0);

  const navigate = (id) => {
    setOpenProduct(null);
    setPage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openProductPage = (p) => {
    setOpenProduct(p);
    setPage("product");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const copy = window.FB.COPY[t.tone] || window.FB.COPY.poetic;

  return (
    <>
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        page={page}
        onNavigate={navigate}
      />

      {page === "home" && (
        <Home copy={copy} onOpenProduct={openProductPage} onAdd={addToCart} onNavigate={navigate} />
      )}
      {(page === "bambini" || page === "donna") && (
        <CategoryPage category={page} onOpenProduct={openProductPage} onAdd={addToCart} onNavigate={navigate} />
      )}
      {page === "product" && openProduct && (
        <ProductPage product={openProduct} onAdd={addToCart} onNavigate={navigate} onOpenProduct={openProductPage} />
      )}
      {page === "ingredientes" && <SimplePage title="Ingredientes" />}
      {page === "diario" && <SimplePage title="Diário" />}

      <Footer onNavigate={navigate} />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={onQty}
        onRemove={onRemove}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Aparência" />
        <TweakRadio
          label="Paleta"
          value={t.palette}
          options={["salvia", "oliva", "eucalipto", "musgo"]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakSection label="Tom da copy" />
        <TweakRadio
          label="Voz"
          value={t.tone}
          options={["poetic", "direct"]}
          onChange={(v) => setTweak("tone", v)}
        />
        <p style={{ fontSize: 11, color: "rgba(41,38,27,.55)", margin: "4px 0 0", lineHeight: 1.5 }}>
          Poetic → linguagem evocativa<br/>
          Direct → linguagem comercial
        </p>
      </TweaksPanel>
    </>
  );
}

function SimplePage({ title }) {
  return (
    <div className="page" style={{ padding: "120px 0", minHeight: "60vh" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="eyebrow">Em breve</div>
        <h1 className="display" style={{ fontSize: 80, marginTop: 16 }}>
          <em style={{ color: "var(--sage-deep)" }}>{title}</em>
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, color: "var(--ink-soft)" }}>
          Esta página está em produção. Por enquanto, dê uma volta pelas linhas Bambini e Donna.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
