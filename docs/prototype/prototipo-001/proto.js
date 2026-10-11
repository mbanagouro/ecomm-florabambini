// proto.js — navegação entre telas (UI-XX) e estados (.sufixo) do protótipo.
// Endereço: arquivo.html#UI-07.avisoImpacto
// Marcação: data-ui="UI-06 UI-07"  → bloco pertence a essas telas
//           data-when="a b"        → visível só nesses estados
//           data-unless="a b"      → oculto nesses estados
(function () {
  function parse() {
    var m = decodeURIComponent(location.hash.slice(1)).match(/^(UI-\d+)(?:\.(\w+))?$/);
    return m ? { screen: m[1], state: m[2] } : null;
  }
  function has(list, v) { return (list || "").split(/\s+/).indexOf(v) >= 0; }

  window.Proto = {
    init: function (screens, first, onChange) {
      var bar = document.createElement("div");
      bar.className = "proto-bar";
      bar.innerHTML =
        '<strong>Protótipo</strong>' +
        '<label>Tela <select data-p="screen"></select></label>' +
        '<label>Estado <select data-p="state"></select></label>' +
        '<code data-p="id"></code>';
      document.body.appendChild(bar);
      var selScreen = bar.querySelector('[data-p="screen"]');
      var selState = bar.querySelector('[data-p="state"]');
      var idEl = bar.querySelector('[data-p="id"]');

      Object.keys(screens).forEach(function (k) {
        selScreen.add(new Option(k + " — " + screens[k].name, k));
      });
      selScreen.onchange = function () { location.hash = selScreen.value; };
      selState.onchange = function () { location.hash = selScreen.value + "." + selState.value; };

      function apply() {
        var p = parse() || {};
        var screen = screens[p.screen] ? p.screen : first;
        var def = screens[screen];
        var state = def.states.some(function (s) { return s[0] === p.state; }) ? p.state : def.states[0][0];

        document.body.dataset.cur = screen;
        document.body.dataset.state = state;
        document.querySelectorAll("[data-ui],[data-when],[data-unless]").forEach(function (el) {
          var ok = true;
          if (el.dataset.ui) ok = ok && has(el.dataset.ui, screen);
          if (el.dataset.when) ok = ok && has(el.dataset.when, state);
          if (el.dataset.unless) ok = ok && !has(el.dataset.unless, state);
          el.hidden = !ok;
        });

        selScreen.value = screen;
        selState.innerHTML = "";
        def.states.forEach(function (s) { selState.add(new Option(s[1], s[0])); });
        selState.value = state;
        idEl.textContent = screen + "." + state;

        if (onChange) onChange(screen, state);
        window.scrollTo(0, 0);
      }
      window.addEventListener("hashchange", apply);
      apply();
    }
  };
})();
