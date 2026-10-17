/* シンプルな線画アイコン（外部ライブラリを読み込まない） */

const paths: Record<string, React.ReactNode> = {
  daily: (
    <>
      <ellipse cx="8" cy="9" rx="4.5" ry="5.5" />
      <ellipse cx="8" cy="9" rx="1.5" ry="2" />
      <path d="M8 3.5h8.5c2.5 0 4.5 2.5 4.5 5.5v11H8" />
      <path d="M12.5 14.5V20" />
    </>
  ),
  food: (
    <>
      <path d="M8 2.5h5l-.5 3H8.5z" />
      <path d="M8.5 5.5 7 9v11.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V9l-1.5-3.5" />
      <path d="M7 13h7" />
      <path d="M17 8h3l-.8 13.5h-3.4" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 10.5h.01M15 10.5h.01" />
      <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0" />
      <path d="M12 3.5c-1.2 1.4-1 3 .5 3.5" />
    </>
  ),
  beauty: (
    <>
      <rect x="8" y="9" width="8" height="12.5" rx="2" />
      <path d="M10 9V6.5h4V9" />
      <path d="M11 6.5V3h4.5" />
      <path d="M10.5 14h3" />
    </>
  ),
  electronics: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M7.5 6.5h.01M10 6.5h.01" />
    </>
  ),
  kitchen: (
    <>
      <path d="M3 11h15v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" />
      <path d="M18 12.5h3" />
      <path d="M7.5 7.5c0-1.5 1-1.5 1-3M11.5 7.5c0-1.5 1-1.5 1-3" />
    </>
  ),
  pet: (
    <>
      <circle cx="6" cy="10" r="1.8" />
      <circle cx="10" cy="6" r="1.8" />
      <circle cx="14.5" cy="6" r="1.8" />
      <circle cx="18.5" cy="10" r="1.8" />
      <path d="M8 17.5c0-2.6 1.8-5 4.2-5s4.3 2.4 4.3 5c0 1.6-1.4 2.5-2.8 2-1.1-.4-1.9-.4-3 0-1.4.5-2.7-.4-2.7-2z" />
    </>
  ),
  fashion: (
    <>
      <path d="M9 3.5 4 6l1.5 4.5L7.5 10v10.5h9V10l2 .5L20 6l-5-2.5a3 3 0 0 1-6 0z" />
    </>
  ),
  pc: (
    <>
      <rect x="4" y="4.5" width="16" height="11" rx="2" />
      <path d="M2.5 19.5h19" />
      <path d="M9.5 15.5 9 19.5M14.5 15.5l.5 4" />
    </>
  ),
  emergency: (
    <>
      <rect x="3.5" y="7" width="17" height="13" rx="3" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M12 10.5v6M9 13.5h6" />
    </>
  ),
  box: (
    <>
      <path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7z" />
      <path d="M19 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5z" />
    </>
  ),
  "arrow-down": <path d="M12 5v14M6 13l6 6 6-6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.6,
  title,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  const content = paths[name] ?? paths.box;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}
