import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex-center min-h-screen">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                <p className="normal-text text-slate-600">Loading diaspora posts...</p>
            </div>
        </div>
    );
};

export default Loading;