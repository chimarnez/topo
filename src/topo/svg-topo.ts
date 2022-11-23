import { BaseTopo, Topo } from "./topo";
import { ObjectWithStringKeys } from "./types";

function svgLikeElement<T extends keyof SVGElementTagNameMap>(
  tagName: T
): SVGElementTagNameMap[T] {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

class SVGTOPO<T extends keyof SVGElementTagNameMap, U>
  extends BaseTopo<SVGTOPO<T, U>, U>
  implements Topo<T>
{
  element: SVGElementTagNameMap[T];

  constructor(tagName: T, params?: U) {
    const element = svgLikeElement(tagName);
    super(element, params);
    this.element = element;
  }

  attrs(attrName: string, fn: (el: SVGTOPO<T, U>) => any): SVGTOPO<T, U>;
  attrs(attrName: string, value: string): SVGTOPO<T, U>;
  attrs(attrs: ObjectWithStringKeys): SVGTOPO<T, U>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): SVGTOPO<T, U> {
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
    fn: (ev: SVGElementEventMap[Y], ele?: SVGTOPO<T, U>) => void
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

const SVGTopo: {
  [Property in keyof SVGElementTagNameMap]: <U>(
    params?: U
  ) => SVGTOPO<Property, U>;
} = {
  a: (params) => new SVGTOPO("a", params),
  animate: (params) => new SVGTOPO("animate", params),
  animateMotion: (params) => new SVGTOPO("animateMotion", params),
  animateTransform: (params) => new SVGTOPO("animateTransform", params),
  circle: (params) => new SVGTOPO("circle", params),
  clipPath: (params) => new SVGTOPO("clipPath", params),
  defs: (params) => new SVGTOPO("defs", params),
  desc: (params) => new SVGTOPO("desc", params),
  ellipse: (params) => new SVGTOPO("ellipse", params),
  feBlend: (params) => new SVGTOPO("feBlend", params),
  feColorMatrix: (params) => new SVGTOPO("feColorMatrix", params),
  feComponentTransfer: (params) => new SVGTOPO("feComponentTransfer", params),
  feComposite: (params) => new SVGTOPO("feComposite", params),
  feConvolveMatrix: (params) => new SVGTOPO("feConvolveMatrix", params),
  feDiffuseLighting: (params) => new SVGTOPO("feDiffuseLighting", params),
  feDisplacementMap: (params) => new SVGTOPO("feDisplacementMap", params),
  feDistantLight: (params) => new SVGTOPO("feDistantLight", params),
  feDropShadow: (params) => new SVGTOPO("feDropShadow", params),
  feFlood: (params) => new SVGTOPO("feFlood", params),
  feFuncA: (params) => new SVGTOPO("feFuncA", params),
  feFuncB: (params) => new SVGTOPO("feFuncB", params),
  feFuncG: (params) => new SVGTOPO("feFuncG", params),
  feFuncR: (params) => new SVGTOPO("feFuncR", params),
  feGaussianBlur: (params) => new SVGTOPO("feGaussianBlur", params),
  feImage: (params) => new SVGTOPO("feImage", params),
  feMerge: (params) => new SVGTOPO("feMerge", params),
  feMergeNode: (params) => new SVGTOPO("feMergeNode", params),
  feMorphology: (params) => new SVGTOPO("feMorphology", params),
  feOffset: (params) => new SVGTOPO("feOffset", params),
  fePointLight: (params) => new SVGTOPO("fePointLight", params),
  feSpecularLighting: (params) => new SVGTOPO("feSpecularLighting", params),
  feSpotLight: (params) => new SVGTOPO("feSpotLight", params),
  feTile: (params) => new SVGTOPO("feTile", params),
  feTurbulence: (params) => new SVGTOPO("feTurbulence", params),
  filter: (params) => new SVGTOPO("filter", params),
  foreignObject: (params) => new SVGTOPO("foreignObject", params),
  g: (params) => new SVGTOPO("g", params),
  image: (params) => new SVGTOPO("image", params),
  line: (params) => new SVGTOPO("line", params),
  linearGradient: (params) => new SVGTOPO("linearGradient", params),
  marker: (params) => new SVGTOPO("marker", params),
  mask: (params) => new SVGTOPO("mask", params),
  metadata: (params) => new SVGTOPO("metadata", params),
  mpath: (params) => new SVGTOPO("mpath", params),
  path: (params) => new SVGTOPO("path", params),
  pattern: (params) => new SVGTOPO("pattern", params),
  polygon: (params) => new SVGTOPO("polygon", params),
  polyline: (params) => new SVGTOPO("polyline", params),
  radialGradient: (params) => new SVGTOPO("radialGradient", params),
  rect: (params) => new SVGTOPO("rect", params),
  script: (params) => new SVGTOPO("script", params),
  set: (params) => new SVGTOPO("set", params),
  stop: (params) => new SVGTOPO("stop", params),
  style: (params) => new SVGTOPO("style", params),
  svg: (params) => new SVGTOPO("svg", params),
  switch: (params) => new SVGTOPO("switch", params),
  symbol: (params) => new SVGTOPO("symbol", params),
  text: (params) => new SVGTOPO("text", params),
  textPath: (params) => new SVGTOPO("textPath", params),
  title: (params) => new SVGTOPO("title", params),
  tspan: (params) => new SVGTOPO("tspan", params),
  use: (params) => new SVGTOPO("use", params),
  view: (params) => new SVGTOPO("view", params),
};

export default SVGTopo;
