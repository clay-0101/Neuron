import { Sparkles } from "lucide-react";

export function BrandMark({ compact = false }) {
  return (
    <div className="brand-mark flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e8e6e3] text-[#171717]">
        <Sparkles size={18} strokeWidth={1.8} />
      </span>
      {!compact && <span className="brand-mark-name text-[19px] font-medium tracking-[-0.04em] text-ink">Neuron</span>}
    </div>
  );
}
