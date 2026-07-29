import { Avatar } from "./Avatar"
import { useNavigate } from "react-router-dom"

interface BlogCardProps {
    id: string
    authorName: string,
    title: string,
    content: string
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    const navigate = useNavigate();
    const readTime = `${Math.ceil(content.length / 100)} min read`;

    return <div onClick={() => navigate(`/blog/${id}`)} className="border-b border-slate-200 pb-8 pt-8 max-w-2xl cursor-pointer hover:bg-slate-50 px-4 transition-colors">
        <div className="flex items-center gap-2 mb-3">
            <Avatar name={authorName} />
            <span className="text-sm font-medium text-slate-700">{authorName}</span>
            <span className="text-slate-400 text-sm">·</span>
            <span className="text-sm text-slate-500">{publishedDate}</span>
        </div>

        <div className="flex gap-6 justify-between">
            <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {content.slice(0, 150)}...
                </p>
            </div>
        </div>

        <div className="mt-4">
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {readTime}
            </span>
        </div>
    </div>
}


