import { useEffect, useRef, useState, useCallback } from "react";

// ── Canvas dimensions — 9:16 mobile reel format ───────────────────────────────
const CW = 390;
const CH = 693;
const CAR_W = 28;
const CAR_H = 52;

// ── Physics ────────────────────────────────────────────────────────────────────
const ACCEL = 0.15;
const FRICTION = 0.90;
const MAX_SPD = 3.8;
const MAX_REV = 2.0;
const TURN = 2.4;

function toRad(d) { return d * Math.PI / 180; }

function getCorners(x, y, w, h, a) {
  const cos = Math.cos(toRad(a)), sin = Math.sin(toRad(a));
  const hw = w / 2, hh = h / 2;
  return [[-hw,-hh],[hw,-hh],[hw,hh],[-hw,hh]].map(([px,py]) => ({
    x: x + px*cos - py*sin,
    y: y + px*sin + py*cos,
  }));
}

function satOverlap(A, B) {
  for (const poly of [A, B]) {
    for (let i = 0; i < poly.length; i++) {
      const j = (i+1) % poly.length;
      const ax = -(poly[j].y - poly[i].y), ay = poly[j].x - poly[i].x;
      const dotsA = A.map(c => c.x*ax + c.y*ay);
      const dotsB = B.map(c => c.x*ax + c.y*ay);
      if (Math.max(...dotsA) < Math.min(...dotsB) || Math.max(...dotsB) < Math.min(...dotsA)) return false;
    }
  }
  return true;
}

function overlapScore(carC, spotC, spotW, spotH, spotAngle, carAngle) {
  const cxs = carC.map(c=>c.x), cys = carC.map(c=>c.y);
  const sxs = spotC.map(c=>c.x), sys = spotC.map(c=>c.y);
  const ix = Math.max(0, Math.min(Math.max(...cxs),Math.max(...sxs)) - Math.max(Math.min(...cxs),Math.min(...sxs)));
  const iy = Math.max(0, Math.min(Math.max(...cys),Math.max(...sys)) - Math.max(Math.min(...cys),Math.min(...sys)));
  const areaRatio = Math.min(1, (ix*iy) / (CAR_W * CAR_H));
  const ad = Math.abs(((carAngle - spotAngle) % 360 + 360) % 360);
  const angleFactor = Math.max(0, 1 - Math.min(ad, 360-ad) / 40);
  return Math.min(1, areaRatio * angleFactor);
}

// ── Scenarios ─────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 1,
    tag: "🅿️ PARALLEL PARK",
    title: "Street Parallel",
    tip: "Signal → check mirrors → reverse slowly between the two cars",
    gradient: ["#0f172a", "#1e3a5f"],
    accent: "#3b82f6",
    road: { x: 240, y: 0, w: 150, h: CH },
    spot: { x: 315, y: 340, w: 50, h: 105, angle: 0 },
    obstacles: [
      { cx: 315, cy: 185, angle: 0, color: "#ef4444" },
      { cx: 315, cy: 495, angle: 0, color: "#10b981" },
    ],
    start: { x: 120, y: 340, angle: 0 },
    arrowPath: [
      { x: 120, y: 340 }, { x: 250, y: 340 }, { x: 315, y: 300 }, { x: 315, y: 340 }
    ],
  },
  {
    id: 2,
    tag: "⬛ BAY PARK",
    title: "Reverse Bay",
    tip: "Pass the bay, reverse straight in. Keep both lines visible",
    gradient: ["#0f0f0f", "#1a1a2e"],
    accent: "#a855f7",
    road: { x: 0, y: 200, w: CW, h: 130 },
    spot: { x: 195, y: 410, w: 54, h: 95, angle: 0 },
    obstacles: [
      { cx: 90,  cy: 410, angle: 0, color: "#f59e0b" },
      { cx: 300, cy: 410, angle: 0, color: "#6366f1" },
    ],
    start: { x: 195, y: 255, angle: 0 },
    arrowPath: [
      { x: 195, y: 255 }, { x: 195, y: 310 }, { x: 195, y: 410 }
    ],
  },
  {
    id: 3,
    tag: "📐 ANGLE PARK",
    title: "45° Diagonal",
    tip: "Align your bumper with the line, then steer hard into the slot",
    gradient: ["#0d1117", "#162032"],
    accent: "#f59e0b",
    road: { x: 0, y: 420, w: CW, h: 130 },
    spot: { x: 195, y: 295, w: 50, h: 95, angle: -45 },
    obstacles: [
      { cx: 90,  cy: 295, angle: -45, color: "#ec4899" },
      { cx: 300, cy: 295, angle: -45, color: "#14b8a6" },
    ],
    start: { x: 195, y: 530, angle: 0 },
    arrowPath: [
      { x: 195, y: 530 }, { x: 195, y: 450 }, { x: 195, y: 295 }
    ],
  },
  {
    id: 4,
    tag: "↩️ U-TURN PARK",
    title: "U-Turn Entry",
    tip: "U-turn on the wide road, straighten up, pull into the spot",
    gradient: ["#0a0a0a", "#1c1c1c"],
    accent: "#22d3ee",
    road: { x: 0, y: 160, w: CW, h: 120 },
    spot: { x: 100, y: 360, w: 52, h: 95, angle: 180 },
    obstacles: [
      { cx: 240, cy: 360, angle: 180, color: "#f97316" },
      { cx: 100, cy: 490, angle: 0,   color: "#8b5cf6" },
    ],
    start: { x: 300, y: 220, angle: 0 },
    arrowPath: [
      { x: 300, y: 220 }, { x: 100, y: 220 }, { x: 60, y: 290 }, { x: 100, y: 360 }
    ],
  },
  {
    id: 5,
    tag: "🌙 NIGHT PARK",
    title: "Tight Night Spot",
    tip: "Use your headlights to judge distance to the curb",
    gradient: ["#020408", "#050d18"],
    accent: "#facc15",
    road: { x: 200, y: 0, w: 190, h: CH },
    spot: { x: 295, y: 340, w: 50, h: 100, angle: 0 },
    obstacles: [
      { cx: 295, cy: 185, angle: 0, color: "#64748b" },
      { cx: 295, cy: 495, angle: 0, color: "#475569" },
    ],
    start: { x: 100, y: 340, angle: 0 },
    nightMode: true,
    arrowPath: [
      { x: 100, y: 340 }, { x: 220, y: 340 }, { x: 295, y: 295 }, { x: 295, y: 340 }
    ],
  },
];

// ── Draw car ───────────────────────────────────────────────────────────────────
function drawCar(ctx, x, y, angle, color, isPlayer, nightMode = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(toRad(angle));
  const W = CAR_W, H = CAR_H, hw = W/2, hh = H/2, r = 6;

  // Shadow
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = isPlayer ? 16 : 8;
  ctx.shadowOffsetY = 4;

  // Body
  ctx.beginPath();
  ctx.moveTo(-hw+r,-hh); ctx.lineTo(hw-r,-hh); ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
  ctx.lineTo(hw,hh-r); ctx.quadraticCurveTo(hw,hh,hw-r,hh);
  ctx.lineTo(-hw+r,hh); ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
  ctx.lineTo(-hw,-hh+r); ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // Sheen
  const sheen = ctx.createLinearGradient(-hw,-hh,hw*0.3,hh*0.4);
  sheen.addColorStop(0,"rgba(255,255,255,0.25)");
  sheen.addColorStop(1,"rgba(0,0,0,0.12)");
  ctx.fillStyle = sheen;
  ctx.fill();
  ctx.shadowColor = "transparent";

  // Roof
  const rw = hw*0.7, rt = -hh*0.12, rb = hh*0.42;
  ctx.beginPath();
  ctx.roundRect(-rw, rt, rw*2, rb-rt, 4);
  const roofG = ctx.createLinearGradient(-rw,rt,rw,rb);
  roofG.addColorStop(0,"rgba(0,0,0,0.6)");
  roofG.addColorStop(1,"rgba(0,0,0,0.75)");
  ctx.fillStyle = roofG;
  ctx.fill();

  // Windshield
  ctx.beginPath();
  ctx.moveTo(-rw+2,rt); ctx.lineTo(rw-2,rt);
  ctx.lineTo(hw*0.82,-hh+9); ctx.lineTo(-hw*0.82,-hh+9); ctx.closePath();
  const wg = ctx.createLinearGradient(0,-hh+9,0,rt);
  wg.addColorStop(0,"rgba(147,210,255,0.6)"); wg.addColorStop(1,"rgba(147,210,255,0.2)");
  ctx.fillStyle = wg; ctx.fill();

  // Rear window
  ctx.beginPath();
  ctx.moveTo(-rw+2,rb); ctx.lineTo(rw-2,rb);
  ctx.lineTo(hw*0.78,hh-10); ctx.lineTo(-hw*0.78,hh-10); ctx.closePath();
  ctx.fillStyle = "rgba(147,210,255,0.25)"; ctx.fill();

  // Headlights + glow
  [[-hw*0.58,-hh+3],[hw*0.58,-hh+3]].forEach(([lx,ly])=>{
    if (isPlayer || nightMode) {
      // Glow cone
      const glow = ctx.createRadialGradient(lx,ly-2,0,lx,ly-2,nightMode?60:20);
      glow.addColorStop(0,"rgba(255,252,180,0.35)");
      glow.addColorStop(1,"rgba(255,252,180,0)");
      ctx.beginPath();
      ctx.ellipse(lx,ly-2,nightMode?50:18,nightMode?80:30,-0.1,0,Math.PI*2);
      ctx.fillStyle = glow; ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(lx,ly,4.5,2.5,0,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,252,200,0.95)"; ctx.fill();
  });

  // Taillights
  [[-hw*0.58,hh-4],[hw*0.58,hh-4]].forEach(([lx,ly])=>{
    ctx.beginPath();
    ctx.ellipse(lx,ly,4.5,2.5,0,0,Math.PI*2);
    ctx.fillStyle = isPlayer?"rgba(230,40,40,0.95)":"rgba(180,30,30,0.6)"; ctx.fill();
  });

  // Mirrors
  [[-hw-3,-hh*0.22],[hw+3,-hh*0.22]].forEach(([mx,my])=>{
    ctx.beginPath(); ctx.ellipse(mx,my,3.5,2,0,0,Math.PI*2);
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(mx,my,2.5,1.3,0,0,Math.PI*2);
    ctx.fillStyle = color; ctx.fill();
  });

  // Wheels
  [[-hw+2,-hh*0.5],[hw-2,-hh*0.5],[-hw+2,hh*0.5],[hw-2,hh*0.5]].forEach(([wx,wy])=>{
    ctx.beginPath(); ctx.ellipse(wx,wy,4.5,6,0,0,Math.PI*2);
    ctx.fillStyle="#111"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(wx,wy,2,3,0,0,Math.PI*2);
    ctx.fillStyle="#666"; ctx.fill();
  });

  // Outline
  ctx.beginPath();
  ctx.moveTo(-hw+r,-hh); ctx.lineTo(hw-r,-hh); ctx.quadraticCurveTo(hw,-hh,hw,-hh+r);
  ctx.lineTo(hw,hh-r); ctx.quadraticCurveTo(hw,hh,hw-r,hh);
  ctx.lineTo(-hw+r,hh); ctx.quadraticCurveTo(-hw,hh,-hw,hh-r);
  ctx.lineTo(-hw,-hh+r); ctx.quadraticCurveTo(-hw,-hh,-hw+r,-hh);
  ctx.closePath();
  ctx.strokeStyle="rgba(0,0,0,0.3)"; ctx.lineWidth=0.8; ctx.stroke();
  ctx.restore();
}

function drawSpot(ctx, spot, score, accent) {
  ctx.save();
  ctx.translate(spot.x, spot.y);
  ctx.rotate(toRad(spot.angle));
  const sw = spot.w, sh = spot.h;

  const fill = score > 0.82 ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.04)";
  ctx.fillStyle = fill;
  ctx.fillRect(-sw/2,-sh/2,sw,sh);

  const borderColor = score > 0.82 ? "#10b981" : score > 0.5 ? "#f59e0b" : accent;
  ctx.setLineDash([7,5]);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.7 + score * 0.3;
  ctx.strokeRect(-sw/2,-sh/2,sw,sh);
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  ctx.font = `bold ${score > 0.82 ? 16 : 14}px monospace`;
  ctx.fillStyle = borderColor;
  ctx.globalAlpha = 0.6 + score * 0.4;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("P", 0, 0);
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawRoad(ctx, road, gradient, nightMode) {
  // Asphalt
  const rg = ctx.createLinearGradient(road.x, road.y, road.x+road.w, road.y+road.h);
  rg.addColorStop(0, nightMode ? "#111418" : "#2d3748");
  rg.addColorStop(1, nightMode ? "#0d1014" : "#252f3e");
  ctx.fillStyle = rg;
  ctx.fillRect(road.x, road.y, road.w, road.h);

  // Lane marking
  ctx.setLineDash([16,12]);
  ctx.strokeStyle = nightMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.5;
  if (road.w > road.h) {
    const cy = road.y + road.h/2;
    ctx.beginPath(); ctx.moveTo(road.x+10,cy); ctx.lineTo(road.x+road.w-10,cy); ctx.stroke();
  } else {
    const cx = road.x + road.w/2;
    ctx.beginPath(); ctx.moveTo(cx,road.y+10); ctx.lineTo(cx,road.y+road.h-10); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Curb lines
  ctx.strokeStyle = nightMode ? "rgba(255,255,180,0.15)" : "rgba(255,255,255,0.12)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (road.w > road.h) {
    ctx.moveTo(road.x, road.y); ctx.lineTo(road.x+road.w, road.y);
    ctx.moveTo(road.x, road.y+road.h); ctx.lineTo(road.x+road.w, road.y+road.h);
  } else {
    ctx.moveTo(road.x, road.y); ctx.lineTo(road.x, road.y+road.h);
    ctx.moveTo(road.x+road.w, road.y); ctx.lineTo(road.x+road.w, road.y+road.h);
  }
  ctx.stroke();
}

function drawArrow(ctx, path, progress, accent) {
  if (!path || path.length < 2) return;
  const total = path.length - 1;
  const drawn = progress * total;
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i <= Math.floor(drawn); i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  const frac = drawn - Math.floor(drawn);
  if (Math.floor(drawn) < total) {
    const a = path[Math.floor(drawn)], b = path[Math.floor(drawn)+1];
    ctx.lineTo(a.x + (b.x-a.x)*frac, a.y + (b.y-a.y)*frac);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawNightEffect(ctx, px, py, angle) {
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(toRad(angle));
  const coneL = ctx.createRadialGradient(0,-CAR_H/2,0,0,-CAR_H/2,200);
  coneL.addColorStop(0,"rgba(255,252,180,0.12)");
  coneL.addColorStop(1,"rgba(255,252,180,0)");
  ctx.beginPath();
  ctx.moveTo(0,-CAR_H/2);
  ctx.lineTo(-70,-CAR_H/2-200);
  ctx.lineTo(70,-CAR_H/2-200);
  ctx.closePath();
  ctx.fillStyle = coneL;
  ctx.fill();
  ctx.restore();
}

function drawGroundTexture(ctx, nightMode) {
  ctx.fillStyle = nightMode ? "#080c10" : "#1a2332";
  ctx.fillRect(0, 0, CW, CH);
  // Subtle grid
  ctx.strokeStyle = nightMode ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.025)";
  ctx.lineWidth = 0.5;
  for (let gx = 0; gx < CW; gx += 30) {
    ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,CH); ctx.stroke();
  }
  for (let gy = 0; gy < CH; gy += 30) {
    ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(CW,gy); ctx.stroke();
  }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ParkingReelComponent() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const keysRef = useRef({});
  const rafRef = useRef(null);
  const arrowRef = useRef(0); // 0→1 progress

  const [sceneIdx, setSceneIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("playing"); // playing|parked|crashed
  const [attempts, setAttempts] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null);

  const scene = SCENARIOS[sceneIdx];

  const initState = useCallback(() => {
    const sc = SCENARIOS[sceneIdx];
    stateRef.current = { x: sc.start.x, y: sc.start.y, angle: sc.start.angle, speed: 0 };
    arrowRef.current = 0;
    setScore(0);
    setStatus("playing");
    setShowArrow(true);
  }, [sceneIdx]);

  useEffect(() => { initState(); }, [initState]);

  // Keyboard
  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.key] = true;
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
      if (showArrow) setShowArrow(false);
    };
    const up = (e) => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [showArrow]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      const s = stateRef.current;
      const keys = keysRef.current;
      const sc = SCENARIOS[sceneIdx];

      // Arrow animation
      if (showArrow) {
        arrowRef.current = Math.min(1, arrowRef.current + 0.008);
      }

      if (s && status === "playing") {
        const fwd = keys["ArrowUp"]||keys["w"]||keys["W"] ? 1 : keys["ArrowDown"]||keys["s"]||keys["S"] ? -1 : 0;
        const trn = keys["ArrowLeft"]||keys["a"]||keys["A"] ? -1 : keys["ArrowRight"]||keys["d"]||keys["D"] ? 1 : 0;

        s.speed += fwd * ACCEL;
        s.speed *= FRICTION;
        s.speed = Math.max(-MAX_REV, Math.min(MAX_SPD, s.speed));

        if (Math.abs(s.speed) > 0.08) {
          s.angle += trn * TURN * (s.speed / MAX_SPD) * Math.sign(s.speed);
        }
        s.x += Math.sin(toRad(s.angle)) * s.speed;
        s.y -= Math.cos(toRad(s.angle)) * s.speed;
        s.x = Math.max(CAR_H/2, Math.min(CW - CAR_H/2, s.x));
        s.y = Math.max(CAR_H/2, Math.min(CH - CAR_H/2, s.y));

        const carC = getCorners(s.x, s.y, CAR_W, CAR_H, s.angle);
        let crashed = false;
        for (const obs of sc.obstacles) {
          if (satOverlap(carC, getCorners(obs.cx, obs.cy, CAR_W, CAR_H, obs.angle))) { crashed = true; break; }
        }
        if (crashed) { setStatus("crashed"); setAttempts(a => a+1); }

        const spotC = getCorners(sc.spot.x, sc.spot.y, sc.spot.w, sc.spot.h, sc.spot.angle);
        const sc2 = overlapScore(carC, spotC, sc.spot.w, sc.spot.h, sc.spot.angle, s.angle);
        setScore(sc2);
        if (sc2 > 0.82 && Math.abs(s.speed) < 0.25) { setStatus("parked"); setAttempts(a => a+1); }
      }

      // ── DRAW ───────────────────────────────────────────────────────────────
      const s2 = stateRef.current;
      const currentScore = score;
      const scn = SCENARIOS[sceneIdx];
      const nm = !!scn.nightMode;

      drawGroundTexture(ctx, nm);
      drawRoad(ctx, scn.road, scn.gradient, nm);

      // Night headlight cone
      if (nm && s2) drawNightEffect(ctx, s2.x, s2.y, s2.angle);

      // Spot
      drawSpot(ctx, scn.spot, currentScore, scn.accent);

      // Arrow guide
      if (showArrow && arrowRef.current > 0) {
        drawArrow(ctx, scn.arrowPath, arrowRef.current, scn.accent);
      }

      // Obstacle cars
      for (const obs of scn.obstacles) drawCar(ctx, obs.cx, obs.cy, obs.angle, obs.color, false, nm);

      // Player car
      if (s2) {
        const flash = status === "crashed" && Math.floor(Date.now()/130) % 2 === 0;
        drawCar(ctx, s2.x, s2.y, s2.angle, flash ? "#ef4444" : "#2563eb", true, nm);
      }

      // Crash vignette
      if (status === "crashed") {
        const vg = ctx.createRadialGradient(CW/2,CH/2,80,CW/2,CH/2,CW);
        vg.addColorStop(0,"rgba(220,38,38,0)");
        vg.addColorStop(1,"rgba(220,38,38,0.35)");
        ctx.fillStyle = vg; ctx.fillRect(0,0,CW,CH);
      }
      if (status === "parked") {
        const vg = ctx.createRadialGradient(CW/2,CH/2,60,CW/2,CH/2,CW);
        vg.addColorStop(0,"rgba(16,185,129,0)");
        vg.addColorStop(1,"rgba(16,185,129,0.2)");
        ctx.fillStyle = vg; ctx.fillRect(0,0,CW,CH);
      }

      // ── HUD overlay (drawn on canvas for clean reel capture) ─────────────

      // Top bar background
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.beginPath();
      ctx.roundRect(12, 12, CW-24, 52, 12);
      ctx.fill();

      // Scenario tag pill
      ctx.fillStyle = scn.accent + "33";
      ctx.beginPath();
      ctx.roundRect(20, 20, 130, 24, 8);
      ctx.fill();
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = scn.accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(scn.tag, 28, 32);

      // Title
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(scn.title, 20, 52);

      // Score bar (right side)
      const barX = CW - 110, barY = 22, barW = 90, barH = 10;
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 5); ctx.fill();
      const barColor = currentScore > 0.82 ? "#10b981" : currentScore > 0.5 ? "#f59e0b" : scn.accent;
      ctx.fillStyle = barColor;
      ctx.beginPath(); ctx.roundRect(barX, barY, barW * Math.min(1, currentScore), barH, 5); ctx.fill();
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = barColor;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round(currentScore*100)}%`, CW-14, 27);

      // Alignment label
      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.textAlign = "right";
      ctx.fillText("ALIGNMENT", CW-14, 42);

      // Tip bar at bottom
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.beginPath();
      ctx.roundRect(12, CH-64, CW-24, 52, 12);
      ctx.fill();
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("💡 TIP", 22, CH-56);
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      // Word wrap
      const words = scn.tip.split(" ");
      let line = "", ly = CH-42;
      for (const w of words) {
        const test = line + w + " ";
        if (ctx.measureText(test).width > CW-50 && line) {
          ctx.fillText(line, 22, ly); ly += 14; line = w + " ";
        } else { line = test; }
      }
      ctx.fillText(line, 22, ly);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sceneIdx, status, score, showArrow]);

  // Mobile touch buttons
  const pressBtn = (key, down) => {
    keysRef.current[key] = down;
    if (down && showArrow) setShowArrow(false);
    setActiveBtn(down ? key : null);
  };

  const BtnStyle = (key) => ({
    base: "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 select-none transition-all duration-75 cursor-pointer",
    active: activeBtn === key ? "bg-white/30 border-white/50 scale-95" : "bg-white/10 border-white/20",
  });

  const scorePct = Math.round(score * 100);
  const scoreColor = score > 0.82 ? "#10b981" : score > 0.5 ? "#f59e0b" : scene.accent;

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-[420px]">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-white tracking-tight mb-0.5">
            Parking Reel Simulator
          </h1>
          <p className="text-[12px] text-white/40">
            Play each scenario — perfect for reel content
          </p>
        </div>

        {/* Phone frame */}
        <div
          className="relative rounded-[36px] overflow-hidden shadow-2xl"
          style={{
            width: CW,
            height: CH,
            boxShadow: `0 0 0 3px #1e293b, 0 0 0 5px #334155, 0 30px 80px rgba(0,0,0,0.8), 0 0 60px ${scene.accent}22`,
            maxWidth: "100%",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-20" />

          <canvas
            ref={canvasRef}
            width={CW}
            height={CH}
            className="block w-full h-full"
          />

          {/* Status overlays */}
          {status === "crashed" && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-black/80 backdrop-blur-md rounded-3xl px-8 py-6 text-center mx-6">
                <div className="text-4xl mb-2">💥</div>
                <p className="text-red-400 font-bold text-lg mb-1">Collision!</p>
                <p className="text-white/50 text-xs mb-4">You hit a parked car</p>
                <button
                  onPointerDown={() => initState()}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-bold border-none cursor-pointer"
                  style={{ background: scene.accent }}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {status === "parked" && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-black/80 backdrop-blur-md rounded-3xl px-8 py-6 text-center mx-6">
                <div className="text-4xl mb-2">
                  {scorePct >= 95 ? "🏆" : scorePct >= 88 ? "⭐" : "✅"}
                </div>
                <p className="font-bold text-lg mb-1" style={{ color: scoreColor }}>
                  {scorePct >= 95 ? "Perfect Park!" : scorePct >= 88 ? "Great Job!" : "Parked!"}
                </p>
                <p className="text-white/50 text-xs mb-4">
                  Score: <span className="text-white font-bold">{scorePct}%</span>
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onPointerDown={() => initState()}
                    className="px-4 py-2 rounded-xl text-white text-xs font-semibold bg-white/10 border border-white/20 cursor-pointer"
                  >
                    Retry
                  </button>
                  <button
                    onPointerDown={() => setSceneIdx(i => (i+1) % SCENARIOS.length)}
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold border-none cursor-pointer"
                    style={{ background: scene.accent }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Virtual D-pad */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
            <button
              onPointerDown={() => pressBtn("ArrowUp", true)}
              onPointerUp={() => pressBtn("ArrowUp", false)}
              onPointerLeave={() => pressBtn("ArrowUp", false)}
              className={`${BtnStyle("ArrowUp").base} ${BtnStyle("ArrowUp").active} text-white`}
            >▲</button>
            <div className="flex gap-1">
              <button
                onPointerDown={() => pressBtn("ArrowLeft", true)}
                onPointerUp={() => pressBtn("ArrowLeft", false)}
                onPointerLeave={() => pressBtn("ArrowLeft", false)}
                className={`${BtnStyle("ArrowLeft").base} ${BtnStyle("ArrowLeft").active} text-white`}
              >◀</button>
              <button
                onPointerDown={() => pressBtn("ArrowDown", true)}
                onPointerUp={() => pressBtn("ArrowDown", false)}
                onPointerLeave={() => pressBtn("ArrowDown", false)}
                className={`${BtnStyle("ArrowDown").base} ${BtnStyle("ArrowDown").active} text-white`}
              >▼</button>
              <button
                onPointerDown={() => pressBtn("ArrowRight", true)}
                onPointerUp={() => pressBtn("ArrowRight", false)}
                onPointerLeave={() => pressBtn("ArrowRight", false)}
                className={`${BtnStyle("ArrowRight").base} ${BtnStyle("ArrowRight").active} text-white`}
              >▶</button>
            </div>
          </div>
        </div>

        {/* Scenario selector */}
        <div className="w-full" style={{ maxWidth: CW }}>
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.6px] mb-2 text-center">
            Choose scenario
          </p>
          <div className="grid grid-cols-5 gap-1.5">
            {SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                onPointerDown={() => { setSceneIdx(i); }}
                className={`py-2 px-1 rounded-xl text-center border transition-all duration-150 cursor-pointer text-[9px] font-bold leading-tight
                  ${sceneIdx === i ? "border-white/30 text-white" : "border-white/8 text-white/40 hover:border-white/20"}`}
                style={{ background: sceneIdx === i ? sc.accent + "22" : "rgba(255,255,255,0.03)", borderColor: sceneIdx === i ? sc.accent + "66" : undefined }}
              >
                <div className="text-base leading-none mb-0.5">{sc.tag.split(" ")[0]}</div>
                <div className="leading-snug">{sc.title.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live score + attempts */}
        <div className="flex gap-4 w-full justify-center" style={{ maxWidth: CW }}>
          {[
            { label: "Alignment", value: `${scorePct}%`, color: scoreColor },
            { label: "Attempts", value: attempts, color: "#94a3b8" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex-1 bg-white/5 rounded-2xl p-3 text-center border border-white/8">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4px] mb-1">{label}</p>
              <p className="text-xl font-bold font-mono" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Keyboard hint */}
        <p className="text-[10px] text-white/20 text-center">
          Arrow keys or WASD · D-pad for touch
        </p>
      </div>
    </div>
  );
}