type GlowProps = {
  position?: "left" | "right";
};

export default function Glow({ position = "left" }: GlowProps) {
  return (
    <div
      className={`absolute h-80 w-80 rounded-full blur-3xl ${
        position === "left"
          ? "left-0 top-0 bg-cyan-500/20"
          : "right-0 bottom-0 bg-fuchsia-500/20"
      }`}
    />
  );
}