import { useForm } from "@inertiajs/react";

export default function Login(){

    const {errors, data, post, processing, setData} = useForm({
        email: '',
        password: '',
    });

    function onsubmit(e){
        e.preventDefault();
        post('/login');
    }
    return(
        <>
        <div>
            <h1 className="title">Login</h1>

            <div className="mt-20" >

            <form onSubmit={onsubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">

                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" className="w-100 p-2 border" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <br />

                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Password" className="w-100 p-2 border" />
                {errors.email && <p className="text-red-500 text-sm">{errors.password}</p>}
                <br />

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Submit
                </button>

            </form>

            </div>
        </div>
        </>
    )
}