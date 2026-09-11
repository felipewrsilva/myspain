import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[22%] bg-[#c8102e] font-[family-name:var(--font-display)] font-extrabold leading-none text-[#f6efe4]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="translate-y-[0.5px] text-[0.72em]">M</span>
    </span>
  );
}
