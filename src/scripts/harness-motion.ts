import { phaseFor, pieces, space, storyboard, type Frame, type PieceId, type Pose, type Scene, type Wire } from './harness-storyboard';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const mix = (a: number, b: number, progress: number) => a + (b - a) * progress;
const ease = (value: number) => value * value * (3 - 2 * value);
const wireKey = ({ from, to, kind }: Wire) => from + ':' + to + ':' + kind;

export function pieceStyle(pose: Pose, pitch = 0, yaw = 0) {
  return {
    '--hs-piece-width': pose.width + 'px',
    '--hs-piece-height': pose.height + 'px',
    transform: [
      'translate3d(' + pose.x + 'px,' + pose.y + 'px,' + pose.depth + 'px)',
      'translate(-50%, -50%)',
      'rotateZ(' + pose.angle + 'deg)',
      'rotateX(' + pitch + 'deg)',
      'rotateY(' + yaw + 'deg)',
    ].join(' '),
  };
}

function project({ x, y, width, height, depth }: Pose) {
  const cx = space.width / 2;
  const cy = space.height / 2;
  const scale = space.perspective / (space.perspective - depth);
  return { x: cx + (x - cx) * scale, y: cy + (y - cy) * scale, width: width * scale, height: height * scale };
}

export function wireStyle(from: Pose, to: Pose, length = 1) {
  const a = project(from);
  const b = project(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy);
  const inset = (width: number, height: number) => Math.min(
    dx === 0 ? Infinity : width / (2 * Math.abs(dx)),
    dy === 0 ? Infinity : height / (2 * Math.abs(dy)),
    0.5,
  );
  const start = inset(a.width, a.height);
  const end = inset(b.width, b.height);
  return {
    width: Math.max(0, distance * (1 - start - end) - 12) + 'px',
    transform: 'translate(' + (a.x + dx * start + dx / (distance || 1) * 6) + 'px,' + (a.y + dy * start + dy / (distance || 1) * 6) + 'px) rotate(' + Math.atan2(dy, dx) + 'rad) scaleX(' + length + ')',
  };
}

function folded(pose: Pose, anchor: Pose | undefined, direction: number): Pose {
  return {
    x: anchor?.x ?? pose.x + 55 * direction,
    y: anchor?.y ?? pose.y + 58,
    width: pose.width * 0.72,
    height: pose.height * 0.72,
    depth: (anchor?.depth ?? pose.depth) - 145,
    angle: direction * 12,
  };
}

export function mountHarnessScene(stage: HTMLElement) {
  const wires = stage.querySelector<HTMLElement>('[data-hs-wires]');
  const caption = stage.parentElement?.querySelector<HTMLElement>('[data-hs-caption]');
  const phase = stage.parentElement?.querySelector<HTMLElement>('[data-hs-phase]');
  if (!wires) return;

  const parts = [...stage.querySelectorAll<HTMLElement>('[data-hs-piece]')].map(element => {
    const id = element.dataset.hsPiece as PieceId;
    return { element, id, origin: pieces[id].origin as PieceId | undefined };
  });

  const lines = new Map<string, { wire: Wire; element: HTMLElement }>();
  const sceneWires = new Map<string, Set<string>>();
  for (const [scene, frame] of Object.entries<Frame>(storyboard)) {
    const keys = new Set<string>();
    for (const wire of frame.wires ?? []) {
      const key = wireKey(wire);
      keys.add(key);
      if (lines.has(key)) continue;
      const element = document.createElement('span');
      element.className = 'hs-wire';
      element.dataset.kind = wire.kind;
      element.hidden = true;
      wires.append(element);
      lines.set(key, { wire, element });
    }
    sceneWires.set(scene, keys);
  }

  const positions: Partial<Record<PieceId, Pose>> = {};
  let lastFrom: Scene | undefined;
  let lastTo: Scene | undefined;
  let lastProgress = -1;

  function resize() {
    const scale = Math.min(stage.clientWidth / space.width, stage.clientHeight / space.height);
    if (scale > 0) stage.style.setProperty('--hs-zoom', String(scale));
  }

  function render(from: Scene, to: Scene, progress: number) {
    if (from === lastFrom && to === lastTo && progress === lastProgress) return;
    lastFrom = from;
    lastTo = to;
    lastProgress = progress;

    const scene = progress < 0.5 ? from : to;
    if (stage.dataset.scene !== scene) {
      stage.dataset.scene = scene;
      if (caption) caption.textContent = storyboard[scene].caption;
      if (phase) phase.textContent = phaseFor(scene);
    }

    const start: Frame = storyboard[from];
    const end: Frame = storyboard[to];
    for (const [index, { id, element, origin }] of parts.entries()) {
      const first = start.poses[id];
      const last = end.poses[id];
      const base = first ?? last;
      if (!base || (!first && progress === 0) || (!last && progress === 1)) {
        if (!element.hidden) element.hidden = true;
        delete positions[id];
        continue;
      }

      const direction = index % 2 ? 1 : -1;
      const source = id === 'core' ? start.poses.skill ?? start.poses.package : origin ? start.poses[origin] : undefined;
      const a = first ?? folded(base, source, direction);
      const destination = origin ? end.poses[origin] : undefined;
      const b = last ?? folded(base, destination, direction);
      const delay = first && last ? 0 : (index % 5) * 0.035;
      const t = ease(clamp((progress - delay) / (1 - delay)));
      const travel = Math.min(1, Math.hypot(b.x - a.x, b.y - a.y, b.depth - a.depth) / 175);
      const arc = Math.sin(t * Math.PI) * travel;
      const pose = {
        x: mix(a.x, b.x, t),
        y: mix(a.y, b.y, t) - arc * 11,
        width: mix(a.width, b.width, t),
        height: mix(a.height, b.height, t),
        depth: mix(a.depth, b.depth, t) + arc * (pieces[id].shape === 'cube' ? 50 : 15),
        angle: mix(a.angle, b.angle, t),
      };
      const parent = id === 'goal' ? positions.team : undefined;
      if (parent) {
        pose.width = Math.min(pose.width, Math.max(1, parent.width - 32));
        pose.height = Math.min(pose.height, Math.max(1, parent.height - 50));
        const left = parent.x - parent.width / 2 + pose.width / 2 + 12;
        const right = parent.x + parent.width / 2 - pose.width / 2 - 12;
        const top = parent.y - parent.height / 2 + pose.height / 2 + 32;
        const bottom = parent.y + parent.height / 2 - pose.height / 2 - 12;
        pose.x = Math.max(left, Math.min(right, pose.x));
        pose.y = Math.max(top, Math.min(bottom, pose.y));
      }
      const isCube = pieces[id].shape === 'cube';
      const style = pieceStyle(pose, -arc * (isCube ? 13 : 3), direction * arc * (isCube ? 20 : 4));
      element.style.setProperty('--hs-piece-width', style['--hs-piece-width']);
      element.style.setProperty('--hs-piece-height', style['--hs-piece-height']);
      element.style.transform = style.transform;
      element.style.opacity = String(first && last ? 1 : first ? 1 - t : t);
      if (element.hidden) element.hidden = false;
      positions[id] = pose;
    }

    const before = sceneWires.get(from);
    const after = sceneWires.get(to);
    for (const [key, { wire, element }] of lines) {
      const existed = before?.has(key);
      const exists = after?.has(key);
      const a = positions[wire.from];
      const b = positions[wire.to];
      const length = existed && exists ? 1 : exists
        ? ease(clamp((progress - 0.22) / 0.78))
        : existed ? 1 - ease(clamp(progress / 0.55)) : 0;

      const hidden = !a || !b || length === 0;
      if (element.hidden !== hidden) element.hidden = hidden;
      if (!a || !b || hidden) continue;
      const style = wireStyle(a, b, length);
      element.style.width = style.width;
      element.style.transform = style.transform;
      element.style.opacity = String(Math.min(1, length * 2.5));
    }
  }

  return { render, resize };
}
