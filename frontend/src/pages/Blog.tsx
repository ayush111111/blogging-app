import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return <div className="flex justify-center mt-10 text-slate-500">Loading...</div>
    }

    if (!blog) {
        return <div className="flex justify-center mt-10 text-slate-500">Blog not found</div>
    }

    return <FullBlog blog={blog} />
}
