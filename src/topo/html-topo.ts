import { ObjectWithStringKeys } from "./types";
import { BaseTopo, Topo } from "./topo";

function htmlLikeElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T
): HTMLElementTagNameMap[T] {
  return document.createElement(tagName);
}

class HTMLTOPO<T extends keyof HTMLElementTagNameMap>
  extends BaseTopo<HTMLTOPO<T>>
  implements Topo<T>
{
  element: HTMLElementTagNameMap[T];
  constructor(tagName: T) {
    const element = htmlLikeElement(tagName);
    super(element);
    this.element = element;
  }
  attrs(attrName: string, fn: (el: HTMLTOPO<T>) => any): HTMLTOPO<T>;
  attrs(attrName: string, value: string): HTMLTOPO<T>;
  attrs(attrs: ObjectWithStringKeys): HTMLTOPO<T>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): HTMLTOPO<T> {
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
  event<U extends keyof HTMLElementEventMap>(
    eventName: U,
    fn: (ev: HTMLElementEventMap[U], ele?: HTMLTOPO<T>) => void
  ) {
    const newEvent = (ev: HTMLElementEventMap[U]) => {
      fn(ev, this);
    };
    this.element.addEventListener(
      eventName,
      newEvent as EventListenerOrEventListenerObject
    );
    return this;
  }
}

const HTMLTopo = {
  a: () => new HTMLTOPO("a"),
  abbr: () => new HTMLTOPO("abbr"),
  address: () => new HTMLTOPO("address"),
  area: () => new HTMLTOPO("area"),
  article: () => new HTMLTOPO("article"),
  aside: () => new HTMLTOPO("aside"),
  audio: () => new HTMLTOPO("audio"),
  b: () => new HTMLTOPO("b"),
  base: () => new HTMLTOPO("base"),
  bdi: () => new HTMLTOPO("bdi"),
  bdo: () => new HTMLTOPO("bdo"),
  blockquote: () => new HTMLTOPO("blockquote"),
  body: () => new HTMLTOPO("body"),
  br: () => new HTMLTOPO("br"),
  button: () => new HTMLTOPO("button"),
  canvas: () => new HTMLTOPO("canvas"),
  caption: () => new HTMLTOPO("caption"),
  cite: () => new HTMLTOPO("cite"),
  code: () => new HTMLTOPO("code"),
  col: () => new HTMLTOPO("col"),
  colgroup: () => new HTMLTOPO("colgroup"),
  data: () => new HTMLTOPO("data"),
  datalist: () => new HTMLTOPO("datalist"),
  dd: () => new HTMLTOPO("dd"),
  del: () => new HTMLTOPO("del"),
  details: () => new HTMLTOPO("details"),
  dfn: () => new HTMLTOPO("dfn"),
  dialog: () => new HTMLTOPO("dialog"),
  div: () => new HTMLTOPO("div"),
  dl: () => new HTMLTOPO("dl"),
  dt: () => new HTMLTOPO("dt"),
  em: () => new HTMLTOPO("em"),
  embed: () => new HTMLTOPO("embed"),
  fieldset: () => new HTMLTOPO("fieldset"),
  figcaption: () => new HTMLTOPO("figcaption"),
  figure: () => new HTMLTOPO("figure"),
  footer: () => new HTMLTOPO("footer"),
  form: () => new HTMLTOPO("form"),
  h1: () => new HTMLTOPO("h1"),
  h2: () => new HTMLTOPO("h2"),
  h3: () => new HTMLTOPO("h3"),
  h4: () => new HTMLTOPO("h4"),
  h5: () => new HTMLTOPO("h5"),
  h6: () => new HTMLTOPO("h6"),
  head: () => new HTMLTOPO("head"),
  header: () => new HTMLTOPO("header"),
  hgroup: () => new HTMLTOPO("hgroup"),
  hr: () => new HTMLTOPO("hr"),
  html: () => new HTMLTOPO("html"),
  i: () => new HTMLTOPO("i"),
  iframe: () => new HTMLTOPO("iframe"),
  img: () => new HTMLTOPO("img"),
  input: () => new HTMLTOPO("input"),
  ins: () => new HTMLTOPO("ins"),
  kbd: () => new HTMLTOPO("kbd"),
  label: () => new HTMLTOPO("label"),
  legend: () => new HTMLTOPO("legend"),
  li: () => new HTMLTOPO("li"),
  link: () => new HTMLTOPO("link"),
  main: () => new HTMLTOPO("main"),
  map: () => new HTMLTOPO("map"),
  mark: () => new HTMLTOPO("mark"),
  menu: () => new HTMLTOPO("menu"),
  meta: () => new HTMLTOPO("meta"),
  meter: () => new HTMLTOPO("meter"),
  nav: () => new HTMLTOPO("nav"),
  noscript: () => new HTMLTOPO("noscript"),
  object: () => new HTMLTOPO("object"),
  ol: () => new HTMLTOPO("ol"),
  optgroup: () => new HTMLTOPO("optgroup"),
  option: () => new HTMLTOPO("option"),
  output: () => new HTMLTOPO("output"),
  p: () => new HTMLTOPO("p"),
  picture: () => new HTMLTOPO("picture"),
  pre: () => new HTMLTOPO("pre"),
  progress: () => new HTMLTOPO("progress"),
  q: () => new HTMLTOPO("q"),
  rp: () => new HTMLTOPO("rp"),
  rt: () => new HTMLTOPO("rt"),
  ruby: () => new HTMLTOPO("ruby"),
  s: () => new HTMLTOPO("s"),
  samp: () => new HTMLTOPO("samp"),
  script: () => new HTMLTOPO("script"),
  section: () => new HTMLTOPO("section"),
  select: () => new HTMLTOPO("select"),
  slot: () => new HTMLTOPO("slot"),
  small: () => new HTMLTOPO("small"),
  source: () => new HTMLTOPO("source"),
  span: () => new HTMLTOPO("span"),
  strong: () => new HTMLTOPO("strong"),
  style: () => new HTMLTOPO("style"),
  sub: () => new HTMLTOPO("sub"),
  summary: () => new HTMLTOPO("summary"),
  sup: () => new HTMLTOPO("sup"),
  table: () => new HTMLTOPO("table"),
  tbody: () => new HTMLTOPO("tbody"),
  td: () => new HTMLTOPO("td"),
  template: () => new HTMLTOPO("template"),
  textarea: () => new HTMLTOPO("textarea"),
  tfoot: () => new HTMLTOPO("tfoot"),
  th: () => new HTMLTOPO("th"),
  thead: () => new HTMLTOPO("thead"),
  time: () => new HTMLTOPO("time"),
  title: () => new HTMLTOPO("title"),
  tr: () => new HTMLTOPO("tr"),
  track: () => new HTMLTOPO("track"),
  u: () => new HTMLTOPO("u"),
  ul: () => new HTMLTOPO("ul"),
  var: () => new HTMLTOPO("var"),
  video: () => new HTMLTOPO("video"),
  wbr: () => new HTMLTOPO("wbr"),
};

export default HTMLTopo;
