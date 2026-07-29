import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = () => {
    return <div>
        {/* default one grid column */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth  type="signin"/>
            </div>
        
        <div className="hidden lg:block">
            {/* mobile first is default - invisible - above md: visible */}
            <Quote/>
        </div>
        </div>
        
    </div>
}