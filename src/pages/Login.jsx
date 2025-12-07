import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (err) {
            setError('Failed to log in. ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-4">
            <div className="glass-panel p-8 animate-fade-in border-t-4 border-basis-blue shadow-2xl shadow-basis-navy/10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-basis-navy mb-4">
                        <LogIn size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Please sign in to continue</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r mb-6 text-sm flex items-center">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-basis-blue transition-colors" size={20} />
                            <input
                                type="email"
                                ref={emailRef}
                                required
                                className="input-field pl-10"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-basis-blue transition-colors" size={20} />
                            <input
                                type="password"
                                ref={passwordRef}
                                required
                                className="input-field pl-10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-basis-blue hover:text-basis-navy font-medium hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        disabled={loading}
                        className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-basis-navy/30 mt-2"
                        type="submit"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                <LogIn size={20} /> Log In
                            </span>
                        )}
                    </button>
                </form>

                <div className="w-full text-center mt-8 pt-6 border-t border-slate-100 text-slate-500 text-sm">
                    Don't have an account? <Link to="/signup" className="text-basis-blue hover:text-basis-navy font-bold hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
