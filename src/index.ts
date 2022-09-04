import * as html from "./topo/html-topo";
import * as svg from "./topo/svg-topo";
import HTMLTopo from "./topo/html-topo";
import SVGTopo from "./topo/svg-topo";

const topo: typeof html | typeof svg = {
  ...html,
  ...svg,
};

export { HTMLTopo, SVGTopo };
export default topo;
