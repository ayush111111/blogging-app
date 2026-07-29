import { type Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center px-10 pt-12">
            <div className="grid grid-cols-12 gap-10 w-full max-w-screen-xl">

                <div className="col-span-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        {blog.title}
                    </h1>
                    <p className="text-slate-400 text-base font-light mt-2">Posted on July 28, 2026</p>
                    <p className="text-slate-500 text-sm mt-3">
                        {Math.ceil(blog.content.length / 100)} min read
                    </p>
                    <p className="text-slate-700 leading-relaxed mt-8 text-lg">
                        {blog.content}
                    </p>
                </div>

                <div className="col-span-4">
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide mb-4">Author</p>
                    <div className="flex items-center gap-3">
                        <Avatar name={blog.author.name || "A"} size="lg" />
                        <div>
                            <p className="font-bold text-slate-900 text-lg">{blog.author.name || "Anonymous"}</p>
                            <p className="text-slate-500 text-sm mt-1">
                                Master of the written word. Sharing ideas one post at a time.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}
