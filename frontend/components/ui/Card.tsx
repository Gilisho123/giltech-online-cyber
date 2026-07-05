type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-2
                hover:border-cyan-400
                hover:shadow-xl
                hover:shadow-cyan-500/20
                ${className}
            `}
    >
      {children}
    </div>
  );
}