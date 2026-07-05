type Props = {
    badge: string;
    title: string;
    subtitle: string;
};

export default function SectionTitle({
    badge,
    title,
    subtitle,
}: Props) {
    return (
        <div className="text-center">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
                {badge}
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                {title}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
                {subtitle}
            </p>
        </div>
    );
}