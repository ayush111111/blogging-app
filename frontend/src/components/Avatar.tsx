export function Avatar({ name, size = "sm" }: { name: string, size?: "sm" | "lg" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-700 rounded-full flex-shrink-0 ${size === "lg" ? "w-12 h-12" : "w-8 h-8"}`}>
        <span className={`font-semibold text-white ${size === "lg" ? "text-lg" : "text-sm"}`}>
            {name[0].toUpperCase()}
        </span>
    </div>
}
