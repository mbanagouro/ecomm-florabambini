// components.jsx — Header, Footer, ProductCard, Placeholder, CartDrawer

const { useState, useEffect, useRef, useMemo } = React;

// Placeholder elegante para produto
function Placeholder({ p, withCap = true, className = "" }) {
  return (
    <div className={`ph tone-${p.tone} ${className}`}>
      {withCap && <div className="cap">{p.cap}</div>}
      <div className="ph-meta">
        <div className="ph-kind">{p.vol}</div>
        <div className="ph-name">{p.name}</div>
      </div>
    </div>
  );
}

function ProductCard({ p, onOpen, onAdd }) {
  return (
    <div className="pcard">
      <a onClick={() => onOpen(p)} style={{ display: "block", cursor: "default" }}>
        <Placeholder p={p} />
        <div className="quick">
          <button className="quick-btn" onClick={(e) => { e.stopPropagation(); onAdd(p); }}>
            {window.FB.ICONS.plus}<span>Adicionar — {p.priceLabel}</span>
          </button>
        </div>
      </a>
      <div className="pmeta">
        <div>
          <span className="pcat">{p.sub} · {p.cat === "bambini" ? "Bambini" : "Donna"}</span>
          <div className="ptitle">{p.name}</div>
        </div>
        <div className="pprice">{p.priceLabel}</div>
      </div>
    </div>
  );
}

function Header({ cartCount, onOpenCart, page, onNavigate }) {
  const links = [
    { id: "home", label: "Início" },
    { id: "bambini", label: "Bambini" },
    { id: "donna", label: "Donna" },
    { id: "ingredientes", label: "Ingredientes" },
    { id: "diario", label: "Diário" },
  ];
  return (
    <header className="hdr">
      <div className="announce">
        <span>Frete grátis acima de R$ 240</span>
        <span>Devolução de embalagens · 30% de volta</span>
        <span>Envio em 24h</span>
      </div>
      <div className="wrap hdr-row">
        <nav>
          {links.slice(0, 3).map(l => (
            <a key={l.id}
               className={page === l.id ? "active" : ""}
               onClick={() => onNavigate(l.id)}>{l.label}</a>
          ))}
        </nav>
        <a onClick={() => onNavigate("home")}>
          <window.FB.LogoMark />
        </a>
        <div className="hdr-tools">
          {links.slice(3).map(l => (
            <a key={l.id} style={{ fontSize: 13.5, color: "var(--ink-soft)", marginRight: 12 }}
               onClick={() => onNavigate(l.id)}>{l.label}</a>
          ))}
          <button className="hdr-tool-btn" aria-label="Buscar">{window.FB.ICONS.search}</button>
          <button className="hdr-tool-btn" aria-label="Conta">{window.FB.ICONS.user}</button>
          <button className="hdr-tool-btn" aria-label="Carrinho" onClick={onOpenCart}>
            {window.FB.ICONS.cart}
            {cartCount > 0 && <span className="cart-dot">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.2fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ color: "rgba(250,247,239,.95)" }}>
              <window.FB.LogoMark />
            </div>
            <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.65, color: "rgba(250,247,239,.7)", maxWidth: 280 }}>
              Cuidados naturais cultivados em Cunha, no interior de São Paulo, para a família que respeita a própria pele.
            </p>
          </div>
          <div>
            <h4>Loja</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5 }}>
              <li><a onClick={() => onNavigate("bambini")}>Linha Bambini</a></li>
              <li><a onClick={() => onNavigate("donna")}>Linha Donna</a></li>
              <li><a>Kits</a></li>
              <li><a>Refis</a></li>
              <li><a>Cartão presente</a></li>
            </ul>
          </div>
          <div>
            <h4>Marca</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5 }}>
              <li><a>Nossa horta</a></li>
              <li><a>Ingredientes</a></li>
              <li><a>Compromissos</a></li>
              <li><a>Diário</a></li>
              <li><a>Parcerias</a></li>
            </ul>
          </div>
          <div>
            <h4>Ajuda</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5 }}>
              <li><a>Trocas e devoluções</a></li>
              <li><a>Frete e entrega</a></li>
              <li><a>Devolução de embalagens</a></li>
              <li><a>Contato</a></li>
              <li><a>FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Cartas de Flora</h4>
            <p style={{ fontSize: 13.5, color: "rgba(250,247,239,.7)", lineHeight: 1.6, marginTop: 0 }}>
              Uma carta por mês com rituais, receitas e novidades da horta.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <input className="field" placeholder="seu e-mail" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", color: "var(--bg-paper)", height: 44 }} />
              <button className="btn" style={{ background: "var(--bg-paper)", color: "var(--sage-darker)" }}>Assinar</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid rgba(250,247,239,.14)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(250,247,239,.55)" }}>
          <div>© 2026 Flora Bambini & Donna · CNPJ 00.000.000/0001-00 · Cunha, SP</div>
          <div style={{ display: "flex", gap: 18 }}>
            <a>Termos</a><a>Privacidade</a><a>Cookies</a><a>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────── CART DRAWER ───────────
function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const subtotal = items.reduce((acc, it) => acc + it.qty * it.price, 0);
  const freeShipDelta = Math.max(0, 240 - subtotal);
  const progress = Math.min(100, (subtotal / 240) * 100);

  return (
    <>
      <div className={`drawer-mask ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-h">
          <div>
            <div className="eyebrow" style={{ fontSize: 10 }}>Sua cesta</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4 }}>
              {items.length === 0 ? "Vazia, por enquanto" : `${items.length} ${items.length === 1 ? "item" : "itens"}`}
            </div>
          </div>
          <button className="hdr-tool-btn" onClick={onClose}>{window.FB.ICONS.close}</button>
        </div>

        {items.length > 0 && (
          <div style={{ padding: "12px 28px 0" }}>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 8 }}>
              {freeShipDelta > 0
                ? <>Faltam <b style={{ color: "var(--ink)" }}>R$ {freeShipDelta}</b> para frete grátis</>
                : <>🌿 Você ganhou frete grátis</>
              }
            </div>
            <div style={{ height: 4, background: "var(--line-soft)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--sage-deep)", transition: "width .4s ease" }}></div>
            </div>
          </div>
        )}

        <div className="drawer-items">
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--ink-soft)" }}>
              <window.FB.Sprig size={64} color="var(--sage)" style={{ margin: "0 auto", opacity: .7 }} />
              <p style={{ marginTop: 16, fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)" }}>Nada por aqui — ainda.</p>
              <p style={{ marginTop: 4, fontSize: 13 }}>Os rituais da Flora esperam você lá fora.</p>
              <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={onClose}>Voltar à loja</button>
            </div>
          ) : items.map((it) => (
            <div className="cart-row" key={it.id}>
              <Placeholder p={it} withCap={false} className="ph-mini" />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 2 }}>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 17, lineHeight: 1.15 }}>{it.name}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-muted)", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 4 }}>{it.vol} · {it.cat === "bambini" ? "Bambini" : "Donna"}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="qty">
                    <button onClick={() => onQty(it.id, -1)}>−</button>
                    <div className="qval">{it.qty}</div>
                    <button onClick={() => onQty(it.id, +1)}>+</button>
                  </div>
                  <button onClick={() => onRemove(it.id)} style={{ background: "none", border: 0, color: "var(--ink-muted)", fontSize: 11, textDecoration: "underline", textUnderlineOffset: 3 }}>remover</button>
                </div>
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 18, whiteSpace: "nowrap" }}>R$ {it.price * it.qty}</div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="spread" style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--display)", fontSize: 26 }}>R$ {subtotal}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
              Finalizar — R$ {subtotal} {window.FB.ICONS.arrow}
            </button>
            <p style={{ fontSize: 11.5, color: "var(--ink-muted)", textAlign: "center", marginTop: 12, marginBottom: 0 }}>
              Frete calculado na próxima etapa · Pix com 5% off
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

// Used as small placeholders in cart
const phMiniStyle = `
  .ph-mini { aspect-ratio: 1/1; padding: 0; border-radius: 8px; }
  .ph-mini::before { background: repeating-linear-gradient(135deg, transparent 0, transparent 10px, rgba(255,255,255,.18) 10px, rgba(255,255,255,.18) 11px); }
  .ph-mini .ph-meta { display: none; }
  .ph-mini .cap { width: 22px; height: 22px; font-size: 8px; top: 6px; right: 6px; }
`;
if (typeof document !== "undefined" && !document.getElementById("ph-mini-style")) {
  const s = document.createElement("style"); s.id = "ph-mini-style"; s.textContent = phMiniStyle; document.head.appendChild(s);
}

Object.assign(window, { Placeholder, ProductCard, Header, Footer, CartDrawer });
