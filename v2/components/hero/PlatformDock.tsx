import { platformStates } from "@/lib/platforms";
import s from "./PlatformDock.module.css";

interface Props {
  current: number;
  onSelect: (stateIndex: number) => void;
  hintText: string;
  hintHidden: boolean;
}

export default function PlatformDock({ current, onSelect, hintText, hintHidden }: Props) {
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = Math.min(platformStates.length, Math.max(1, i + 1 + delta));
    onSelect(next);
  };

  return (
    <div className={s.wrap}>
      <div className={s.dock} role="tablist" aria-label="Software platforms">
        {platformStates.map((p, i) => {
          const stateIndex = i + 1;
          const selected = current === stateIndex;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              className={`${s.tab} ${selected ? s.tabActive : ""}`}
              aria-selected={selected}
              tabIndex={selected || (current === 0 && i === 0) ? 0 : -1}
              style={{ "--accent": p.accent } as React.CSSProperties}
              onClick={() => onSelect(stateIndex)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className={s.tick} />
              {p.dockLabel}
              {selected && <i className={s.progress} />}
            </button>
          );
        })}
      </div>
      <p className={`${s.hint} ${hintHidden ? s.hintHidden : ""}`}>
        <span>{hintText}</span>
        <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
          <path d="M6 1v10M2 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </p>
    </div>
  );
}
