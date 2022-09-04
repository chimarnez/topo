import { BaseTopo, Topo } from "./topo";
import { ObjectWithStringKeys } from "./types";

function svgLikeElement<T extends keyof SVGElementTagNameMap>(
  tagName: T
): SVGElementTagNameMap[T] {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

class SVGTOPO<T extends keyof SVGElementTagNameMap>
  extends BaseTopo<SVGTOPO<T>>
  implements Topo<T>
{
  element: SVGElementTagNameMap[T];

  constructor(tagName: T) {
    const element = svgLikeElement(tagName);
    super(element);
    this.element = element;
  }

  attrs(attrName: string, fn: (el: SVGTOPO<T>) => any): SVGTOPO<T>;
  attrs(attrName: string, value: string): SVGTOPO<T>;
  attrs(attrs: ObjectWithStringKeys): SVGTOPO<T>;
  attrs(attrs: string | ObjectWithStringKeys, value?: any): SVGTOPO<T> {
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
  event<U extends keyof SVGElementEventMap>(
    eventName: U,
    fn: (ev: SVGElementEventMap[U], ele?: SVGTOPO<T>) => void
  ) {
    const newEvent = (ev: SVGElementEventMap[U]) => {
      fn(ev, this);
    };
    this.element.addEventListener(
      eventName,
      newEvent as EventListenerOrEventListenerObject
    );
    return this;
  }
}

const SVGTopo = {
  a: () => new SVGTOPO("a"),
  animate: () => new SVGTOPO("animate"),
  animateMotion: () => new SVGTOPO("animateMotion"),
  animateTransform: () => new SVGTOPO("animateTransform"),
  circle: () => new SVGTOPO("circle"),
  clipPath: () => new SVGTOPO("clipPath"),
  defs: () => new SVGTOPO("defs"),
  desc: () => new SVGTOPO("desc"),
  ellipse: () => new SVGTOPO("ellipse"),
  feBlend: () => new SVGTOPO("feBlend"),
  feColorMatrix: () => new SVGTOPO("feColorMatrix"),
  feComponentTransfer: () => new SVGTOPO("feComponentTransfer"),
  feComposite: () => new SVGTOPO("feComposite"),
  feConvolveMatrix: () => new SVGTOPO("feConvolveMatrix"),
  feDiffuseLighting: () => new SVGTOPO("feDiffuseLighting"),
  feDisplacementMap: () => new SVGTOPO("feDisplacementMap"),
  feDistantLight: () => new SVGTOPO("feDistantLight"),
  feDropShadow: () => new SVGTOPO("feDropShadow"),
  feFlood: () => new SVGTOPO("feFlood"),
  feFuncA: () => new SVGTOPO("feFuncA"),
  feFuncB: () => new SVGTOPO("feFuncB"),
  feFuncG: () => new SVGTOPO("feFuncG"),
  feFuncR: () => new SVGTOPO("feFuncR"),
  feGaussianBlur: () => new SVGTOPO("feGaussianBlur"),
  feImage: () => new SVGTOPO("feImage"),
  feMerge: () => new SVGTOPO("feMerge"),
  feMergeNode: () => new SVGTOPO("feMergeNode"),
  feMorphology: () => new SVGTOPO("feMorphology"),
  feOffset: () => new SVGTOPO("feOffset"),
  fePointLight: () => new SVGTOPO("fePointLight"),
  feSpecularLighting: () => new SVGTOPO("feSpecularLighting"),
  feSpotLight: () => new SVGTOPO("feSpotLight"),
  feTile: () => new SVGTOPO("feTile"),
  feTurbulence: () => new SVGTOPO("feTurbulence"),
  filter: () => new SVGTOPO("filter"),
  foreignObject: () => new SVGTOPO("foreignObject"),
  g: () => new SVGTOPO("g"),
  image: () => new SVGTOPO("image"),
  line: () => new SVGTOPO("line"),
  linearGradient: () => new SVGTOPO("linearGradient"),
  marker: () => new SVGTOPO("marker"),
  mask: () => new SVGTOPO("mask"),
  metadata: () => new SVGTOPO("metadata"),
  mpath: () => new SVGTOPO("mpath"),
  path: () => new SVGTOPO("path"),
  pattern: () => new SVGTOPO("pattern"),
  polygon: () => new SVGTOPO("polygon"),
  polyline: () => new SVGTOPO("polyline"),
  radialGradient: () => new SVGTOPO("radialGradient"),
  rect: () => new SVGTOPO("rect"),
  script: () => new SVGTOPO("script"),
  set: () => new SVGTOPO("set"),
  stop: () => new SVGTOPO("stop"),
  style: () => new SVGTOPO("style"),
  svg: () => new SVGTOPO("svg"),
  switch: () => new SVGTOPO("switch"),
  symbol: () => new SVGTOPO("symbol"),
  text: () => new SVGTOPO("text"),
  textPath: () => new SVGTOPO("textPath"),
  title: () => new SVGTOPO("title"),
  tspan: () => new SVGTOPO("tspan"),
  use: () => new SVGTOPO("use"),
  view: () => new SVGTOPO("view"),
};

export const {
  a: svgA,
  animate,
  animateMotion,
  animateTransform,
  circle,
  clipPath,
  defs,
  desc,
  ellipse,
  feBlend,
  feColorMatrix,
  feComponentTransfer,
  feComposite,
  feConvolveMatrix,
  feDiffuseLighting,
  feDisplacementMap,
  feDistantLight,
  feDropShadow,
  feFlood,
  feFuncA,
  feFuncB,
  feFuncG,
  feFuncR,
  feGaussianBlur,
  feImage,
  feMerge,
  feMergeNode,
  feMorphology,
  feOffset,
  fePointLight,
  feSpecularLighting,
  feSpotLight,
  feTile,
  feTurbulence,
  filter,
  foreignObject,
  g,
  image,
  line,
  linearGradient,
  marker,
  mask,
  metadata,
  mpath,
  path,
  pattern,
  polygon,
  polyline,
  radialGradient,
  rect,
  script: svgScript,
  set,
  stop,
  style: svgStyle,
  svg,
  switch: svgSwitch,
  symbol,
  text,
  textPath,
  title: svgTitle,
  tspan,
  use,
  view,
} = SVGTopo;

export default SVGTopo;
