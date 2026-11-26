import { useTransform, motion } from "framer-motion";

function AppGlyph({ app }) {
  if (app === "gmail") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M5 24V9l11 8 11-8v15" fill="none" stroke="#EA4335" strokeWidth="3.2" strokeLinejoin="round" />
        <path d="M5 11V8a2 2 0 0 1 3.2-1.6L16 12l7.8-5.6A2 2 0 0 1 27 8v3" fill="none" stroke="#4285F4" strokeWidth="3.2" strokeLinejoin="round" />
      </svg>
    );
  }
  if (app === "slack") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M12 5a2.4 2.4 0 1 1 4.8 0v7.2H12V5Zm7.2 0a2.4 2.4 0 1 1 4.8 0v2.4h-4.8V5ZM5 12a2.4 2.4 0 1 1 0 4.8h7.2V12H5Zm0 7.2a2.4 2.4 0 1 1 0 4.8H7.4v-4.8H5ZM20 27a2.4 2.4 0 1 1-4.8 0v-7.2H20V27Zm7.2-7.2a2.4 2.4 0 1 1 0 4.8h-2.4v-4.8h2.4ZM27 12a2.4 2.4 0 1 1 0 4.8h-7.2V12H27Z" fill="#36C5F0" />
        <path d="M12 5a2.4 2.4 0 1 1 4.8 0v7.2H12V5ZM5 12a2.4 2.4 0 1 1 0 4.8h7.2V12H5Z" fill="#E01E5A" />
        <path d="M20 27a2.4 2.4 0 1 1-4.8 0v-7.2H20V27Zm7.2-7.2a2.4 2.4 0 1 1 0 4.8h-2.4v-4.8h2.4Z" fill="#2EB67D" />
        <path d="M27 12a2.4 2.4 0 1 1 0 4.8h-7.2V12H27Zm-7.2-7a2.4 2.4 0 1 1 4.8 0v2.4h-4.8V5Z" fill="#ECB22E" />
      </svg>
    );
  }
  if (app === "notion") {
    return <span className="font-serif text-[30px] font-bold leading-none tracking-[-0.12em]">N</span>;
  }
  if (app === "drive") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="m11.3 5.5 5.1-.1 10.1 17.3-2.6 4.2H18L8 9.8l3.3-4.3Z" fill="#188038" />
        <path d="m11.3 5.5 5.1-.1 4.9 8.5-5.1 8.6-5.2-.1L6 13.8l5.3-8.3Z" fill="#0F9D58" />
        <path d="M6 13.8h10.2l-5.1 8.7h15.4l-2.6 4.4H8.5L5 20.7l1-6.9Z" fill="#4285F4" />
      </svg>
    );
  }
  if (app === "discord") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M25.3 8.2A23 23 0 0 0 20 6.6l-.7 1.5a21 21 0 0 0-6.6 0L12 6.6a23 23 0 0 0-5.3 1.6c-3.4 5-4.3 9.9-3.8 14.7a22 22 0 0 0 6.5 3.3L11 24c-1.2-.4-2.4-1-3.5-1.8l.9-.7a16 16 0 0 0 15.2 0l.9.7c-1.1.8-2.3 1.4-3.5 1.8l1.6 2.2a22 22 0 0 0 6.5-3.3c.6-5.5-.9-10.4-3.8-14.7Z" fill="#5865F2" />
        <circle cx="12" cy="16.5" r="1.8" fill="white" />
        <circle cx="20" cy="16.5" r="1.8" fill="white" />
      </svg>
    );
  }
  if (app === "calendar") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <rect x="5" y="7" width="22" height="21" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="1.5" />
        <path d="M5 11a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v2H5v-2Z" fill="#4285F4" />
        <path d="M11 4v6M21 4v6" stroke="#1967D2" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 17h3v3h-3z" fill="#34A853" />
        <path d="M16 17h3v3h-3z" fill="#FBBC04" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8">
      <path d="M22.8 4 10.4 16.4l-3.2-3.2L20 1l2.8 3Z" fill="#5E6AD2" />
      <path d="m9.2 17.6 12.4-12.4 3.2 3.2L12.4 20.8l-3.2-3.2Z" fill="#8B91E8" />
      <path d="m6 13.2 3.2 3.2-3.2 3.2L2.8 16.4 6 13.2Z" fill="#B2B7F8" />
    </svg>
  );
}

export function FloatingIcon({
  app,
  label,
  className,
  size,
  rotate,
  delay,
  duration,
  depth,
  parallaxX,
  parallaxY,
  reducedMotion,
  initialDelay,
}) {
  const x = useTransform(parallaxX, (value) => value * depth);
  const y = useTransform(parallaxY, (value) => value * depth);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: initialDelay, ease: "easeOut" }}
      style={{ x, y, width: size, height: size }}
      className={`pointer-events-none absolute z-[2] ${className}`}
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -9, 0], rotate: [rotate, rotate + 1.5, rotate] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration, delay, repeat: Infinity, ease: "easeInOut" }
        }
        className="grid h-full w-full place-items-center rounded-2xl border border-white/80 bg-white shadow-[0_14px_30px_rgba(26,30,40,0.13),0_2px_6px_rgba(26,30,40,0.06)]"
      >
        <span aria-label={label} className="grid h-full w-full place-items-center text-[#222]">
          <AppGlyph app={app} />
        </span>
      </motion.div>
    </motion.div>
  );
}
