"use client";

import { heroStates, SEGMENTS } from "@/lib/platforms";
import s from "./Altimeter.module.css";

/**
 * Film-style chapter rail: 7 nodes (intro + 6 platforms) down the hero's right
 * edge, with a live label. Purely a visual/narrative aid, so aria-hidden, because
 * the PlatformDock already provides the accessible tablist (no duplicate tabs).
 * Desktop >= 1280 only.
 */
export default function Altimeter({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (stateIndex: number) => void;
}) {
  const label = heroStates[current]?.dockLabel ?? "Overview";

  return (
    <div className={s.rail} aria-hidden="true">
      <span className={s.label}>{label}</span>
      <div className={s.track} style={{ "--progress": current / SEGMENTS } as React.CSSProperties}>
        {heroStates.map((state, i) => (
          <button
            key={state.id}
            type="button"
            tabIndex={-1}
            className={`${s.node} ${i === current ? s.active : ""} ${i < current ? s.past : ""}`}
            style={{ "--accent": state.accent } as React.CSSProperties}
            onClick={() => onSelect(i)}
          >
            <span className={s.tick} />
          </button>
        ))}
      </div>
      <span className={s.count}>
        {String(current).padStart(2, "0")}
        <i>/{String(heroStates.length - 1).padStart(2, "0")}</i>
      </span>
    </div>
  );
}
