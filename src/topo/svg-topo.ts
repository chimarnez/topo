import { BaseTopo, Topo } from "./topo";
import { ObjectWithStringKeys } from "./types";

function svgLikeElement<T extends keyof SVGElementTagNameMap>(
  tagName: T
): SVGElementTagNameMap[T] {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

export class SVGTopo<T extends keyof SVGElementTagNameMap, U>
  extends BaseTopo<SVGTopo<T, U>, U>
  implements Topo
{
  element: SVGElementTagNameMap[T];
  private readonly tagName: T;

  constructor(tagName: T, params: U) {
    const element = svgLikeElement(tagName);
    super(element, params);
    this.element = element;
    this.tagName = tagName;
  }

  clean(restore = true): SVGTopo<T, U> {
    this.element.remove();
    if (restore) this.element = svgLikeElement(this.tagName);
    return this;
  }

  attrs(attrName: string, fn: (el: SVGTopo<T, U>) => any): SVGTopo<T, U>;
  attrs(attrName: string, value: string): SVGTopo<T, U>;
  attrs(attrs: ObjectWithStringKeys): SVGTopo<T, U>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): SVGTopo<T, U> {
    if (typeof attrs === "string") {
      this.element.setAttributeNS(
        null,
        attrs,
        typeof value === "function" ? value(this) : value
      );
    } else if (typeof attrs === "object") {
      for (let k in attrs) {
        this.element.setAttributeNS(null, k, attrs[k]);
      }
    }
    return this;
  }
  event<Y extends keyof SVGElementEventMap>(
    eventName: Y,
    fn: (ev: SVGElementEventMap[Y], ele: SVGTopo<T, U>) => void
  ) {
    const newEvent = (ev: SVGElementEventMap[Y]) => {
      fn(ev, this);
    };
    this.element.addEventListener(
      eventName,
      newEvent as EventListenerOrEventListenerObject
    );
    return this;
  }
}

const topos: {
  [Property in keyof SVGElementTagNameMap]: <U>(
    params: U
  ) => SVGTopo<Property, U>;
} = {
  a: (params) => new SVGTopo("a", params),
  animate: (params) => new SVGTopo("animate", params),
  animateMotion: (params) => new SVGTopo("animateMotion", params),
  animateTransform: (params) => new SVGTopo("animateTransform", params),
  circle: (params) => new SVGTopo("circle", params),
  clipPath: (params) => new SVGTopo("clipPath", params),
  defs: (params) => new SVGTopo("defs", params),
  desc: (params) => new SVGTopo("desc", params),
  ellipse: (params) => new SVGTopo("ellipse", params),
  feBlend: (params) => new SVGTopo("feBlend", params),
  feColorMatrix: (params) => new SVGTopo("feColorMatrix", params),
  feComponentTransfer: (params) => new SVGTopo("feComponentTransfer", params),
  feComposite: (params) => new SVGTopo("feComposite", params),
  feConvolveMatrix: (params) => new SVGTopo("feConvolveMatrix", params),
  feDiffuseLighting: (params) => new SVGTopo("feDiffuseLighting", params),
  feDisplacementMap: (params) => new SVGTopo("feDisplacementMap", params),
  feDistantLight: (params) => new SVGTopo("feDistantLight", params),
  feDropShadow: (params) => new SVGTopo("feDropShadow", params),
  feFlood: (params) => new SVGTopo("feFlood", params),
  feFuncA: (params) => new SVGTopo("feFuncA", params),
  feFuncB: (params) => new SVGTopo("feFuncB", params),
  feFuncG: (params) => new SVGTopo("feFuncG", params),
  feFuncR: (params) => new SVGTopo("feFuncR", params),
  feGaussianBlur: (params) => new SVGTopo("feGaussianBlur", params),
  feImage: (params) => new SVGTopo("feImage", params),
  feMerge: (params) => new SVGTopo("feMerge", params),
  feMergeNode: (params) => new SVGTopo("feMergeNode", params),
  feMorphology: (params) => new SVGTopo("feMorphology", params),
  feOffset: (params) => new SVGTopo("feOffset", params),
  fePointLight: (params) => new SVGTopo("fePointLight", params),
  feSpecularLighting: (params) => new SVGTopo("feSpecularLighting", params),
  feSpotLight: (params) => new SVGTopo("feSpotLight", params),
  feTile: (params) => new SVGTopo("feTile", params),
  feTurbulence: (params) => new SVGTopo("feTurbulence", params),
  filter: (params) => new SVGTopo("filter", params),
  foreignObject: (params) => new SVGTopo("foreignObject", params),
  g: (params) => new SVGTopo("g", params),
  image: (params) => new SVGTopo("image", params),
  line: (params) => new SVGTopo("line", params),
  linearGradient: (params) => new SVGTopo("linearGradient", params),
  marker: (params) => new SVGTopo("marker", params),
  mask: (params) => new SVGTopo("mask", params),
  metadata: (params) => new SVGTopo("metadata", params),
  mpath: (params) => new SVGTopo("mpath", params),
  path: (params) => new SVGTopo("path", params),
  pattern: (params) => new SVGTopo("pattern", params),
  polygon: (params) => new SVGTopo("polygon", params),
  polyline: (params) => new SVGTopo("polyline", params),
  radialGradient: (params) => new SVGTopo("radialGradient", params),
  rect: (params) => new SVGTopo("rect", params),
  script: (params) => new SVGTopo("script", params),
  set: (params) => new SVGTopo("set", params),
  stop: (params) => new SVGTopo("stop", params),
  style: (params) => new SVGTopo("style", params),
  svg: (params) => new SVGTopo("svg", params),
  switch: (params) => new SVGTopo("switch", params),
  symbol: (params) => new SVGTopo("symbol", params),
  text: (params) => new SVGTopo("text", params),
  textPath: (params) => new SVGTopo("textPath", params),
  title: (params) => new SVGTopo("title", params),
  tspan: (params) => new SVGTopo("tspan", params),
  use: (params) => new SVGTopo("use", params),
  view: (params) => new SVGTopo("view", params),
};

export default topos;
