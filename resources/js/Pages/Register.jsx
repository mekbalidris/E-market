import { useForm } from "@inertiajs/react";

export default function Register(){
    const { errors, data, post, processing, setData} = useForm({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    });

    function onsubmit(e){
        e.preventDefault();
        post('/register');
    }

    return(
        <>
        <div>
            <h1 className="title">Register</h1>

            <div className="mt-20" >

            <form onSubmit={onsubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">

                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" className="w-100 p-2 border" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <br />

                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" className="w-100 p-2 border" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <br />

                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Password" className="w-100 p-2 border" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <br />

                <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="password_confirmation" className="w-100 p-2 border" />
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