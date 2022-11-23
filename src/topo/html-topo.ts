import { ObjectWithStringKeys } from "./types";
import { BaseTopo, Topo } from "./topo";

function htmlLikeElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T
): HTMLElementTagNameMap[T] {
  return document.createElement(tagName);
}

class HTMLTOPO<T extends keyof HTMLElementTagNameMap, U>
  extends BaseTopo<HTMLTOPO<T, U>, U>
  implements Topo<T>
{
  element: HTMLElementTagNameMap[T];
  constructor(tagName: T, params?: U) {
    const element = htmlLikeElement(tagName);
    super(element, params);
    this.element = element;
  }
  attrs(attrName: string, fn: (el: HTMLTOPO<T, U>) => any): HTMLTOPO<T, U>;
  attrs(attrName: string, value: string): HTMLTOPO<T, U>;
  attrs(attrs: ObjectWithStringKeys): HTMLTOPO<T, U>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): HTMLTOPO<T, U> {
    if (typeof attrs === "string") {
      this.element.setAttribute(
        attrs,
        typeof value === "function" ? value(this) : value
      );
    } else if (typeof attrs === "object") {
      for (let k in attrs) {
        this.element.setAttribute(k, attrs[k]);
      }
    }
    return this;
  }
  event<Y extends keyof HTMLElementEventMap>(
    eventName: Y,
    fn: (ev: HTMLElementEventMap[Y], ele?: HTMLTOPO<T, U>) => void
  ) {
    const newEvent = (ev: HTMLElementEventMap[Y]) => {
      fn(ev, this);
    };
    this.element.addEventListener(
      eventName,
      newEvent as EventListenerOrEventListenerObject
    );
    return this;
  }
}

const HTMLTopo: {
  [Property in keyof HTMLElementTagNameMap]: <U>(
    params?: U
  ) => HTMLTOPO<Property, U>;
} = {
  a: (params) => new HTMLTOPO("a", params),
  abbr: (params) => new HTMLTOPO("abbr", params),
  address: (params) => new HTMLTOPO("address", params),
  area: (params) => new HTMLTOPO("area", params),
  article: (params) => new HTMLTOPO("article", params),
  aside: (params) => new HTMLTOPO("aside", params),
  audio: (params) => new HTMLTOPO("audio", params),
  b: (params) => new HTMLTOPO("b", params),
  base: (params) => new HTMLTOPO("base", params),
  bdi: (params) => new HTMLTOPO("bdi", params),
  bdo: (params) => new HTMLTOPO("bdo", params),
  blockquote: (params) => new HTMLTOPO("blockquote", params),
  body: (params) => new HTMLTOPO("body", params),
  br: (params) => new HTMLTOPO("br", params),
  button: (params) => new HTMLTOPO("button", params),
  canvas: (params) => new HTMLTOPO("canvas", params),
  caption: (params) => new HTMLTOPO("caption", params),
  cite: (params) => new HTMLTOPO("cite", params),
  code: (params) => new HTMLTOPO("code", params),
  col: (params) => new HTMLTOPO("col", params),
  colgroup: (params) => new HTMLTOPO("colgroup", params),
  data: (params) => new HTMLTOPO("data", params),
  datalist: (params) => new HTMLTOPO("datalist", params),
  dd: (params) => new HTMLTOPO("dd", params),
  del: (params) => new HTMLTOPO("del", params),
  details: (params) => new HTMLTOPO("details", params),
  dfn: (params) => new HTMLTOPO("dfn", params),
  dialog: (params) => new HTMLTOPO("dialog", params),
  div: (params) => new HTMLTOPO("div", params),
  dl: (params) => new HTMLTOPO("dl", params),
  dt: (params) => new HTMLTOPO("dt", params),
  em: (params) => new HTMLTOPO("em", params),
  embed: (params) => new HTMLTOPO("embed", params),
  fieldset: (params) => new HTMLTOPO("fieldset", params),
  figcaption: (params) => new HTMLTOPO("figcaption", params),
  figure: (params) => new HTMLTOPO("figure", params),
  footer: (params) => new HTMLTOPO("footer", params),
  form: (params) => new HTMLTOPO("form", params),
  h1: (params) => new HTMLTOPO("h1", params),
  h2: (params) => new HTMLTOPO("h2", params),
  h3: (params) => new HTMLTOPO("h3", params),
  h4: (params) => new HTMLTOPO("h4", params),
  h5: (params) => new HTMLTOPO("h5", params),
  h6: (params) => new HTMLTOPO("h6", params),
  head: (params) => new HTMLTOPO("head", params),
  header: (params) => new HTMLTOPO("header", params),
  hgroup: (params) => new HTMLTOPO("hgroup", params),
  hr: (params) => new HTMLTOPO("hr", params),
  html: (params) => new HTMLTOPO("html", params),
  i: (params) => new HTMLTOPO("i", params),
  iframe: (params) => new HTMLTOPO("iframe", params),
  img: (params) => new HTMLTOPO("img", params),
  input: (params) => new HTMLTOPO("input", params),
  ins: (params) => new HTMLTOPO("ins", params),
  kbd: (params) => new HTMLTOPO("kbd", params),
  label: (params) => new HTMLTOPO("label", params),
  legend: (params) => new HTMLTOPO("legend", params),
  li: (params) => new HTMLTOPO("li", params),
  link: (params) => new HTMLTOPO("link", params),
  main: (params) => new HTMLTOPO("main", params),
  map: (params) => new HTMLTOPO("map", params),
  mark: (params) => new HTMLTOPO("mark", params),
  menu: (params) => new HTMLTOPO("menu", params),
  meta: (params) => new HTMLTOPO("meta", params),
  meter: (params) => new HTMLTOPO("meter", params),
  nav: (params) => new HTMLTOPO("nav", params),
  noscript: (params) => new HTMLTOPO("noscript", params),
  object: (params) => new HTMLTOPO("object", params),
  ol: (params) => new HTMLTOPO("ol", params),
  optgroup: (params) => new HTMLTOPO("optgroup", params),
  option: (params) => new HTMLTOPO("option", params),
  output: (params) => new HTMLTOPO("output", params),
  p: (params) => new HTMLTOPO("p", params),
  picture: (params) => new HTMLTOPO("picture", params),
  pre: (params) => new HTMLTOPO("pre", params),
  progress: (params) => new HTMLTOPO("progress", params),
  q: (params) => new HTMLTOPO("q", params),
  rp: (params) => new HTMLTOPO("rp", params),
  rt: (params) => new HTMLTOPO("rt", params),
  ruby: (params) => new HTMLTOPO("ruby", params),
  s: (params) => new HTMLTOPO("s", params),
  samp: (params) => new HTMLTOPO("samp", params),
  script: (params) => new HTMLTOPO("script", params),
  section: (params) => new HTMLTOPO("section", params),
  select: (params) => new HTMLTOPO("select", params),
  slot: (params) => new HTMLTOPO("slot", params),
  small: (params) => new HTMLTOPO("small", params),
  source: (params) => new HTMLTOPO("source", params),
  span: (params) => new HTMLTOPO("span", params),
  strong: (params) => new HTMLTOPO("strong", params),
  style: (params) => new HTMLTOPO("style", params),
  sub: (params) => new HTMLTOPO("sub", params),
  summary: (params) => new HTMLTOPO("summary", params),
  sup: (params) => new HTMLTOPO("sup", params),
  table: (params) => new HTMLTOPO("table", params),
  tbody: (params) => new HTMLTOPO("tbody", params),
  td: (params) => new HTMLTOPO("td", params),
  template: (params) => new HTMLTOPO("template", params),
  textarea: (params) => new HTMLTOPO("textarea", params),
  tfoot: (params) => new HTMLTOPO("tfoot", params),
  th: (params) => new HTMLTOPO("th", params),
  thead: (params) => new HTMLTOPO("thead", params),
  time: (params) => new HTMLTOPO("time", params),
  title: (params) => new HTMLTOPO("title", params),
  tr: (params) => new HTMLTOPO("tr", params),
  track: (params) => new HTMLTOPO("track", params),
  u: (params) => new HTMLTOPO("u", params),
  ul: (params) => new HTMLTOPO("ul", params),
  var: (params) => new HTMLTOPO("var", params),
  video: (params) => new HTMLTOPO("video", params),
  wbr: (params) => new HTMLTOPO("wbr", params),
};

export default HTMLTopo;
