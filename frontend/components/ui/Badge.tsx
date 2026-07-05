type BadgeProps = {
    children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
    return (
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
            {children}
        </span>
    );
}