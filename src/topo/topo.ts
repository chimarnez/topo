import { ObjectWithStringKeys } from "./types";

export abstract class Topo<T> {
  abstract element: Element;

  abstract attrs(attrName: string, fn: (el: Topo<T>) => any): Topo<T>;
  abstract attrs(attrName: string, value: string): Topo<T>;
  abstract attrs(attrs: ObjectWithStringKeys): Topo<T>;
  abstract attrs(attrs: string | ObjectWithStringKeys, value?: any): Topo<T>;

  abstract addClss(...classesToAppend: string[]): Topo<T>;
  abstract removeClss(...classestoRemove: string[]): Topo<T>;

  abstract event<V extends keyof ElementEventMap>(
    eventName: V,
    fn: (ev: ElementEventMap[V], ele?: Topo<T>) => void
  ): Topo<T>;
}

export class BaseTopo<T, U> {
  element: Element;
  params?: U;
  constructor(element: Element, params?: U) {
    this.element = element;
    this.params = params;
  }

  addClss(...classesToAppend: string[]) {
    for (let c of classesToAppend) {
      if (!this.element.classList.contains(c)) {
        this.element.classList.add(c);
      }
    }
    return this as unknown as T;
  }
  removeClss(...classestoRemove: string[]) {
    for (let c of classestoRemove) {
      if (this.element.classList.contains(c)) {
        this.element.classList.remove(c);
      }
    }
    return this as unknown as T;
  }
  selfProps(fn: (l: T) => any) {
    fn(this as unknown as T);
    return this as unknown as T;
  }

  into(container: Element) {
    container.appendChild(this.element);
    return this as unknown as T;
  }
  addTopos(...topos: BaseTopo<unknown, unknown>[]) {
    topos.forEach((topo) => this.element.appendChild(topo.element));
    return this as unknown as T;
  }
  style(styleProps: {
    [Property in keyof ElementCSSInlineStyle["style"]]?: ElementCSSInlineStyle["style"][Property];
  }) {
    for (let key in styleProps) {
      (this.element as any).style[key] = styleProps[key];
    }
    return this as unknown as T;
  }
  opera<Y>(o: (topo: T) => Y) {
    return o(this as unknown as T);
  }
}
