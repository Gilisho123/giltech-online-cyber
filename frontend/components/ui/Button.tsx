type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
};

export default function Button({
    children,
    variant = "primary",
}: ButtonProps) {
    const styles = {
        primary:
            "bg-cyan-500 text-slate-900 hover:bg-cyan-400",
        secondary:
            "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900",
    };

    return (
        <button
            className={`rounded-xl px-8 py-4 font-semibold transition duration-300 ${styles[variant]}`}
        >
            {children}
        </button>
    );
}