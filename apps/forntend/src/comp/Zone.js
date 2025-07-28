
export const zones = {
  class: { x: [-2100,-950 ], y: [555,1020 ] },
  drawRoom: { x: [-2100, -950], y: [-1080, -450] },
  Game: { x: [1365, 2080], y: [-1045, 1020] },
  call:{x:[-245,355],y:[-1080,-780]}
};

const common="common"

export function getZoneFromCoords(x, y) {
  for (const [name, bounds] of Object.entries(zones)) {
    if (
      x >= bounds.x[0] && x <= bounds.x[1] &&
      y >= bounds.y[0] && y <= bounds.y[1]
    ) {
      return name;
    }
  }
  return common;
}


