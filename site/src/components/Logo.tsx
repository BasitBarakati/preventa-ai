/* Phronesis AI brand mark — hand-built SVG recreation of the original logo:
   left hemisphere = stylized brain (navy gyri), right hemisphere = living tree
   (branches, sage leaves, teal/sage/amber nodes). One stem, two natures:
   evidence and growth, joined. */

const C = {
  navy: "#0B3D5F",
  teal: "#1F8A8A",
  tealLight: "#3FA7B0",
  sage: "#7FB069",
  sageMuted: "#8FAE7A",
  amber: "#F0973C",
};

/** Pointed leaf, drawn along +x from origin; position via transform. */
const Leaf = ({
  fill,
  t,
  animProps,
}: {
  fill: string;
  t: string;
  animProps?: { className: string; style: { animationDelay: string } };
}) => <path d="M0 0C2.6-3.5 7.4-3.5 10 0C7.4 3.5 2.6 3.5 0 0Z" fill={fill} transform={t} {...animProps} />;

export function LogoIcon({
  size = 40,
  className,
  title,
  animated = false,
}: {
  size?: number;
  className?: string;
  title?: string;
  /** Draw the strokes on stroke-by-stroke, then pop the nodes/leaves in —
   *  used by the preloader; every other call site keeps the static mark. */
  animated?: boolean;
}) {
  let strokeStep = 0;
  let fillStep = 0;
  const STROKE_COUNT = 12;
  const strokeAnim = animated
    ? () => ({ className: "draw-ring", style: { animationDelay: `${(0.05 + strokeStep++ * 0.045).toFixed(3)}s` } })
    : () => undefined;
  const fillAnim = animated
    ? () => ({
        className: "pop-in",
        style: { animationDelay: `${(0.05 + STROKE_COUNT * 0.045 + fillStep++ * 0.03).toFixed(3)}s` },
      })
    : () => undefined;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}

      {/* central stem — the shared spine of brain and tree */}
      <path
        d="M32 10.2V50c0 2.7-1.7 4-4.5 5"
        stroke={C.navy}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />

      {/* ——— left: brain hemisphere ——— */}
      <path
        d="M30.6 13.9C21.8 12.1 13.5 18.7 13.3 27.9c-.1 4.8 2.2 7.8 2.6 11.4.5 5.6 5.4 9.8 11.2 9.6 1.7-.1 3-.5 3.5-.7"
        stroke={C.navy}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      {/* gyri */}
      <path
        d="M27.4 20.5c-5.8 1.4-8.6 5.8-7.4 10.4"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      <path
        d="M29.1 28.9c-4 1-5.6 4-4.4 7.4"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      <path
        d="M19.9 40.5c1.8 3.2 5 4.6 8.2 4"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      {/* neuron node on a stalk */}
      <path d="M27.3 24.4v3.4" stroke={C.navy} strokeWidth="2" strokeLinecap="round" {...strokeAnim()} />
      <circle cx="27.3" cy="21.9" r="2.4" fill={C.navy} {...fillAnim()} />
      {/* teal synapse node */}
      <circle cx="16.7" cy="29.3" r="3.1" fill={C.teal} {...fillAnim()} />

      {/* ——— right: tree ——— */}
      {/* branches */}
      <path
        d="M32 24.6c5-1 8.6-3.6 10.6-8.4"
        stroke={C.navy}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      <path
        d="M32 31.6c7.5-1.5 13.4-5 16.9-9"
        stroke={C.navy}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      <path
        d="M32 38.6c6.5-1 11.4-2.5 14.7-5"
        stroke={C.navy}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      <path
        d="M32 44.6c3.4.5 6.4.1 8.9-1.1"
        stroke={C.navy}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        {...strokeAnim()}
      />
      {/* top navy bud on stalk */}
      <path d="M42.9 15.6l.8-2.6" stroke={C.navy} strokeWidth="2" strokeLinecap="round" {...strokeAnim()} />
      <circle cx="44.1" cy="10.8" r="2.7" fill={C.navy} {...fillAnim()} />
      {/* hanging navy bud */}
      <path d="M40.6 43.7l.9 1.7" stroke={C.navy} strokeWidth="2" strokeLinecap="round" {...strokeAnim()} />
      <circle cx="42.1" cy="47.4" r="2.6" fill={C.navy} {...fillAnim()} />
      {/* amber fruit */}
      <circle cx="50.9" cy="20.6" r="3" fill={C.amber} {...fillAnim()} />
      {/* teal + sage nodes */}
      <circle cx="48.3" cy="32" r="2.7" fill={C.teal} {...fillAnim()} />
      <circle cx="51.6" cy="28.9" r="2.1" fill={C.sageMuted} {...fillAnim()} />
      {/* leaves */}
      <Leaf fill={C.sageMuted} t="translate(34.6 12.4) rotate(-28) scale(.92)" animProps={fillAnim()} />
      <Leaf fill={C.sage} t="translate(44.8 15.6) rotate(22) scale(.86)" animProps={fillAnim()} />
      <Leaf fill={C.teal} t="translate(41.2 25.2) rotate(-14) scale(.95)" animProps={fillAnim()} />
      <Leaf fill={C.tealLight} t="translate(39.2 39.4) rotate(-6) scale(.9)" animProps={fillAnim()} />
    </svg>
  );
}

/** Full lockup — icon + Fraunces wordmark, matching the original asset. */
export function LogoLockup({
  size = 34,
  light = false,
  className = "",
}: {
  size?: number;
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} title="Phronesis AI" />
      <span
        className="font-display font-semibold tracking-tight"
        style={{
          fontSize: size * 0.62,
          color: light ? "#FAF7F2" : C.navy,
        }}
      >
        Phronesis&nbsp;AI
      </span>
    </span>
  );
}
