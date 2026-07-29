import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function publishBlog() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        navigate(`/blog/${response.data.id}`);
    }

    return <div>
        <Appbar />
        <div className="flex justify-center pt-12 px-4">
            <div className="w-full max-w-2xl">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="w-full text-4xl font-bold text-slate-900 placeholder-slate-300 outline-none border-b border-slate-200 pb-4 mb-6"
                />
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    rows={20}
                    className="w-full text-lg text-slate-700 placeholder-slate-300 outline-none resize-none"
                />
                <button
                    onClick={publishBlog}
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition-colors"
                >
                    Publish
                </button>
            </div>
        </div>
    </div>
}
