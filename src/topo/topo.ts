import { ObjectWithStringKeys } from "./types";

export abstract class Topo {
  abstract element: Element;

  abstract attrs(...args: unknown[]): unknown;

  abstract addClss(...classesToAppend: string[]): unknown;
  abstract removeClss(...classestoRemove: string[]): unknown;
  abstract clean(restore: boolean): unknown;

  abstract event(
    eventName: unknown,
    fn: (ev: unknown, ele: unknown) => void
  ): unknown;
}

export class BaseTopo<T, U> {
  element: Element;
  params: U;
  constructor(element: Element, params: U) {
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
