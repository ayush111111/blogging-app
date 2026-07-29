import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Appbar = () => {
    return <div className="border-b border-slate-200 px-10 py-4 flex justify-between items-center">
        <Link to="/blogs" className="text-xl font-bold text-slate-800">
            Medium
        </Link>
        <div className="flex items-center gap-4">
            <Link to="/publish" className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
                New post
            </Link>
            <Avatar name={"Ayush"} size="lg" />
        </div>
    </div>
}
