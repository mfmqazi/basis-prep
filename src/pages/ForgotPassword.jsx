import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, CheckCircle, ArrowLeft, Loader2, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        } catch (err) {
            setError('Failed to reset password. ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-4">
            <div className="glass-panel p-8 animate-fade-in border-t-4 border-indigo-500 shadow-2xl shadow-indigo-500/10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                        <KeyRound size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Reset Password</h2>
                    <p className="text-slate-500 mt-2">Enter your email to reset your password</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r mb-6 text-sm flex items-center">
                        <span>{error}</span>
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r mb-6 text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type="email"
                                ref={emailRef}
                                required
                                className="input-field pl-10"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-indigo-500/30"
                        type="submit"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <div className="w-full text-center mt-8 pt-6 border-t border-slate-100 text-slate-500 text-sm">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
