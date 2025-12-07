import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, AtSign, Loader2 } from 'lucide-react';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        const password = passwordRef.current.value;
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Alternative regex that is a bit more permissive with special chars but strict on types
        // At least 8 chars, 1 letter, 1 number, 1 special character
        const simpleStrongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!simpleStrongRegex.test(password)) {
            return setError('Password must be at least 8 characters long and contain letters, numbers, and special characters.');
        }

        try {
            setError('');
            setLoading(true);
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                firstNameRef.current.value,
                lastNameRef.current.value,
                usernameRef.current.value
            );
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to create an account. ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="glass-panel p-8 animate-fade-in border-t-4 border-indigo-500 shadow-2xl shadow-indigo-500/10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                        <UserPlus size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join us to start learning</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r mb-6 text-sm flex items-center">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input type="text" ref={firstNameRef} required className="input-field pl-10" placeholder="John" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input type="text" ref={lastNameRef} required className="input-field pl-10" placeholder="Doe" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                        <div className="relative group">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input type="text" ref={usernameRef} required className="input-field pl-10" placeholder="johndoe123" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input type="email" ref={emailRef} required className="input-field pl-10" placeholder="john@example.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input type="password" ref={passwordRef} required className="input-field pl-10" placeholder="••••••••" />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 ml-1">
                            Must be at least 8 chars with letters, numbers & symbols
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input type="password" ref={passwordConfirmRef} required className="input-field pl-10" placeholder="••••••••" />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="btn btn-primary w-full py-3 text-lg shadow-lg shadow-indigo-500/30 mt-4"
                        type="submit"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                <UserPlus size={20} /> Sign Up
                            </span>
                        )}
                    </button>
                </form>

                <div className="w-full text-center mt-8 pt-6 border-t border-slate-100 text-slate-500 text-sm">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
}
