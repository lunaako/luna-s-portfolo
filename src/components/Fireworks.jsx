import { useEffect, useRef, useCallback } from "react";

const COLORS = [
  "#38bdf8", "#f472b6", "#facc15", "#4ade80",
  "#a78bfa", "#fb923c", "#f87171", "#2dd4bf",
];

class Particle {
  constructor(x, y, color, velocity, decay, gravity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = velocity.x;
    this.vy = velocity.y;
    this.alpha = 1;
    this.decay = decay;
    this.gravity = gravity;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

function createBurst(x, y) {
  const particles = [];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const count = 80 + Math.floor(Math.random() * 40);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 6 + 2;
    particles.push(
      new Particle(
        x, y, color,
        { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        0.012 + Math.random() * 0.008,
        0.04
      )
    );
  }
  return particles;
}

const Fireworks = ({ active, onFinished }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const burstTimerRef = useRef(null);
  const burstCountRef = useRef(0);

  const stop = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    animRef.current = null;
    burstTimerRef.current = null;
    particlesRef.current = [];
    burstCountRef.current = 0;
    onFinished?.();
  }, [onFinished]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const maxBursts = 8;

    const scheduleBurst = () => {
      if (burstCountRef.current >= maxBursts) return;
      const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
      const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
      particlesRef.current.push(...createBurst(x, y));
      burstCountRef.current++;
      if (burstCountRef.current < maxBursts) {
        burstTimerRef.current = setTimeout(scheduleBurst, 400 + Math.random() * 300);
      }
    };

    scheduleBurst();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);
      particlesRef.current.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      if (particlesRef.current.length === 0 && burstCountRef.current >= maxBursts) {
        stop();
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    };
  }, [active, stop]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
    />
  );
};

export default Fireworks;
