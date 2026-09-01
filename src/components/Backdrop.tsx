/**
 * Fixed page backdrop: a faint blueprint grid, two slow accent glows and a
 * vignette. Pure CSS — no JS, no per-frame work, and nothing random, so it
 * renders identically on the server and the client.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Blueprint grid, faded out towards the edges. */}
      <div
        className="absolute inset-0 grid-backdrop"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 20%, transparent 78%)",
        }}
      />

      {/* Warm glow behind the hero. */}
      {/* Centred with calc rather than -translate-x-1/2: the float keyframe
          animates `transform` and would otherwise cancel the centring. */}
      <div className="absolute -top-40 left-[calc(50%-18rem)] h-[36rem] w-[36rem] rounded-full bg-accent/12 blur-[130px] motion-safe:animate-float [animation-duration:14s]" />

      {/* Cool counterweight, low and to the right. */}
      <div className="absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/8 blur-[120px] motion-safe:animate-float [animation-duration:18s] [animation-direction:reverse] dark:bg-sky-400/10" />

      <div className="absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[120px]" />

      {/* Vignette so content always sits on a calm ground. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_100%)]" />
    </div>
  );
}

export default Backdrop;
