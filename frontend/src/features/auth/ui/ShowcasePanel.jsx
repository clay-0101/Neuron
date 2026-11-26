import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { FloatingIcon } from "./FloatingIcon.jsx";

const floatingApps = [
  { app: "gmail", label: "Gmail", className: "left-[13%] top-[15%]", size: 74, rotate: -9, delay: 0.1, duration: 4.8, depth: 0.7 },
  { app: "slack", label: "Slack", className: "right-[13%] top-[13%]", size: 82, rotate: 8, delay: 0.8, duration: 5.2, depth: -0.75 },
  { app: "notion", label: "Notion", className: "left-[7%] top-[45%]", size: 72, rotate: 6, delay: 1.5, duration: 5.6, depth: 0.95 },
  { app: "drive", label: "Drive", className: "right-[8%] top-[43%]", size: 78, rotate: -7, delay: 2.2, duration: 4.6, depth: -0.9 },
  { app: "discord", label: "Discord", className: "left-[22%] bottom-[10%]", size: 70, rotate: -11, delay: 2.9, duration: 5.1, depth: 0.55 },
  { app: "calendar", label: "Calendar", className: "right-[22%] bottom-[9%]", size: 72, rotate: 10, delay: 3.6, duration: 5.8, depth: -0.6 },
  { app: "linear", label: "Linear", className: "right-[37%] top-[25%]", size: 58, rotate: 5, delay: 4.3, duration: 5.4, depth: -0.45 },
];

export function ShowcasePanel() {
  const reducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 });
  const parallaxY = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 });

  function handlePointerMove(event) {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
    rawY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 14);
  }

  function resetPointer() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <aside
      aria-labelledby="showcase-title"
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      className="showcase-panel relative m-4 hidden min-h-[calc(100vh-2rem)] overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#FAFAFA] text-[#171717] shadow-[0_12px_42px_rgba(0,0,0,0.07)] lg:flex lg:flex-col lg:items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-[clamp(3rem,9vh,6.5rem)] px-8 text-center"
      >
        <h2
          id="showcase-title"
          className="font-editorial text-[clamp(2.6rem,4vw,4.15rem)] leading-[1.02] tracking-[-0.045em]"
        >
          Meet Neuron,
        </h2>
        <p className="mx-auto mt-4 max-w-[330px] text-sm leading-6 text-[#646464]">
          and discover connections you didn&apos;t know existed.
        </p>
      </motion.div>

      <div className="showcase-stage relative flex min-h-0 w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[1] h-[min(67%,460px)] w-[min(78%,440px)]"
        >
          <motion.img
            src="/hero-head.svg"
            alt="A stippled sculptural head with an open crown."
            draggable="false"
            style={{ x: parallaxX, y: parallaxY }}
            className="h-full w-full object-contain"
          />
        </motion.div>

        {floatingApps.map((item, index) => (
          <FloatingIcon
            key={item.app}
            {...item}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
            reducedMotion={reducedMotion}
            initialDelay={0.24 + index * 0.08}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.52 }}
        className="mb-9 text-[11px] font-medium uppercase tracking-[0.2em] text-[#999]"
      >
        A little more space to think
      </motion.p>
    </aside>
  );
}
