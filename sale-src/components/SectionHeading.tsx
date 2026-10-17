/** セクション見出し（明朝体・左寄せ） */
export function SectionHeading({
  id,
  kicker,
  title,
  lead,
  meta,
  size = "md",
}: {
  id: string;
  /** 見出し上の小さな言葉（日本語で短く） */
  kicker?: string;
  title: string;
  lead?: string;
  meta?: React.ReactNode;
  size?: "lg" | "md" | "sm";
}) {
  const titleClass =
    size === "lg" ? "text-[26px] sm:text-[32px]" : size === "md" ? "text-[22px] sm:text-[26px]" : "text-[19px] sm:text-[22px]";
  return (
    <div className="mb-5">
      {kicker || meta ? (
        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[12px] text-muted">
          <span className="font-bold text-accent">{kicker}</span>
          {meta ? <span>{meta}</span> : null}
        </div>
      ) : null}
      <h2 id={id} className={`${titleClass} font-bold leading-[1.35] tracking-[0.01em] whitespace-pre-line [text-wrap:balance] [word-break:keep-all] [overflow-wrap:anywhere]`}>
        {title}
      </h2>
      {lead ? <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}
