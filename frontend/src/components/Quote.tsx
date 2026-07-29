export const Quote = () => {
    return <div className="bg-slate-200 h-screen flex justify-center flex-col"> 
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-3xl font-bold">"The customer support I received was exceptional, the support support team went above and beyond"</div>
                {/* second one is not centered */}
                <div className="max-w-md text-xl font-semibold mt-4"> 
                    Julius Winfield
                </div>        
                <div className="max-w-md text-md font-light text-slate-400"> 
                    CEO | Acme
                </div>
            </div>
          </div>

    </div>
    // parent centers children vertically - flex justify-center - flex-col makes it work vertically
    // child "flex justify-center" centers horizontally  - flex-row default
}