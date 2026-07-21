import s from "./Chrome.module.css";

/**
 * Shared window chrome for the recreated screens.
 * variant "browser": dark tab strip + URL bar (web apps).
 * variant "windows": dark app title bar (desktop apps).
 */
interface Props {
  variant: "browser" | "windows";
  title: string;
  url?: string;
  accent?: string;
}

export default function Chrome({ variant, title, url = "", accent = "#cf982f" }: Props) {
  if (variant === "windows") {
    return (
      <div className={s.windows} style={{ "--accent": accent } as React.CSSProperties}>
        <span className={s.winDot} />
        <span className={s.winTitle}>{title}</span>
        <span className={s.winControls}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1 5h8" stroke="#9a9a9a" strokeWidth="1.2" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="#9a9a9a" strokeWidth="1.2" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1.5 1.5 8.5 8.5M8.5 1.5 1.5 8.5" stroke="#9a9a9a" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div style={{ "--accent": accent } as React.CSSProperties}>
      <div className={s.tabStrip}>
        <span className={s.traffic} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={s.tab}>
          <span className={s.tabDot} />
          <span className={s.tabTitle}>{title}</span>
          <span className={s.tabX}>×</span>
        </span>
        <span className={s.tabPlus}>+</span>
      </div>
      <div className={s.urlBar}>
        <span className={s.navArrows}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M9 2 4 7l5 5" fill="none" stroke="#9a9a9a" strokeWidth="1.6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="m5 2 5 5-5 5" fill="none" stroke="#5c5c5c" strokeWidth="1.6" />
          </svg>
          <svg width="13" height="13" viewBox="0 0 14 14">
            <path d="M12 7a5 5 0 1 1-1.5-3.6M12 1v3h-3" fill="none" stroke="#9a9a9a" strokeWidth="1.5" />
          </svg>
        </span>
        <span className={s.urlPill}>
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
            <rect x="1" y="5" width="8" height="6" rx="1" fill="#8a8a8a" />
            <path d="M3 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="#8a8a8a" strokeWidth="1.4" />
          </svg>
          <span className={s.urlText}>{url}</span>
        </span>
        <span className={s.menuDots}>⋮</span>
      </div>
    </div>
  );
}
