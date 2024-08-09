import qt from "yargs";
import { format as Et, inspect as Kt } from "util";
import { normalize as Qt, resolve as J, dirname as Se, basename as Xt, extname as Yt, relative as Zt } from "path";
import { readFileSync as nt, statSync as At, readdirSync as Ht, writeFile as Jt } from "fs";
import { notStrictEqual as en, strictEqual as tn } from "assert";
import { fileURLToPath as nn } from "url";
import Ne from "node:fs";
import st from "node:path";
import { parse as sn } from "@vue/compiler-sfc";
class oe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, oe);
  }
}
function Ct() {
  return on() ? 0 : 1;
}
function on() {
  return rn() && !process.defaultApp;
}
function rn() {
  return !!process.versions.electron;
}
function cn(e) {
  return e.slice(Ct() + 1);
}
function an() {
  return process.argv[Ct()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function se(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", o = !1;
    const r = e.match(/^-+/);
    for (let a = r ? r[0].length : 0; a < e.length; a++) {
      let f = e.charAt(a);
      o && (o = !1, f = f.toUpperCase()), a !== 0 && (f === "-" || f === "_") ? o = !0 : f !== "-" && f !== "_" && (n += f);
    }
    return n;
  }
}
function vt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let o = "";
  for (let r = 0; r < e.length; r++) {
    const a = n.charAt(r), f = e.charAt(r);
    a !== f && r > 0 ? o += `${t}${n.charAt(r)}` : o += f;
  }
  return o;
}
function xt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function ln(e) {
  if (Array.isArray(e))
    return e.map((f) => typeof f != "string" ? f + "" : f);
  e = e.trim();
  let t = 0, n = null, o = null, r = null;
  const a = [];
  for (let f = 0; f < e.length; f++) {
    if (n = o, o = e.charAt(f), o === " " && !r) {
      n !== " " && t++;
      continue;
    }
    o === r ? r = null : (o === "'" || o === '"') && !r && (r = o), a[t] || (a[t] = ""), a[t] += o;
  }
  return a;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var V;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(V || (V = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let q;
class un {
  constructor(t) {
    q = t;
  }
  parse(t, n) {
    const o = Object.assign({
      alias: void 0,
      array: void 0,
      boolean: void 0,
      config: void 0,
      configObjects: void 0,
      configuration: void 0,
      coerce: void 0,
      count: void 0,
      default: void 0,
      envPrefix: void 0,
      narg: void 0,
      normalize: void 0,
      string: void 0,
      number: void 0,
      __: void 0,
      key: void 0
    }, n), r = ln(t), a = typeof t == "string", f = fn(Object.assign(/* @__PURE__ */ Object.create(null), o.alias)), p = Object.assign({
      "boolean-negation": !0,
      "camel-case-expansion": !0,
      "combine-arrays": !1,
      "dot-notation": !0,
      "duplicate-arguments-array": !0,
      "flatten-duplicate-arrays": !0,
      "greedy-arrays": !0,
      "halt-at-non-option": !1,
      "nargs-eats-options": !1,
      "negation-prefix": "no-",
      "parse-numbers": !0,
      "parse-positional-numbers": !0,
      "populate--": !1,
      "set-placeholder-key": !1,
      "short-option-groups": !0,
      "strip-aliased": !1,
      "strip-dashed": !1,
      "unknown-options-as-args": !1
    }, o.configuration), E = Object.assign(/* @__PURE__ */ Object.create(null), o.default), O = o.configObjects || [], A = o.envPrefix, F = p["populate--"], M = F ? "--" : "_", le = /* @__PURE__ */ Object.create(null), ot = /* @__PURE__ */ Object.create(null), Z = o.__ || q.format, u = {
      aliases: /* @__PURE__ */ Object.create(null),
      arrays: /* @__PURE__ */ Object.create(null),
      bools: /* @__PURE__ */ Object.create(null),
      strings: /* @__PURE__ */ Object.create(null),
      numbers: /* @__PURE__ */ Object.create(null),
      counts: /* @__PURE__ */ Object.create(null),
      normalize: /* @__PURE__ */ Object.create(null),
      configs: /* @__PURE__ */ Object.create(null),
      nargs: /* @__PURE__ */ Object.create(null),
      coercions: /* @__PURE__ */ Object.create(null),
      keys: []
    }, G = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Ee = new RegExp("^--" + p["negation-prefix"] + "(.+)");
    [].concat(o.array || []).filter(Boolean).forEach(function(s) {
      const c = typeof s == "object" ? s.key : s, h = Object.keys(s).map(function(l) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[l];
      }).filter(Boolean).pop();
      h && (u[h][c] = !0), u.arrays[c] = !0, u.keys.push(c);
    }), [].concat(o.boolean || []).filter(Boolean).forEach(function(s) {
      u.bools[s] = !0, u.keys.push(s);
    }), [].concat(o.string || []).filter(Boolean).forEach(function(s) {
      u.strings[s] = !0, u.keys.push(s);
    }), [].concat(o.number || []).filter(Boolean).forEach(function(s) {
      u.numbers[s] = !0, u.keys.push(s);
    }), [].concat(o.count || []).filter(Boolean).forEach(function(s) {
      u.counts[s] = !0, u.keys.push(s);
    }), [].concat(o.normalize || []).filter(Boolean).forEach(function(s) {
      u.normalize[s] = !0, u.keys.push(s);
    }), typeof o.narg == "object" && Object.entries(o.narg).forEach(([s, c]) => {
      typeof c == "number" && (u.nargs[s] = c, u.keys.push(s));
    }), typeof o.coerce == "object" && Object.entries(o.coerce).forEach(([s, c]) => {
      typeof c == "function" && (u.coercions[s] = c, u.keys.push(s));
    }), typeof o.config < "u" && (Array.isArray(o.config) || typeof o.config == "string" ? [].concat(o.config).filter(Boolean).forEach(function(s) {
      u.configs[s] = !0;
    }) : typeof o.config == "object" && Object.entries(o.config).forEach(([s, c]) => {
      (typeof c == "boolean" || typeof c == "function") && (u.configs[s] = c);
    })), Bt(o.key, f, o.default, u.arrays), Object.keys(E).forEach(function(s) {
      (u.aliases[s] || []).forEach(function(c) {
        E[c] = E[s];
      });
    });
    let B = null;
    kt();
    let ue = [];
    const N = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), rt = {};
    for (let s = 0; s < r.length; s++) {
      const c = r[s], h = c.replace(/^-{3,}/, "---");
      let l, i, m, d, g, j;
      if (c !== "--" && /^-/.test(c) && de(c))
        Ae(c);
      else if (h.match(/^---+(=|$)/)) {
        Ae(c);
        continue;
      } else if (c.match(/^--.+=/) || !p["short-option-groups"] && c.match(/^-.+=/))
        d = c.match(/^--?([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && (y(d[1], u.arrays) ? s = he(s, d[1], r, d[2]) : y(d[1], u.nargs) !== !1 ? s = fe(s, d[1], r, d[2]) : w(d[1], d[2], !0));
      else if (c.match(Ee) && p["boolean-negation"])
        d = c.match(Ee), d !== null && Array.isArray(d) && d.length >= 2 && (i = d[1], w(i, y(i, u.arrays) ? [!1] : !1));
      else if (c.match(/^--.+/) || !p["short-option-groups"] && c.match(/^-[^-]+/))
        d = c.match(/^--?(.+)/), d !== null && Array.isArray(d) && d.length >= 2 && (i = d[1], y(i, u.arrays) ? s = he(s, i, r) : y(i, u.nargs) !== !1 ? s = fe(s, i, r) : (g = r[s + 1], g !== void 0 && (!g.match(/^-/) || g.match(G)) && !y(i, u.bools) && !y(i, u.counts) || /^(true|false)$/.test(g) ? (w(i, g), s++) : w(i, H(i))));
      else if (c.match(/^-.\..+=/))
        d = c.match(/^-([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && w(d[1], d[2]);
      else if (c.match(/^-.\..+/) && !c.match(G))
        g = r[s + 1], d = c.match(/^-(.\..+)/), d !== null && Array.isArray(d) && d.length >= 2 && (i = d[1], g !== void 0 && !g.match(/^-/) && !y(i, u.bools) && !y(i, u.counts) ? (w(i, g), s++) : w(i, H(i)));
      else if (c.match(/^-[^-]+/) && !c.match(G)) {
        m = c.slice(1, -1).split(""), l = !1;
        for (let R = 0; R < m.length; R++) {
          if (g = c.slice(R + 2), m[R + 1] && m[R + 1] === "=") {
            j = c.slice(R + 3), i = m[R], y(i, u.arrays) ? s = he(s, i, r, j) : y(i, u.nargs) !== !1 ? s = fe(s, i, r, j) : w(i, j), l = !0;
            break;
          }
          if (g === "-") {
            w(m[R], g);
            continue;
          }
          if (/[A-Za-z]/.test(m[R]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(g) && y(g, u.bools) === !1) {
            w(m[R], g), l = !0;
            break;
          }
          if (m[R + 1] && m[R + 1].match(/\W/)) {
            w(m[R], g), l = !0;
            break;
          } else
            w(m[R], H(m[R]));
        }
        i = c.slice(-1)[0], !l && i !== "-" && (y(i, u.arrays) ? s = he(s, i, r) : y(i, u.nargs) !== !1 ? s = fe(s, i, r) : (g = r[s + 1], g !== void 0 && (!/^(-|--)[^-]/.test(g) || g.match(G)) && !y(i, u.bools) && !y(i, u.counts) || /^(true|false)$/.test(g) ? (w(i, g), s++) : w(i, H(i))));
      } else if (c.match(/^-[0-9]$/) && c.match(G) && y(c.slice(1), u.bools))
        i = c.slice(1), w(i, H(i));
      else if (c === "--") {
        ue = r.slice(s + 1);
        break;
      } else if (p["halt-at-non-option"]) {
        ue = r.slice(s);
        break;
      } else
        Ae(c);
    }
    ct(N, !0), ct(N, !1), Wt(N), It(), at(N, u.aliases, E, !0), Pt(N), p["set-placeholder-key"] && Mt(N), Object.keys(u.counts).forEach(function(s) {
      ee(N, s.split(".")) || w(s, 0);
    }), F && ue.length && (N[M] = []), ue.forEach(function(s) {
      N[M].push(s);
    }), p["camel-case-expansion"] && p["strip-dashed"] && Object.keys(N).filter((s) => s !== "--" && s.includes("-")).forEach((s) => {
      delete N[s];
    }), p["strip-aliased"] && [].concat(...Object.keys(f).map((s) => f[s])).forEach((s) => {
      p["camel-case-expansion"] && s.includes("-") && delete N[s.split(".").map((c) => se(c)).join(".")], delete N[s];
    });
    function Ae(s) {
      const c = pe("_", s);
      (typeof c == "string" || typeof c == "number") && N._.push(c);
    }
    function fe(s, c, h, l) {
      let i, m = y(c, u.nargs);
      if (m = typeof m != "number" || isNaN(m) ? 1 : m, m === 0)
        return k(l) || (B = Error(Z("Argument unexpected for: %s", c))), w(c, H(c)), s;
      let d = k(l) ? 0 : 1;
      if (p["nargs-eats-options"])
        h.length - (s + 1) + d < m && (B = Error(Z("Not enough arguments following: %s", c))), d = m;
      else {
        for (i = s + 1; i < h.length && (!h[i].match(/^-[^0-9]/) || h[i].match(G) || de(h[i])); i++)
          d++;
        d < m && (B = Error(Z("Not enough arguments following: %s", c)));
      }
      let g = Math.min(d, m);
      for (!k(l) && g > 0 && (w(c, l), g--), i = s + 1; i < g + s + 1; i++)
        w(c, h[i]);
      return s + g;
    }
    function he(s, c, h, l) {
      let i = [], m = l || h[s + 1];
      const d = y(c, u.nargs);
      if (y(c, u.bools) && !/^(true|false)$/.test(m))
        i.push(!0);
      else if (k(m) || k(l) && /^-/.test(m) && !G.test(m) && !de(m)) {
        if (E[c] !== void 0) {
          const g = E[c];
          i = Array.isArray(g) ? g : [g];
        }
      } else {
        k(l) || i.push(Ce(c, l, !0));
        for (let g = s + 1; g < h.length && !(!p["greedy-arrays"] && i.length > 0 || d && typeof d == "number" && i.length >= d || (m = h[g], /^-/.test(m) && !G.test(m) && !de(m))); g++)
          s = g, i.push(Ce(c, m, a));
      }
      return typeof d == "number" && (d && i.length < d || isNaN(d) && i.length === 0) && (B = Error(Z("Not enough arguments following: %s", c))), w(c, i), s;
    }
    function w(s, c, h = a) {
      if (/-/.test(s) && p["camel-case-expansion"]) {
        const m = s.split(".").map(function(d) {
          return se(d);
        }).join(".");
        it(s, m);
      }
      const l = Ce(s, c, h), i = s.split(".");
      te(N, i, l), u.aliases[s] && u.aliases[s].forEach(function(m) {
        const d = m.split(".");
        te(N, d, l);
      }), i.length > 1 && p["dot-notation"] && (u.aliases[i[0]] || []).forEach(function(m) {
        let d = m.split(".");
        const g = [].concat(i);
        g.shift(), d = d.concat(g), (u.aliases[s] || []).includes(d.join(".")) || te(N, d, l);
      }), y(s, u.normalize) && !y(s, u.arrays) && [s].concat(u.aliases[s] || []).forEach(function(d) {
        Object.defineProperty(rt, d, {
          enumerable: !0,
          get() {
            return c;
          },
          set(g) {
            c = typeof g == "string" ? q.normalize(g) : g;
          }
        });
      });
    }
    function it(s, c) {
      u.aliases[s] && u.aliases[s].length || (u.aliases[s] = [c], le[c] = !0), u.aliases[c] && u.aliases[c].length || it(c, s);
    }
    function Ce(s, c, h) {
      h && (c = hn(c)), (y(s, u.bools) || y(s, u.counts)) && typeof c == "string" && (c = c === "true");
      let l = Array.isArray(c) ? c.map(function(i) {
        return pe(s, i);
      }) : pe(s, c);
      return y(s, u.counts) && (k(l) || typeof l == "boolean") && (l = xe()), y(s, u.normalize) && y(s, u.arrays) && (Array.isArray(c) ? l = c.map((i) => q.normalize(i)) : l = q.normalize(c)), l;
    }
    function pe(s, c) {
      return !p["parse-positional-numbers"] && s === "_" || !y(s, u.strings) && !y(s, u.bools) && !Array.isArray(c) && (xt(c) && p["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${c}`))) || !k(c) && y(s, u.numbers)) && (c = Number(c)), c;
    }
    function Wt(s) {
      const c = /* @__PURE__ */ Object.create(null);
      at(c, u.aliases, E), Object.keys(u.configs).forEach(function(h) {
        const l = s[h] || c[h];
        if (l)
          try {
            let i = null;
            const m = q.resolve(q.cwd(), l), d = u.configs[h];
            if (typeof d == "function") {
              try {
                i = d(m);
              } catch (g) {
                i = g;
              }
              if (i instanceof Error) {
                B = i;
                return;
              }
            } else
              i = q.require(m);
            ve(i);
          } catch (i) {
            i.name === "PermissionDenied" ? B = i : s[h] && (B = Error(Z("Invalid JSON config file: %s", l)));
          }
      });
    }
    function ve(s, c) {
      Object.keys(s).forEach(function(h) {
        const l = s[h], i = c ? c + "." + h : h;
        typeof l == "object" && l !== null && !Array.isArray(l) && p["dot-notation"] ? ve(l, i) : (!ee(N, i.split(".")) || y(i, u.arrays) && p["combine-arrays"]) && w(i, l);
      });
    }
    function It() {
      typeof O < "u" && O.forEach(function(s) {
        ve(s);
      });
    }
    function ct(s, c) {
      if (typeof A > "u")
        return;
      const h = typeof A == "string" ? A : "", l = q.env();
      Object.keys(l).forEach(function(i) {
        if (h === "" || i.lastIndexOf(h, 0) === 0) {
          const m = i.split("__").map(function(d, g) {
            return g === 0 && (d = d.substring(h.length)), se(d);
          });
          (c && u.configs[m.join(".")] || !c) && !ee(s, m) && w(m.join("."), l[i]);
        }
      });
    }
    function Pt(s) {
      let c;
      const h = /* @__PURE__ */ new Set();
      Object.keys(s).forEach(function(l) {
        if (!h.has(l) && (c = y(l, u.coercions), typeof c == "function"))
          try {
            const i = pe(l, c(s[l]));
            [].concat(u.aliases[l] || [], l).forEach((m) => {
              h.add(m), s[m] = i;
            });
          } catch (i) {
            B = i;
          }
      });
    }
    function Mt(s) {
      return u.keys.forEach((c) => {
        ~c.indexOf(".") || typeof s[c] > "u" && (s[c] = void 0);
      }), s;
    }
    function at(s, c, h, l = !1) {
      Object.keys(h).forEach(function(i) {
        ee(s, i.split(".")) || (te(s, i.split("."), h[i]), l && (ot[i] = !0), (c[i] || []).forEach(function(m) {
          ee(s, m.split(".")) || te(s, m.split("."), h[i]);
        }));
      });
    }
    function ee(s, c) {
      let h = s;
      p["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(i) {
        h = h[i] || {};
      });
      const l = c[c.length - 1];
      return typeof h != "object" ? !1 : l in h;
    }
    function te(s, c, h) {
      let l = s;
      p["dot-notation"] || (c = [c.join(".")]), c.slice(0, -1).forEach(function(j) {
        j = ut(j), typeof l == "object" && l[j] === void 0 && (l[j] = {}), typeof l[j] != "object" || Array.isArray(l[j]) ? (Array.isArray(l[j]) ? l[j].push({}) : l[j] = [l[j], {}], l = l[j][l[j].length - 1]) : l = l[j];
      });
      const i = ut(c[c.length - 1]), m = y(c.join("."), u.arrays), d = Array.isArray(h);
      let g = p["duplicate-arguments-array"];
      !g && y(i, u.nargs) && (g = !0, (!k(l[i]) && u.nargs[i] === 1 || Array.isArray(l[i]) && l[i].length === u.nargs[i]) && (l[i] = void 0)), h === xe() ? l[i] = xe(l[i]) : Array.isArray(l[i]) ? g && m && d ? l[i] = p["flatten-duplicate-arrays"] ? l[i].concat(h) : (Array.isArray(l[i][0]) ? l[i] : [l[i]]).concat([h]) : !g && !!m == !!d ? l[i] = h : l[i] = l[i].concat([h]) : l[i] === void 0 && m ? l[i] = d ? h : [h] : g && !(l[i] === void 0 || y(i, u.counts) || y(i, u.bools)) ? l[i] = [l[i], h] : l[i] = h;
    }
    function Bt(...s) {
      s.forEach(function(c) {
        Object.keys(c || {}).forEach(function(h) {
          u.aliases[h] || (u.aliases[h] = [].concat(f[h] || []), u.aliases[h].concat(h).forEach(function(l) {
            if (/-/.test(l) && p["camel-case-expansion"]) {
              const i = se(l);
              i !== h && u.aliases[h].indexOf(i) === -1 && (u.aliases[h].push(i), le[i] = !0);
            }
          }), u.aliases[h].concat(h).forEach(function(l) {
            if (l.length > 1 && /[A-Z]/.test(l) && p["camel-case-expansion"]) {
              const i = vt(l, "-");
              i !== h && u.aliases[h].indexOf(i) === -1 && (u.aliases[h].push(i), le[i] = !0);
            }
          }), u.aliases[h].forEach(function(l) {
            u.aliases[l] = [h].concat(u.aliases[h].filter(function(i) {
              return l !== i;
            }));
          }));
        });
      });
    }
    function y(s, c) {
      const h = [].concat(u.aliases[s] || [], s), l = Object.keys(c), i = h.find((m) => l.includes(m));
      return i ? c[i] : !1;
    }
    function lt(s) {
      const c = Object.keys(u);
      return [].concat(c.map((l) => u[l])).some(function(l) {
        return Array.isArray(l) ? l.includes(s) : l[s];
      });
    }
    function zt(s, ...c) {
      return [].concat(...c).some(function(l) {
        const i = s.match(l);
        return i && lt(i[1]);
      });
    }
    function Vt(s) {
      if (s.match(G) || !s.match(/^-[^-]+/))
        return !1;
      let c = !0, h;
      const l = s.slice(1).split("");
      for (let i = 0; i < l.length; i++) {
        if (h = s.slice(i + 2), !lt(l[i])) {
          c = !1;
          break;
        }
        if (l[i + 1] && l[i + 1] === "=" || h === "-" || /[A-Za-z]/.test(l[i]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(h) || l[i + 1] && l[i + 1].match(/\W/))
          break;
      }
      return c;
    }
    function de(s) {
      return p["unknown-options-as-args"] && Ut(s);
    }
    function Ut(s) {
      return s = s.replace(/^-{3,}/, "--"), s.match(G) || Vt(s) ? !1 : !zt(s, /^-+([^=]+?)=[\s\S]*$/, Ee, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function H(s) {
      return !y(s, u.bools) && !y(s, u.counts) && `${s}` in E ? E[s] : Dt(Gt(s));
    }
    function Dt(s) {
      return {
        [V.BOOLEAN]: !0,
        [V.STRING]: "",
        [V.NUMBER]: void 0,
        [V.ARRAY]: []
      }[s];
    }
    function Gt(s) {
      let c = V.BOOLEAN;
      return y(s, u.strings) ? c = V.STRING : y(s, u.numbers) ? c = V.NUMBER : y(s, u.bools) ? c = V.BOOLEAN : y(s, u.arrays) && (c = V.ARRAY), c;
    }
    function k(s) {
      return s === void 0;
    }
    function kt() {
      Object.keys(u.counts).find((s) => y(s, u.arrays) ? (B = Error(Z("Invalid configuration: %s, opts.count excludes opts.array.", s)), !0) : y(s, u.nargs) ? (B = Error(Z("Invalid configuration: %s, opts.count excludes opts.narg.", s)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, u.aliases),
      argv: Object.assign(rt, N),
      configuration: p,
      defaulted: Object.assign({}, ot),
      error: B,
      newAliases: Object.assign({}, le)
    };
  }
}
function fn(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let o = !0;
  for (Object.keys(e).forEach(function(r) {
    t.push([].concat(e[r], r));
  }); o; ) {
    o = !1;
    for (let r = 0; r < t.length; r++)
      for (let a = r + 1; a < t.length; a++)
        if (t[r].filter(function(p) {
          return t[a].indexOf(p) !== -1;
        }).length) {
          t[r] = t[r].concat(t[a]), t.splice(a, 1), o = !0;
          break;
        }
  }
  return t.forEach(function(r) {
    r = r.filter(function(f, p, E) {
      return E.indexOf(f) === p;
    });
    const a = r.pop();
    a !== void 0 && typeof a == "string" && (n[a] = r);
  }), n;
}
function xe(e) {
  return e !== void 0 ? e + 1 : 1;
}
function ut(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function hn(e) {
  return typeof e == "string" && (e[0] === "'" || e[0] === '"') && e[e.length - 1] === e[0] ? e.substring(1, e.length - 1) : e;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var we, Oe, _e;
const ft = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, ht = (Oe = (we = process == null ? void 0 : process.versions) === null || we === void 0 ? void 0 : we.node) !== null && Oe !== void 0 ? Oe : (_e = process == null ? void 0 : process.version) === null || _e === void 0 ? void 0 : _e.slice(1);
if (ht && Number(ht.match(/^([^.]+)/)[1]) < ft)
  throw Error(`yargs parser supports a minimum Node.js version of ${ft}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const pn = process ? process.env : {}, wt = new un({
  cwd: process.cwd,
  env: () => pn,
  format: Et,
  normalize: Qt,
  resolve: J,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(nt(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ae = function(t, n) {
  return wt.parse(t.slice(), n).argv;
};
ae.detailed = function(e, t) {
  return wt.parse(e.slice(), t);
};
ae.camelCase = se;
ae.decamelize = vt;
ae.looksLikeNumber = xt;
const dn = {
  right: En,
  center: An
}, mn = 0, me = 1, gn = 2, ge = 3;
class $n {
  constructor(t) {
    var n;
    this.width = t.width, this.wrap = (n = t.wrap) !== null && n !== void 0 ? n : !0, this.rows = [];
  }
  span(...t) {
    const n = this.div(...t);
    n.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const n = t.map((o) => typeof o == "string" ? this.colFromString(o) : o);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((r) => r.split("	"));
    let o = 0;
    return n.forEach((r) => {
      r.length > 1 && T.stringWidth(r[0]) > o && (o = Math.min(Math.floor(this.width * 0.5), T.stringWidth(r[0])));
    }), n.forEach((r) => {
      this.div(...r.map((a, f) => ({
        text: a.trim(),
        padding: this.measurePadding(a),
        width: f === 0 && r.length > 1 ? o : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(t) {
    return {
      text: t,
      padding: this.measurePadding(t)
    };
  }
  measurePadding(t) {
    const n = T.stripAnsi(t);
    return [0, n.match(/\s*$/)[0].length, 0, n.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((n) => {
      this.rowToString(n, t);
    }), t.filter((n) => !n.hidden).map((n) => n.text).join(`
`);
  }
  rowToString(t, n) {
    return this.rasterize(t).forEach((o, r) => {
      let a = "";
      o.forEach((f, p) => {
        const { width: E } = t[p], O = this.negatePadding(t[p]);
        let A = f;
        if (O > T.stringWidth(f) && (A += " ".repeat(O - T.stringWidth(f))), t[p].align && t[p].align !== "left" && this.wrap) {
          const M = dn[t[p].align];
          A = M(A, O), T.stringWidth(A) < O && (A += " ".repeat((E || 0) - T.stringWidth(A) - 1));
        }
        const F = t[p].padding || [0, 0, 0, 0];
        F[ge] && (a += " ".repeat(F[ge])), a += pt(t[p], A, "| "), a += A, a += pt(t[p], A, " |"), F[me] && (a += " ".repeat(F[me])), r === 0 && n.length > 0 && (a = this.renderInline(a, n[n.length - 1]));
      }), n.push({
        text: a.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const o = t.match(/^ */), r = o ? o[0].length : 0, a = n.text, f = T.stringWidth(a.trimRight());
    return n.span ? this.wrap ? r < f ? t : (n.hidden = !0, a.trimRight() + " ".repeat(r - f) + t.trimLeft()) : (n.hidden = !0, a + t) : t;
  }
  rasterize(t) {
    const n = [], o = this.columnWidths(t);
    let r;
    return t.forEach((a, f) => {
      a.width = o[f], this.wrap ? r = T.wrap(a.text, this.negatePadding(a), { hard: !0 }).split(`
`) : r = a.text.split(`
`), a.border && (r.unshift("." + "-".repeat(this.negatePadding(a) + 2) + "."), r.push("'" + "-".repeat(this.negatePadding(a) + 2) + "'")), a.padding && (r.unshift(...new Array(a.padding[mn] || 0).fill("")), r.push(...new Array(a.padding[gn] || 0).fill(""))), r.forEach((p, E) => {
        n[E] || n.push([]);
        const O = n[E];
        for (let A = 0; A < f; A++)
          O[A] === void 0 && O.push("");
        O.push(p);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[ge] || 0) + (t.padding[me] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((f) => f.width || T.stringWidth(f.text));
    let n = t.length, o = this.width;
    const r = t.map((f) => {
      if (f.width)
        return n--, o -= f.width, f.width;
    }), a = n ? Math.floor(o / n) : 0;
    return r.map((f, p) => f === void 0 ? Math.max(a, bn(t[p])) : f);
  }
}
function pt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function bn(e) {
  const t = e.padding || [], n = 1 + (t[ge] || 0) + (t[me] || 0);
  return e.border ? n + 4 : n;
}
function yn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function En(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function An(e, t) {
  e = e.trim();
  const n = T.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let T;
function Cn(e, t) {
  return T = t, new $n({
    width: e?.width || yn(),
    wrap: e?.wrap
  });
}
const Ot = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function _t(e) {
  return e.replace(Ot, "");
}
function vn(e, t) {
  const [n, o] = e.match(Ot) || ["", ""];
  e = _t(e);
  let r = "";
  for (let a = 0; a < e.length; a++)
    a !== 0 && a % t === 0 && (r += `
`), r += e.charAt(a);
  return n && o && (r = `${n}${r}${o}`), r;
}
function xn(e) {
  return Cn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: _t,
    wrap: vn
  });
}
function wn(e, t) {
  let n = J(".", e), o;
  for (At(n).isDirectory() || (n = Se(n)); ; ) {
    if (o = t(n, Ht(n)), o)
      return J(n, o);
    if (n = Se(o = n), o === n)
      break;
  }
}
const On = {
  fs: {
    readFileSync: nt,
    writeFile: Jt
  },
  format: Et,
  resolve: J,
  exists: (e) => {
    try {
      return At(e).isFile();
    } catch {
      return !1;
    }
  }
};
let z;
class _n {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let o = function() {
    };
    return typeof t[t.length - 1] == "function" && (o = t.pop()), o = o || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: o
    })) : o(), z.format.apply(z.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), o = t.shift(), r = t.shift();
    let a = function() {
    };
    typeof t[t.length - 1] == "function" && (a = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let f = r === 1 ? n : o;
    this.cache[this.locale][n] && (f = this.cache[this.locale][n][r === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: o
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: a
    })) : a();
    const p = [f];
    return ~f.indexOf("%d") && p.push(r), z.format.apply(z.format, p.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (this.cache[this.locale][n] = t[n]);
  }
  _taggedLiteral(t, ...n) {
    let o = "";
    return t.forEach(function(r, a) {
      const f = n[a + 1];
      o += r, typeof f < "u" && (o += "%s");
    }), this.__.apply(this, [o].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], o = n.directory, r = n.locale, a = n.cb, f = this._resolveLocaleFile(o, r), p = JSON.stringify(this.cache[r], null, 2);
    z.fs.writeFile(f, p, "utf-8", function(E) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), a(E);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      z.fs.readFileSync && (t = JSON.parse(z.fs.readFileSync(n, "utf-8")));
    } catch (o) {
      if (o instanceof SyntaxError && (o.message = "syntax error in " + n), o.code === "ENOENT")
        t = {};
      else
        throw o;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let o = z.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(o) && ~n.lastIndexOf("_")) {
      const r = z.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(r) && (o = r);
    }
    return o;
  }
  _fileExistsSync(t) {
    return z.exists(t);
  }
}
function Sn(e, t) {
  z = t;
  const n = new _n(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const Nn = (e) => Sn(e, On), jn = "require is not supported by ESM", dt = "loading a directory of commands is not supported yet for ESM";
let ie;
try {
  ie = nn(import.meta.url);
} catch {
  ie = process.cwd();
}
const Fn = ie.substring(0, ie.lastIndexOf("node_modules"));
en, tn, Kt, Fn || process.cwd(), Xt, Se, Yt, Zt, J, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, nt, Nn({
  directory: J(ie, "../../../locales"),
  updateFiles: !1
});
const ne = "\x1B[44m", L = "\x1B[43m", Y = "\x1B[41m", Rn = "\x1B[42m", C = "\x1B[0m", v = "\x1B[33m", x = "\x1B[36m", $ = "\x1B[0m", Ln = {
  "vue-caution": ["implicitParentChildCommunication", "elementSelectorsWithScoped"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["topLevelElementOrder", "elementAttributeOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression",
    "fullWordComponentName"
  ],
  rrd: [
    "cyclomaticComplexity",
    "elseCondition",
    "functionSize",
    "parameterCount",
    "plainScript",
    "scriptLenght",
    "shortVariableName",
    "tooManyProps"
  ]
}, ce = Object.keys(Ln), je = 100, Fe = [], Tn = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > je && Fe.push({ fileName: t, scriptLength: n.length });
}, Wn = () => {
  const e = [];
  return Fe.length > 0 && Fe.forEach((t) => {
    e.push({
      file: t.fileName,
      rule: `${x}rrd ~ Long <script> blocks${$}`,
      description: `👉 ${v}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${je} lines.${$}`,
      message: `${t.scriptLength > je * 2 ? Y : L}(${t.scriptLength} lines)${C} 🚨`
    });
  }), e;
}, Re = [], In = (e, t) => {
  !e || !e.setup || Re.push(t);
}, Pn = () => {
  const e = [];
  return Re.length > 0 && Re.forEach((t) => {
    e.push({
      file: t,
      rule: `${x}rrd ~ Plain <script> blocks${$}`,
      description: `👉 ${v} Consider using <script setup> to leverage the new SFC <script> syntax.${$}`,
      message: "🚨"
    });
  }), e;
}, Mn = /^(\(.*\)|\\?.)$/;
function X(e) {
  const t = e.toString();
  return Mn.test(t) ? t : `(?:${t})`;
}
const Bn = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, zn = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function b(e) {
  const t = (n) => b(`(?<${n}>${`${e}`.replace(Bn, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => b(`${e}${U(...n)}`), {
      referenceTo: (n) => b(`${e}\\k<${n}>`)
    }),
    or: (...n) => b(`(?:${e}|${U(...n)})`),
    after: (...n) => b(`(?<=${U(...n)})${e}`),
    before: (...n) => b(`${e}(?=${U(...n)})`),
    notAfter: (...n) => b(`(?<!${U(...n)})${e}`),
    notBefore: (...n) => b(`${e}(?!${U(...n)})`),
    times: Object.assign((n) => b(`${X(e)}{${n}}`), {
      any: () => b(`${X(e)}*`),
      atLeast: (n) => b(`${X(e)}{${n},}`),
      atMost: (n) => b(`${X(e)}{0,${n}}`),
      between: (n, o) => b(`${X(e)}{${n},${o}}`)
    }),
    optionally: () => b(`${X(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => b(`${e}`.replace(zn, "($1$3)$2")),
    at: {
      lineStart: () => b(`^${e}`),
      lineEnd: () => b(`${e}$`)
    }
  };
}
const Vn = /[.*+?^${}()|[\]\\/]/g;
function Le(e) {
  return b(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function P(e) {
  return b(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
const Un = b(".");
b("\\b\\w+\\b");
const be = b("\\w"), I = b("\\b");
b("\\d");
const Dn = b("\\s"), re = Object.assign(b("[a-zA-Z]"), {
  lowercase: b("[a-z]"),
  uppercase: b("[A-Z]")
}), St = b("\\t"), Gn = b("\\n");
b("\\r");
b("\\W+"), b("\\W"), b("\\B"), b("\\D"), b("\\S"), Object.assign(b("[^a-zA-Z]"), {
  lowercase: b("[^a-z]"),
  uppercase: b("[^A-Z]")
}), b("[^\\t]"), b("[^\\n]"), b("[^\\r]");
function K(...e) {
  return b(`${X(U(...e))}?`);
}
function U(...e) {
  return b(
    e.map((t) => typeof t == "string" ? t.replace(Vn, "\\$&") : t).join("")
  );
}
function _(...e) {
  return b(`${X(U(...e))}+`);
}
const D = "i", W = "g", S = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(U(...e).toString(), [...t || ""].join(""));
}, Te = [], kn = (e, t) => {
  if (!e)
    return;
  const n = S(I, "else", I, [W, D]), o = e.content.match(n);
  o?.length && Te.push({ fileName: t, elseCount: o.length });
}, qn = () => {
  const e = [];
  return Te.length > 0 && Te.forEach((t) => {
    e.push({
      file: t.fileName,
      rule: `${x}rrd ~ else conditions${$}`,
      description: `👉 ${v}Try to rewrite the conditions in a way that the else clause is not necessary.${$}`,
      message: `else clauses found ${Y}(${t.elseCount})${C} 🚨`
    });
  }), e;
}, Kn = 5, Qn = 10, We = [], Xn = (e, t) => {
  if (!e)
    return;
  const n = S(I, "if", I, [W, D]), o = S(I, "else", I, [W, D]), r = S(I, "for", I, [W, D]), a = S(I, "while", I, [W, D]), f = S(I, "case", I, [W, D]), p = e.content.match(n), E = e.content.match(o), O = e.content.match(r), A = e.content.match(a), F = e.content.match(f), M = (p?.length || 0) + (E?.length || 0) + (O?.length || 0) + (A?.length || 0) + (F?.length || 0);
  M > Kn && We.push({ fileName: t, cyclomaticComplexity: M });
}, Yn = () => {
  const e = [];
  return We.length > 0 && We.forEach((t) => {
    e.push({
      file: t.fileName,
      rule: `${x}rrd ~ cyclomatic complexity${$}`,
      description: `👉 ${v}Try to reduce complexity.${$}`,
      message: `${t.cyclomaticComplexity > Qn ? Y : L}(${t.cyclomaticComplexity})${C} 🚨`
    });
  }), e;
}, Ie = [], Zn = (e) => {
  if (e.includes("pages"))
    return;
  const t = st.basename(e);
  if (t === "App.vue")
    return;
  const n = S(re.uppercase);
  t.slice(1).match(n)?.length || Ie.push({ filePath: e });
}, Hn = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ single name component${$}`,
      description: `👉 ${v}Rename the component to use multi-word name.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names`,
      message: "🚨"
    });
  }), e;
}, Pe = [], Jn = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Pe.push({ filePath: t });
  });
}, es = () => {
  const e = [];
  return Pe.length > 0 && Pe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ global style${$}`,
      description: `👉 ${v}Use <style scoped>.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`,
      message: "🚨"
    });
  }), e;
}, Me = [], ts = (e, t) => {
  if (!e)
    return;
  const n = S("defineProps([", [W, D]);
  e.content.match(n)?.length && Me.push({ filePath: t });
}, ns = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ simple prop${$}`,
      description: `👉 ${v}Add at least type definition.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions`,
      message: "🚨"
    });
  }), e;
}, Be = [], ss = (e, t) => {
  if (!e)
    return;
  const n = S(
    "<",
    _(P(">")),
    " v-if",
    _(P(">")),
    " v-for",
    _(P(">")),
    ">",
    [W, D]
  ), o = S(
    "<",
    _(P(">")),
    " v-for",
    _(P(">")),
    " v-if",
    _(P(">")),
    ">",
    [W, D]
  ), r = e.content.match(n), a = e.content.match(o);
  (r?.length || a?.length) && Be.push({ filePath: t });
}, os = () => {
  const e = [];
  return Be.length > 0 && Be.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ v-if used with v-for${$}`,
      description: `👉 ${v}Move out the v-if to a computed property.${$} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`,
      message: "🚨"
    });
  }), e;
}, ze = [], rs = (e, t) => {
  if (!e)
    return;
  const n = S("<", _(P(">")), " v-for", _(P(">")), ">", [
    W,
    D
  ]), o = e.content.match(n);
  o?.length && (o.some((a) => a.includes(":key")) || ze.push({ filePath: t }));
}, is = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-essential ~ v-for has no key${$}`,
      description: `👉 ${v}Add a \`:key\` property to all v-for.${$} See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for`,
      message: "🚨"
    });
  }), e;
}, Ve = [], cs = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = st.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, o = t.match(n), r = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, a = t.match(r);
  !o?.length && !a?.length && Ve.push({ fileName: e });
}, as = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.fileName,
      rule: `${x}vue-strong ~ component name is not PascalCase and not kebab-case${$}`,
      description: `👉 ${v}Rename the component to use PascalCase or kebab-case file name.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`,
      message: "🚨"
    });
  }), e;
}, Ue = [], ls = S(
  _(re.lowercase).at.lineStart(),
  _(re.uppercase, re.lowercase.times.any().grouped()).at.lineEnd()
), us = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((a) => a.split(":")[0]).filter((a) => a.length).filter((a) => !ls.test(a)).length && Ue.push({ filePath: t });
}, fs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ prop names are not camelCased${$}`,
      description: `👉 ${v}Rename the props to camelCase.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`,
      message: "🚨"
    });
  }), e;
}, Q = (e, t) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((f) => f.includes(t)) + 1;
  const n = e.indexOf(t), o = e.slice(0, n).split(`
`).length, r = t.split(`
`).length;
  return o + r - 1;
}, De = [], hs = 40, ps = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    if (r.length > hs) {
      const a = Q(e.content, r), f = r.split(`
`).at(0)?.trim() || "";
      De.push({
        filename: t,
        message: `line #${a} ${L}${f}${C}`
      });
    }
  });
}, ds = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ lengthy template expression${$}`,
      description: `👉 ${v}Refactor the expression into a computed property.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], ms = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = S(
    "<",
    _(be),
    K(_(Le(` 	
\r`))),
    _(P("/>")),
    K(_(Le(` 	
\r`))),
    K("/"),
    ">",
    ["g"]
  ), r = n.content.match(o);
  if (r === null)
    return;
  const a = S(":", _(be), K(" "), "=", K(" "), P(`'"`), [
    "g"
  ]);
  r.forEach((f) => {
    if (!f.includes(":"))
      return;
    const p = f.match(a);
    if (p?.length) {
      const E = Q(e.source, f);
      Ge.push({ filename: t, message: `line #${E} ${L}${p}${C}` });
    }
  });
}, gs = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ attribute value is not quoted${$}`,
      description: `👉 ${v}Use quotes for attribute values.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ke = [], $s = (e, t) => {
  if (!e)
    return;
  const n = e.template, o = S(
    "<",
    _(re.uppercase, be),
    K(Gn, St),
    K(_(P(">"))),
    "></",
    _(be),
    ">",
    ["g"]
  ), r = n.content.match(o);
  r !== null && r.forEach((a) => {
    const f = Q(e.source, a), p = a.split(`
`).at(-1)?.trim() || "";
    ke.push({ filename: t, message: `line #${f} ${L}${p}${C}` });
  });
}, bs = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ component is not self closing${$}`,
      description: `👉 ${v}Components with no content should be self-closing.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], mt = [], ys = ["v-slot", "v-bind", "v-on"], Es = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  ys.forEach((o) => {
    if (n.content.includes(`${o}:`)) {
      const r = Q(e.source, o);
      qe.push({ filename: t, message: `line #${r} ${L}${o}${C}` }), mt.some((a) => a.filePath === t) || mt.push({ filePath: t });
    }
  });
}, As = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ directive shorthands not used${$}`,
      description: `👉 ${v}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Cs = 3, vs = (e) => {
  const t = S(
    _(P("/")).grouped(),
    U(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const o = n[0]?.split(".vue")[0], r = S(
      Le("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [W]
    ), a = o.match(r);
    (!a || a.length < Cs) && Ke.push({ filename: o, filePath: e });
  }
}, xs = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}vue-strong ~ full-word component names${$}`,
      description: `👉 ${v}Component names should prefer full words over abbreviations.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`,
      message: `${L}(${t.filename})${C} 🚨`
    });
  }), e;
}, Qe = [], ws = (e, t) => {
  const n = e.toString(), o = n.indexOf("<script setup>"), r = n.indexOf("<template>"), a = n.indexOf("<style>"), f = [
    { name: "script", index: o },
    { name: "template", index: r },
    { name: "style", index: a }
  ].filter((E) => E.index !== -1);
  f.every((E, O) => O === 0 ? !0 : f[O - 1].index < E.index) || Qe.push({ filename: t });
}, Os = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-recommended ~ top level element order${$}`,
      description: `👉 ${v}Single-File Components should always order <script>, <template>, and <style> tags consistently.${$} See: https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order`,
      message: "🚨"
    });
  }), e;
}, Xe = [], gt = [
  "is",
  "v-for",
  "v-if",
  "v-else-if",
  "v-else",
  "v-show",
  "v-cloak",
  "v-pre",
  "v-once",
  "id",
  "ref",
  "key",
  "v-model",
  "v-on",
  "v-html",
  "v-text"
], _s = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), o = /<(\w+)(\s[^>]+)?>/g, r = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let a;
  for (; (a = o.exec(n)) !== null; ) {
    const f = a[1], p = a[2];
    if (p) {
      const O = Array.from(p.matchAll(r), (F) => F[1]).filter((F) => gt.includes(F));
      let A = -1;
      for (const F of O) {
        const M = gt.indexOf(F);
        if (M !== -1 && M < A) {
          Xe.push({
            filename: t,
            message: `tag has attributes out of order ${L}(${f})${C}`
          });
          break;
        }
        A = M;
      }
    }
  }
}, Ss = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-recommended ~ element attribute order${$}`,
      description: `👉 ${v}The attributes of elements (including components) should be ordered consistently.${$} See: https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Ns = 5, js = (e, t) => {
  if (!e)
    return;
  const n = S("defineProps", K("<"), K("("), "{", _(Un), "}", ["g", "s"]), o = e.content.match(n);
  if (o?.length) {
    const r = o[0].split(",").length;
    r > Ns && Ye.push({ fileName: t, propsCount: r });
  }
}, Fs = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.fileName,
      rule: `${x}rrd ~ too many props${$}`,
      description: `👉 ${v}Try to refactor your code to use less properties.${$}`,
      message: `props found ${Y}(${t.propsCount})${C} 🚨`
    });
  }), e;
}, Ze = [], Nt = 20, Rs = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\([^)]*\)\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}|const\s+([\w$]+)\s*=\s*\([^)]*\)\s*=>\s*\{([^{}]*(([^{}]*\{[^{}]*\}[^{}]*)*[^{}]*))\}/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const r = o[1] || o[5];
    (o[2] || o[6]).split(`
`).length > Nt && Ze.push({ filename: t, funcName: r });
  }
}, Ls = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}rrd ~ function size${$}`,
      description: `👉 ${v}Functions must be shorter than ${Nt} lines${$}`,
      message: `function ${Y}(${t.funcName})${C} 🚨`
    });
  }), e;
}, He = [], jt = 3, $t = (e, t, n) => {
  const o = t.split(",").map((r) => r.trim()).filter((r) => r.length > 0);
  o.length > jt && He.push({ filename: n, funcName: e, paramsCount: o.length });
}, Ts = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; )
    o[1] ? $t(o[1], o[2], t) : o[3] && $t(o[3], o[4], t);
}, Ws = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}rrd ~ parameter count${$}`,
      description: `👉 ${v}Max number of function parameters should be ${jt}${$}`,
      message: `function ${L}${t.funcName}${C} has ${L}${t.paramsCount}${C} parameters 🚨`
    });
  }), e;
}, Ft = 4, Je = [], Is = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let o;
  for (; (o = n.exec(e.content)) !== null; ) {
    const r = o[1];
    r.length < Ft && Je.push({ filename: t, variable: r });
  }
}, Ps = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}rrd ~ short variable names${$}`,
      description: `👉 ${v}Variable names must have a minimum length of ${Ft}${$}`,
      message: `${Y}(${t.variable})${C} 🚨`
    });
  }), e;
}, Rt = [], $e = [], Ms = 5, Bs = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, o = e.content.match(n);
  o?.length && o.forEach((r) => {
    if (r.split(`
`).length > Ms) {
      const a = r.split(`
`)[0], f = Q(e.content, a);
      Rt.push({ filename: t, message: `line #${f} ${L}computed${C}` }), $e.push({ filePath: t }), $e.some((p) => p.filePath === t) || $e.push({ filePath: t });
    }
  });
}, zs = () => {
  const e = [];
  return $e.length > 0 && Rt.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ complicated computed property${$}`,
      description: `👉 ${v}Refactor the computed properties to smaller ones.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Vs = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((r) => r[1].trim()).forEach((r) => {
    const a = Q(e.content.trim(), r), f = r.split(`
`).at(0)?.trim() || "";
    et.push({ filename: t, message: `line #${a} ${L}(${f})${C}` });
  });
}, Us = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-strong ~ component files${$}`,
      description: `👉 ${v}Whenever a build system is available to concatenate files, each component should be in its own file.${$} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ye = [], Ds = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, o = /v-model\s*=\s*"([^"]+)"/, r = S(U("$parent").or("getCurrentInstance"), [W]), a = e.content.match(n), f = e.content.match(o);
  if (f) {
    const E = f[1].split(".")[0], O = a ? a[1] : "";
    if (O.includes(E)) {
      const A = Q(e.content.trim(), O);
      ye.push({
        filename: t,
        message: `line #${A} ${L}(${E})${C}`
      });
    }
  }
  const p = e.content.match(r);
  if (p) {
    const E = Q(e.content.trim(), p[0]);
    ye.push({
      filename: t,
      message: `line #${E} ${L}(${p[0]})${C}`
    });
  }
}, Gs = () => {
  const e = [];
  return ye.length > 0 && ye.forEach((t) => {
    e.push({
      file: t.filename,
      rule: `${x}vue-caution ~ implicit parent-child communication${$}`,
      description: `👉 ${v}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${$} See: https://vuejs.org/style-guide/rules-use-with-caution.html#implicit-parent-child-communication`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], bt = 5, ks = 3, qs = (e, t) => {
  if (!e)
    return;
  const n = S(St.times.atLeast(bt).or(Dn.times.atLeast(ks * bt)), [
    W,
    D
  ]);
  e.content.match(n)?.forEach((r) => {
    const a = Q(e.content, r);
    tt.push({
      filePath: t,
      message: `line #${a} ${L}indentation: ${r.length}${C}`
    });
  });
}, Ks = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${x}rrd ~ deep indentation${$}`,
      description: `👉 ${v}Try to refactor your component to child components, to avoid deep indentations..${$}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qs = (e) => {
  let t = 0;
  const n = {}, o = ({ file: a, rule: f, title: p, description: E, message: O }) => {
    const A = e === "rule" ? f : a;
    n[A] || (n[A] = []), n[A].push({ file: a, rule: f, title: p, description: E, message: O });
  }, r = (a) => {
    a().forEach((p) => {
      o(p), t++;
    });
  };
  return r(Hn), r(ns), r(is), r(os), r(es), r(as), r(bs), r(fs), r(ds), r(gs), r(As), r(zs), r(Us), r(xs), r(Os), r(Ss), r(Gs), r(Yn), r(Ks), r(qn), r(Ls), r(Ws), r(Pn), r(Wn), r(Ps), r(Fs), Object.keys(n).forEach((a) => {
    console.log(`
 - ${a}`), n[a].forEach((f) => {
      console.log(e === "file" ? `   Rule: ${f.rule}` : `   File: ${f.file}`), console.log(`   Description: ${f.description}`), console.log(`   Message: ${f.message || "🚨"}
`);
    });
  }), t;
}, Xs = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((o) => {
    let r;
    for (; (r = n.exec(o.content)) !== null; )
      r[1];
  });
}, Ys = (e, t, n) => {
  const o = e.scriptSetup || e.script;
  n.includes("vue-essential") && (Zn(t), ts(o, t), Jn(e.styles, t), rs(e.template, t), ss(e.template, t)), n.includes("vue-strong") && (cs(t), us(o, t), Vs(o, t), Bs(o, t), $s(e, t), ps(e.template, t), ms(e, t), Es(e, t), vs(t)), n.includes("vue-recommended") && (ws(e.source, t), _s(e.template, t)), n.includes("vue-caution") && (Ds(o, t), Xs(e.styles)), n.includes("rrd") && (Xn(o, t), qs(o, t), kn(o, t), Rs(o, t), Ts(o, t), In(e.script, t), Tn(o, t), Is(o, t), js(o, t));
};
let Lt = 0;
const Zs = [
  "src",
  "components",
  "pages",
  "layouts",
  "server",
  "composables",
  "store",
  "utils",
  "plugins",
  "middleware"
], Tt = (e, t) => {
  const n = Ne.readdirSync(e);
  Lt += n.length;
  for (const o of n) {
    const r = st.join(e, o);
    Ne.statSync(r).isDirectory() ? Zs.some((a) => r.includes(a)) && Tt(r, t) : o.endsWith(".vue") && t(r);
  }
}, Hs = (e, t = [], n) => {
  console.log(`

${ne}Analyzing Vue files in ${e}${C}`);
  const o = ce.filter((r) => !t.includes(r));
  console.log(`Applying ${t.length} rulesets ${ne}${t}${C} and ignoring ${o.length} rulesets ${ne}${o}${C} grouping by ${ne}${n}${C}`), Tt(e, (r) => {
    if (r.includes("App.vue") || r.includes("app.vue"))
      return;
    const a = Ne.readFileSync(r, "utf-8"), { descriptor: f } = sn(a);
    Ys(f, r, t);
  }), console.log(`Found ${ne}${Lt}${C} Vue files`), Qs(n) || console.log(`${Rn}No code smells detected!${C}`);
};
qt(cn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells",
  (e) => e.positional("path", {
    describe: "path to the Vue files",
    type: "string",
    default: "./"
  }).option("ignore", {
    describe: "Comma-separated list of rulesets to ignore",
    type: "string",
    coerce: yt("ignore")
  }).option("apply", {
    describe: "Comma-separated list of rulesets to apply",
    type: "string",
    coerce: yt("apply")
  }).option("group", {
    describe: "Group results by rule or file",
    type: "string",
    coerce: (t) => Js(t),
    default: "rule"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${Y}Cannot use both --ignore and --apply options together.${C}.

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...ce];
    e.apply && (t = e.apply), e.ignore && (t = ce.filter((n) => !e.ignore.includes(n))), Hs(e.path, t, e.group);
  }
).help().argv;
function yt(e) {
  return (t) => {
    const n = t.split(","), o = n.filter((r) => !ce.includes(r));
    return o.length > 0 && (console.error(
      `
${Y}Invalid ${e} values: ${o.join(
        ", "
      )}${C}. 
${v}Allowed values are: ${[...ce].join(", ")}${$}

`
    ), process.exit(1)), n;
  };
}
function Js(e) {
  return ["rule", "file"].includes(e) || process.exit(1), e;
}
