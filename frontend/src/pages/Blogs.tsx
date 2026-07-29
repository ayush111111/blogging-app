import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs, type Blog } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                {blogs.map((blog: Blog) => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author?.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={""}
                    />
                ))}
            </div>
        </div>
    </div>
}
