/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  s =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  i = Symbol(),
  e = new WeakMap();
class n {
  constructor(t, s, e) {
    if (((this._$cssResult$ = !0), e !== i))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    (this.cssText = t), (this.t = s);
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (s && void 0 === t) {
      const s = void 0 !== i && 1 === i.length;
      s && (t = e.get(i)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          s && e.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const o = (t, ...s) => {
    const e =
      1 === t.length
        ? t[0]
        : s.reduce(
            (s, i, e) =>
              s +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(i) +
              t[e + 1],
            t[0]
          );
    return new n(e, t, i);
  },
  h = s
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let s = '';
              for (const i of t.cssRules) s += i.cssText;
              return ((t) =>
                new n('string' == typeof t ? t : t + '', void 0, i))(s);
            })(t)
          : t,
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ {
    is: r,
    defineProperty: c,
    getOwnPropertyDescriptor: l,
    getOwnPropertyNames: a,
    getOwnPropertySymbols: u,
    getPrototypeOf: d,
  } = Object,
  f = globalThis,
  p = f.trustedTypes,
  v = p ? p.emptyScript : '',
  y = f.reactiveElementPolyfillSupport,
  g = (t, s) => t,
  b = {
    toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? v : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, s) {
      let i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    },
  },
  m = (t, s) => !r(t, s),
  S = {attribute: !0, type: String, converter: b, reflect: !1, hasChanged: m};
(Symbol.metadata ??= Symbol('metadata')),
  (f.litPropertyMetadata ??= new WeakMap());
class w extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = S) {
    if (
      (s.state && (s.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(t, s),
      !s.noAccessor)
    ) {
      const i = Symbol(),
        e = this.getPropertyDescriptor(t, i, s);
      void 0 !== e && c(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const {get: e, set: n} = l(this.prototype, t) ?? {
      get() {
        return this[s];
      },
      set(t) {
        this[s] = t;
      },
    };
    return {
      get() {
        return e?.call(this);
      },
      set(s) {
        const o = e?.call(this);
        n.call(this, s), this.requestUpdate(t, o, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? S;
  }
  static _$Ei() {
    if (this.hasOwnProperty(g('elementProperties'))) return;
    const t = d(this);
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(g('finalized'))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(g('properties')))
    ) {
      const t = this.properties,
        s = [...a(t), ...u(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const s = litPropertyMetadata.get(t);
      if (void 0 !== s)
        for (const [t, i] of s) this.elementProperties.set(t, i);
    }
    this._$Eh = new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      void 0 !== i && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const t of i) s.unshift(h(t));
    } else void 0 !== t && s.push(h(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return !1 === i
      ? void 0
      : 'string' == typeof i
      ? i
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$Eg = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$ES(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$E_ ??= new Set()).add(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$E_?.delete(t);
  }
  _$ES() {
    const t = new Map(),
      s = this.constructor.elementProperties;
    for (const i of s.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const i =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((i, e) => {
        if (s)
          i.adoptedStyleSheets = e.map((t) =>
            t instanceof CSSStyleSheet ? t : t.styleSheet
          );
        else
          for (const s of e) {
            const e = document.createElement('style'),
              n = t.litNonce;
            void 0 !== n && e.setAttribute('nonce', n),
              (e.textContent = s.cssText),
              i.appendChild(e);
          }
      })(i, this.constructor.elementStyles),
      i
    );
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$E_?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$E_?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$EO(t, s) {
    const i = this.constructor.elementProperties.get(t),
      e = this.constructor._$Eu(t, i);
    if (void 0 !== e && !0 === i.reflect) {
      const n = (
        void 0 !== i.converter?.toAttribute ? i.converter : b
      ).toAttribute(s, i.type);
      (this._$Em = t),
        null == n ? this.removeAttribute(e) : this.setAttribute(e, n),
        (this._$Em = null);
    }
  }
  _$AK(t, s) {
    const i = this.constructor,
      e = i._$Eh.get(t);
    if (void 0 !== e && this._$Em !== e) {
      const t = i.getPropertyOptions(e),
        n =
          'function' == typeof t.converter
            ? {fromAttribute: t.converter}
            : void 0 !== t.converter?.fromAttribute
            ? t.converter
            : b;
      (this._$Em = e),
        (this[e] = n.fromAttribute(s, t.type)),
        (this._$Em = null);
    }
  }
  requestUpdate(t, s, i, e = !1, n) {
    if (void 0 !== t) {
      if (
        ((i ??= this.constructor.getPropertyOptions(t)),
        !(i.hasChanged ?? m)(e ? n : this[t], s))
      )
        return;
      this.C(t, s, i);
    }
    !1 === this.isUpdatePending && (this._$Eg = this._$EP());
  }
  C(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s),
      !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (const [t, s] of this._$Ep) this[t] = s;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [s, i] of t)
          !0 !== i.wrapped ||
            this._$AL.has(s) ||
            void 0 === this[s] ||
            this.C(s, this[s], i);
    }
    let t = !1;
    const s = this._$AL;
    try {
      (t = this.shouldUpdate(s)),
        t
          ? (this.willUpdate(s),
            this._$E_?.forEach((t) => t.hostUpdate?.()),
            this.update(s))
          : this._$ET();
    } catch (s) {
      throw ((t = !1), this._$ET(), s);
    }
    t && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$E_?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$ET() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    (this._$Ej &&= this._$Ej.forEach((t) => this._$EO(t, this[t]))),
      this._$ET();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(w.elementStyles = []),
  (w.shadowRootOptions = {mode: 'open'}),
  (w[g('elementProperties')] = new Map()),
  (w[g('finalized')] = new Map()),
  y?.({ReactiveElement: w}),
  (f.reactiveElementVersions ??= []).push('2.0.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis,
  A = $.trustedTypes,
  _ = A ? A.createPolicy('lit-html', {createHTML: (t) => t}) : void 0,
  E = '$lit$',
  C = `lit$${(Math.random() + '').slice(9)}$`,
  O = '?' + C,
  M = `<${O}>`,
  T = document,
  x = () => T.createComment(''),
  U = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  k = Array.isArray,
  P = '[ \t\n\f\r]',
  N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  j = /-->/g,
  R = />/g,
  z = RegExp(
    `>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  I = /'/g,
  D = /"/g,
  L = /^(?:script|style|textarea|title)$/i,
  W = (
    (t) =>
    (s, ...i) => ({_$litType$: t, strings: s, values: i})
  )(1),
  Z = Symbol.for('lit-noChange'),
  B = Symbol.for('lit-nothing'),
  H = new WeakMap(),
  J = T.createTreeWalker(T, 129);
function q(t, s) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return void 0 !== _ ? _.createHTML(s) : s;
}
const K = (t, s) => {
  const i = t.length - 1,
    e = [];
  let n,
    o = 2 === s ? '<svg>' : '',
    h = N;
  for (let s = 0; s < i; s++) {
    const i = t[s];
    let r,
      c,
      l = -1,
      a = 0;
    for (; a < i.length && ((h.lastIndex = a), (c = h.exec(i)), null !== c); )
      (a = h.lastIndex),
        h === N
          ? '!--' === c[1]
            ? (h = j)
            : void 0 !== c[1]
            ? (h = R)
            : void 0 !== c[2]
            ? (L.test(c[2]) && (n = RegExp('</' + c[2], 'g')), (h = z))
            : void 0 !== c[3] && (h = z)
          : h === z
          ? '>' === c[0]
            ? ((h = n ?? N), (l = -1))
            : void 0 === c[1]
            ? (l = -2)
            : ((l = h.lastIndex - c[2].length),
              (r = c[1]),
              (h = void 0 === c[3] ? z : '"' === c[3] ? D : I))
          : h === D || h === I
          ? (h = z)
          : h === j || h === R
          ? (h = N)
          : ((h = z), (n = void 0));
    const u = h === z && t[s + 1].startsWith('/>') ? ' ' : '';
    o +=
      h === N
        ? i + M
        : l >= 0
        ? (e.push(r), i.slice(0, l) + E + i.slice(l) + C + u)
        : i + C + (-2 === l ? s : u);
  }
  return [q(t, o + (t[i] || '<?>') + (2 === s ? '</svg>' : '')), e];
};
class V {
  constructor({strings: t, _$litType$: s}, i) {
    let e;
    this.parts = [];
    let n = 0,
      o = 0;
    const h = t.length - 1,
      r = this.parts,
      [c, l] = K(t, s);
    if (
      ((this.el = V.createElement(c, i)),
      (J.currentNode = this.el.content),
      2 === s)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (e = J.nextNode()) && r.length < h; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes())
          for (const t of e.getAttributeNames())
            if (t.endsWith(E)) {
              const s = l[o++],
                i = e.getAttribute(t).split(C),
                h = /([.?@])?(.*)/.exec(s);
              r.push({
                type: 1,
                index: n,
                name: h[2],
                strings: i,
                ctor:
                  '.' === h[1] ? Y : '?' === h[1] ? tt : '@' === h[1] ? st : X,
              }),
                e.removeAttribute(t);
            } else
              t.startsWith(C) &&
                (r.push({type: 6, index: n}), e.removeAttribute(t));
        if (L.test(e.tagName)) {
          const t = e.textContent.split(C),
            s = t.length - 1;
          if (s > 0) {
            e.textContent = A ? A.emptyScript : '';
            for (let i = 0; i < s; i++)
              e.append(t[i], x()), J.nextNode(), r.push({type: 2, index: ++n});
            e.append(t[s], x());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === O) r.push({type: 2, index: n});
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(C, t + 1)); )
            r.push({type: 7, index: n}), (t += C.length - 1);
        }
      n++;
    }
  }
  static createElement(t, s) {
    const i = T.createElement('template');
    return (i.innerHTML = t), i;
  }
}
function F(t, s, i = t, e) {
  if (s === Z) return s;
  let n = void 0 !== e ? i._$Co?.[e] : i._$Cl;
  const o = U(s) ? void 0 : s._$litDirective$;
  return (
    n?.constructor !== o &&
      (n?._$AO?.(!1),
      void 0 === o ? (n = void 0) : ((n = new o(t)), n._$AT(t, i, e)),
      void 0 !== e ? ((i._$Co ??= [])[e] = n) : (i._$Cl = n)),
    void 0 !== n && (s = F(t, n._$AS(t, s.values), n, e)),
    s
  );
}
class G {
  constructor(t, s) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = s);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: {content: s},
        parts: i,
      } = this._$AD,
      e = (t?.creationScope ?? T).importNode(s, !0);
    J.currentNode = e;
    let n = J.nextNode(),
      o = 0,
      h = 0,
      r = i[0];
    for (; void 0 !== r; ) {
      if (o === r.index) {
        let s;
        2 === r.type
          ? (s = new Q(n, n.nextSibling, this, t))
          : 1 === r.type
          ? (s = new r.ctor(n, r.name, r.strings, this, t))
          : 6 === r.type && (s = new it(n, this, t)),
          this._$AV.push(s),
          (r = i[++h]);
      }
      o !== r?.index && ((n = J.nextNode()), o++);
    }
    return (J.currentNode = T), e;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV)
      void 0 !== i &&
        (void 0 !== i.strings
          ? (i._$AI(t, i, s), (s += i.strings.length - 2))
          : i._$AI(t[s])),
        s++;
  }
}
class Q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, e) {
    (this.type = 2),
      (this._$AH = B),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = s),
      (this._$AM = i),
      (this.options = e),
      (this._$Cv = e?.isConnected ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return void 0 !== s && 11 === t?.nodeType && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    (t = F(this, t, s)),
      U(t)
        ? t === B || null == t || '' === t
          ? (this._$AH !== B && this._$AR(), (this._$AH = B))
          : t !== this._$AH && t !== Z && this._(t)
        : void 0 !== t._$litType$
        ? this.g(t)
        : void 0 !== t.nodeType
        ? this.$(t)
        : ((t) => k(t) || 'function' == typeof t?.[Symbol.iterator])(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== B && U(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(T.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    const {values: s, _$litType$: i} = t,
      e =
        'number' == typeof i
          ? this._$AC(t)
          : (void 0 === i.el &&
              (i.el = V.createElement(q(i.h, i.h[0]), this.options)),
            i);
    if (this._$AH?._$AD === e) this._$AH.p(s);
    else {
      const t = new G(e, this),
        i = t.u(this.options);
      t.p(s), this.$(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let s = H.get(t.strings);
    return void 0 === s && H.set(t.strings, (s = new V(t))), s;
  }
  T(t) {
    k(this._$AH) || ((this._$AH = []), this._$AR());
    const s = this._$AH;
    let i,
      e = 0;
    for (const n of t)
      e === s.length
        ? s.push((i = new Q(this.k(x()), this.k(x()), this, this.options)))
        : (i = s[e]),
        i._$AI(n),
        e++;
    e < s.length && (this._$AR(i && i._$AB.nextSibling, e), (s.length = e));
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), (t = s);
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, e, n) {
    (this.type = 1),
      (this._$AH = B),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = s),
      (this._$AM = e),
      (this.options = n),
      i.length > 2 || '' !== i[0] || '' !== i[1]
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = B);
  }
  _$AI(t, s = this, i, e) {
    const n = this.strings;
    let o = !1;
    if (void 0 === n)
      (t = F(this, t, s, 0)),
        (o = !U(t) || (t !== this._$AH && t !== Z)),
        o && (this._$AH = t);
    else {
      const e = t;
      let h, r;
      for (t = n[0], h = 0; h < n.length - 1; h++)
        (r = F(this, e[i + h], s, h)),
          r === Z && (r = this._$AH[h]),
          (o ||= !U(r) || r !== this._$AH[h]),
          r === B ? (t = B) : t !== B && (t += (r ?? '') + n[h + 1]),
          (this._$AH[h] = r);
    }
    o && !e && this.O(t);
  }
  O(t) {
    t === B
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '');
  }
}
class Y extends X {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  O(t) {
    this.element[this.name] = t === B ? void 0 : t;
  }
}
class tt extends X {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== B);
  }
}
class st extends X {
  constructor(t, s, i, e, n) {
    super(t, s, i, e, n), (this.type = 5);
  }
  _$AI(t, s = this) {
    if ((t = F(this, t, s, 0) ?? B) === Z) return;
    const i = this._$AH,
      e =
        (t === B && i !== B) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== B && (i === B || e);
    e && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class it {
  constructor(t, s, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = s),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    F(this, t);
  }
}
const et = $.litHtmlPolyfillSupport;
et?.(V, Q), ($.litHtmlVersions ??= []).push('3.1.0');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends w {
  constructor() {
    super(...arguments),
      (this.renderOptions = {host: this}),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, s, i) => {
        const e = i?.renderBefore ?? s;
        let n = e._$litPart$;
        if (void 0 === n) {
          const t = i?.renderBefore ?? null;
          e._$litPart$ = n = new Q(s.insertBefore(x(), t), t, void 0, i ?? {});
        }
        return n._$AI(t), n;
      })(s, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Z;
  }
}
(nt._$litElement$ = !0),
  (nt.finalized = !0),
  globalThis.litElementHydrateSupport?.({LitElement: nt});
const ot = globalThis.litElementPolyfillSupport;
ot?.({LitElement: nt}), (globalThis.litElementVersions ??= []).push('4.0.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (t) => (s, i) => {
    void 0 !== i
      ? i.addInitializer(() => {
          customElements.define(t, s);
        })
      : customElements.define(t, s);
  },
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ rt = {
    attribute: !0,
    type: String,
    converter: b,
    reflect: !1,
    hasChanged: m,
  },
  ct = (t = rt, s, i) => {
    const {kind: e, metadata: n} = i;
    let o = globalThis.litPropertyMetadata.get(n);
    if (
      (void 0 === o && globalThis.litPropertyMetadata.set(n, (o = new Map())),
      o.set(i.name, t),
      'accessor' === e)
    ) {
      const {name: e} = i;
      return {
        set(i) {
          const n = s.get.call(this);
          s.set.call(this, i), this.requestUpdate(e, n, t);
        },
        init(s) {
          return void 0 !== s && this.C(e, void 0, t), s;
        },
      };
    }
    if ('setter' === e) {
      const {name: e} = i;
      return function (i) {
        const n = this[e];
        s.call(this, i), this.requestUpdate(e, n, t);
      };
    }
    throw Error('Unsupported decorator location: ' + e);
  };
function lt(t) {
  return (s, i) =>
    'object' == typeof i
      ? ct(t, s, i)
      : ((t, s, i) => {
          const e = s.hasOwnProperty(i);
          return (
            s.constructor.createProperty(i, e ? {...t, wrapped: !0} : t),
            e ? Object.getOwnPropertyDescriptor(s, i) : void 0
          );
        })(t, s, i);
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
const at = 1,
  ut =
    (t) =>
    (...s) => ({_$litDirective$: t, values: s});
class dt {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    (this._$Ct = t), (this._$AM = s), (this._$Ci = i);
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const ft = 'important',
  pt = ' !' + ft,
  vt = ut(
    class extends dt {
      constructor(t) {
        if (
          (super(t),
          t.type !== at || 'style' !== t.name || t.strings?.length > 2)
        )
          throw Error(
            'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.'
          );
      }
      render(t) {
        return Object.keys(t).reduce((s, i) => {
          const e = t[i];
          return null == e
            ? s
            : s +
                `${(i = i.includes('-')
                  ? i
                  : i
                      .replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&')
                      .toLowerCase())}:${e};`;
        }, '');
      }
      update(t, [s]) {
        const {style: i} = t.element;
        if (void 0 === this.ut)
          return (this.ut = new Set(Object.keys(s))), this.render(s);
        for (const t of this.ut)
          null == s[t] &&
            (this.ut.delete(t),
            t.includes('-') ? i.removeProperty(t) : (i[t] = null));
        for (const t in s) {
          const e = s[t];
          if (null != e) {
            this.ut.add(t);
            const s = 'string' == typeof e && e.endsWith(pt);
            t.includes('-') || s
              ? i.setProperty(t, s ? e.slice(0, -11) : e, s ? ft : '')
              : (i[t] = e);
          }
        }
        return Z;
      }
    }
  ),
  yt = ut(
    class extends dt {
      constructor(t) {
        if (
          (super(t),
          t.type !== at || 'class' !== t.name || t.strings?.length > 2)
        )
          throw Error(
            '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.'
          );
      }
      render(t) {
        return (
          ' ' +
          Object.keys(t)
            .filter((s) => t[s])
            .join(' ') +
          ' '
        );
      }
      update(t, [s]) {
        if (void 0 === this.it) {
          (this.it = new Set()),
            void 0 !== t.strings &&
              (this.st = new Set(
                t.strings
                  .join(' ')
                  .split(/\s/)
                  .filter((t) => '' !== t)
              ));
          for (const t in s) s[t] && !this.st?.has(t) && this.it.add(t);
          return this.render(s);
        }
        const i = t.element.classList;
        for (const t of this.it) t in s || (i.remove(t), this.it.delete(t));
        for (const t in s) {
          const e = !!s[t];
          e === this.it.has(t) ||
            this.st?.has(t) ||
            (e ? (i.add(t), this.it.add(t)) : (i.remove(t), this.it.delete(t)));
        }
        return Z;
      }
    }
  );
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* gt(t, s) {
  if (void 0 !== t) {
    let i = 0;
    for (const e of t) yield s(e, i++);
  }
}
export {gt as a, yt as e, o as i, lt as n, vt as o, nt as s, ht as t, W as x};
