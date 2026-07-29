export const BlogSkeleton = () => {
    return <div className="border-b border-slate-200 pb-8 pt-8 max-w-2xl px-4 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
            <div className="h-3 w-16 bg-slate-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
        <div className="h-4 w-full bg-slate-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-slate-200 rounded mb-4" />
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
    </div>
}
