import { SignupForm } from "@/components";

const SignupPage = () => {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12">
            <section>
                <div className="inner-wrapper">
                    <SignupForm />
                </div>
            </section>
        </main>
    );
};

export default SignupPage;