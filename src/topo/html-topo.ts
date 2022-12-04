import { ObjectWithStringKeys } from "./types";
import { BaseTopo, Topo } from "./topo";

function htmlLikeElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T
): HTMLElementTagNameMap[T] {
  return document.createElement(tagName);
}

export class HTMLTopo<T extends keyof HTMLElementTagNameMap, U>
  extends BaseTopo<HTMLTopo<T, U>, U>
  implements Topo
{
  element: HTMLElementTagNameMap[T];
  private readonly tagName: T;
  constructor(tagName: T, params: U) {
    const element = htmlLikeElement(tagName);
    super(element, params);
    this.element = element;
    this.tagName = tagName;
  }

  clean(restore = true): HTMLTopo<T, U> {
    this.element.remove();
    if (restore) this.element = htmlLikeElement(this.tagName);
    return this;
  }

  attrs(attrName: string, fn: (el: HTMLTopo<T, U>) => any): HTMLTopo<T, U>;
  attrs(attrName: string, value: string): HTMLTopo<T, U>;
  attrs(attrs: ObjectWithStringKeys): HTMLTopo<T, U>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): HTMLTopo<T, U> {
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
    fn: (ev: HTMLElementEventMap[Y], ele: HTMLTopo<T, U>) => void
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

const topoh: {
  [Property in keyof HTMLElementTagNameMap]: <U>(
    params: U
  ) => HTMLTopo<Property, U>;
} = {
  a: (params) => new HTMLTopo("a", params),
  abbr: (params) => new HTMLTopo("abbr", params),
  address: (params) => new HTMLTopo("address", params),
  area: (params) => new HTMLTopo("area", params),
  article: (params) => new HTMLTopo("article", params),
  aside: (params) => new HTMLTopo("aside", params),
  audio: (params) => new HTMLTopo("audio", params),
  b: (params) => new HTMLTopo("b", params),
  base: (params) => new HTMLTopo("base", params),
  bdi: (params) => new HTMLTopo("bdi", params),
  bdo: (params) => new HTMLTopo("bdo", params),
  blockquote: (params) => new HTMLTopo("blockquote", params),
  body: (params) => new HTMLTopo("body", params),
  br: (params) => new HTMLTopo("br", params),
  button: (params) => new HTMLTopo("button", params),
  canvas: (params) => new HTMLTopo("canvas", params),
  caption: (params) => new HTMLTopo("caption", params),
  cite: (params) => new HTMLTopo("cite", params),
  code: (params) => new HTMLTopo("code", params),
  col: (params) => new HTMLTopo("col", params),
  colgroup: (params) => new HTMLTopo("colgroup", params),
  data: (params) => new HTMLTopo("data", params),
  datalist: (params) => new HTMLTopo("datalist", params),
  dd: (params) => new HTMLTopo("dd", params),
  del: (params) => new HTMLTopo("del", params),
  details: (params) => new HTMLTopo("details", params),
  dfn: (params) => new HTMLTopo("dfn", params),
  dialog: (params) => new HTMLTopo("dialog", params),
  div: (params) => new HTMLTopo("div", params),
  dl: (params) => new HTMLTopo("dl", params),
  dt: (params) => new HTMLTopo("dt", params),
  em: (params) => new HTMLTopo("em", params),
  embed: (params) => new HTMLTopo("embed", params),
  fieldset: (params) => new HTMLTopo("fieldset", params),
  figcaption: (params) => new HTMLTopo("figcaption", params),
  figure: (params) => new HTMLTopo("figure", params),
  footer: (params) => new HTMLTopo("footer", params),
  form: (params) => new HTMLTopo("form", params),
  h1: (params) => new HTMLTopo("h1", params),
  h2: (params) => new HTMLTopo("h2", params),
  h3: (params) => new HTMLTopo("h3", params),
  h4: (params) => new HTMLTopo("h4", params),
  h5: (params) => new HTMLTopo("h5", params),
  h6: (params) => new HTMLTopo("h6", params),
  head: (params) => new HTMLTopo("head", params),
  header: (params) => new HTMLTopo("header", params),
  hgroup: (params) => new HTMLTopo("hgroup", params),
  hr: (params) => new HTMLTopo("hr", params),
  html: (params) => new HTMLTopo("html", params),
  i: (params) => new HTMLTopo("i", params),
  iframe: (params) => new HTMLTopo("iframe", params),
  img: (params) => new HTMLTopo("img", params),
  input: (params) => new HTMLTopo("input", params),
  ins: (params) => new HTMLTopo("ins", params),
  kbd: (params) => new HTMLTopo("kbd", params),
  label: (params) => new HTMLTopo("label", params),
  legend: (params) => new HTMLTopo("legend", params),
  li: (params) => new HTMLTopo("li", params),
  link: (params) => new HTMLTopo("link", params),
  main: (params) => new HTMLTopo("main", params),
  map: (params) => new HTMLTopo("map", params),
  mark: (params) => new HTMLTopo("mark", params),
  menu: (params) => new HTMLTopo("menu", params),
  meta: (params) => new HTMLTopo("meta", params),
  meter: (params) => new HTMLTopo("meter", params),
  nav: (params) => new HTMLTopo("nav", params),
  noscript: (params) => new HTMLTopo("noscript", params),
  object: (params) => new HTMLTopo("object", params),
  ol: (params) => new HTMLTopo("ol", params),
  optgroup: (params) => new HTMLTopo("optgroup", params),
  option: (params) => new HTMLTopo("option", params),
  output: (params) => new HTMLTopo("output", params),
  p: (params) => new HTMLTopo("p", params),
  picture: (params) => new HTMLTopo("picture", params),
  pre: (params) => new HTMLTopo("pre", params),
  progress: (params) => new HTMLTopo("progress", params),
  q: (params) => new HTMLTopo("q", params),
  rp: (params) => new HTMLTopo("rp", params),
  rt: (params) => new HTMLTopo("rt", params),
  ruby: (params) => new HTMLTopo("ruby", params),
  s: (params) => new HTMLTopo("s", params),
  samp: (params) => new HTMLTopo("samp", params),
  script: (params) => new HTMLTopo("script", params),
  section: (params) => new HTMLTopo("section", params),
  select: (params) => new HTMLTopo("select", params),
  slot: (params) => new HTMLTopo("slot", params),
  small: (params) => new HTMLTopo("small", params),
  source: (params) => new HTMLTopo("source", params),
  span: (params) => new HTMLTopo("span", params),
  strong: (params) => new HTMLTopo("strong", params),
  style: (params) => new HTMLTopo("style", params),
  sub: (params) => new HTMLTopo("sub", params),
  summary: (params) => new HTMLTopo("summary", params),
  sup: (params) => new HTMLTopo("sup", params),
  table: (params) => new HTMLTopo("table", params),
  tbody: (params) => new HTMLTopo("tbody", params),
  td: (params) => new HTMLTopo("td", params),
  template: (params) => new HTMLTopo("template", params),
  textarea: (params) => new HTMLTopo("textarea", params),
  tfoot: (params) => new HTMLTopo("tfoot", params),
  th: (params) => new HTMLTopo("th", params),
  thead: (params) => new HTMLTopo("thead", params),
  time: (params) => new HTMLTopo("time", params),
  title: (params) => new HTMLTopo("title", params),
  tr: (params) => new HTMLTopo("tr", params),
  track: (params) => new HTMLTopo("track", params),
  u: (params) => new HTMLTopo("u", params),
  ul: (params) => new HTMLTopo("ul", params),
  var: (params) => new HTMLTopo("var", params),
  video: (params) => new HTMLTopo("video", params),
  wbr: (params) => new HTMLTopo("wbr", params),
};

export default topoh;
