import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="big-text-4 font-semibold text-slate-700">Loading news...</p>
            </div>
        </div>
    );
};

export default Loading;