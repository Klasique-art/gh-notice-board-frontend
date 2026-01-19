interface FormLoaderProps {
    visible: boolean;
    message?: string;
}

const FormLoader = ({ visible, message = "Processing..." }: FormLoaderProps) => {
    if (!visible) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10000"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loading-message"
        >
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 border-2 border-slate-200">
                <div className="flex flex-col items-center gap-6">
                    {/* Ghana Flag Star Animation */}
                    <div className="relative w-20 h-20">
                        {/* Outer rotating circle - Green */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
                        
                        {/* Middle rotating circle - Gold */}
                        <div 
                            className="absolute inset-3 rounded-full border-4 border-transparent border-b-secondary border-l-secondary animate-spin"
                            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                        ></div>
                        
                        {/* Inner rotating circle - Red */}
                        <div 
                            className="absolute inset-6 rounded-full border-4 border-transparent border-t-accent animate-spin"
                            style={{ animationDuration: '1s' }}
                        ></div>
                        
                        {/* Center star pulse */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center space-y-2">
                        <p 
                            id="loading-message"
                            className="big-text-5 font-bold text-slate-900"
                        >
                            {message}
                        </p>
                        <p className="small-text text-slate-600">
                            Please wait a moment
                        </p>
                    </div>

                    {/* Ghana Flag Color Dots */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLoader;