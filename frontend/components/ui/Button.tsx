type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

export default function Button({
    children,
    variant = "primary",
    className = "",
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const styles = {
        primary:
            "bg-cyan-500 text-slate-900 hover:bg-cyan-400",
        secondary:
            "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                rounded-xl
                px-8
                py-4
                font-semibold
                transition
                duration-300
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${styles[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}