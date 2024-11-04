import { Link, useForm, usePage } from "@inertiajs/react";
import { BrowserRouter } from 'react-router-dom'

export default function Layout({ children }) {
    const { post } = useForm();

    const { auth } = usePage().props;

    function handleLogout(e){
        e.preventDefault();
        post('/logout');
    }

    return (
        <>
            <header>
                <nav>

                    {!auth?.user ? (
                        <>
                            <Link className="nav-link" href="/register">Register</Link>
                            <Link className="nav-link" href="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" href="/home">Home</Link>
                            <Link href="/profile" className="nav-link">
                                <span>Welcome, <span style={{color:"red"}}>{auth.user.name}</span></span>
                            </Link>

                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                        </>
                    )}
                </nav>
            </header>

            <main>
            <BrowserRouter>
            <div className="mt-2.5">
                {children}
            </div>
            </BrowserRouter>
            </main>
        </>
    );
}
