import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, cerrarSesion, usuario } = AuthContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])



    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img src="logo.svg" className="w-64 cursor-pointer mb-8 md:mb-0" />
            </Link>

            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hola, {usuario.nombre}</p>
                            <button type="button"
                                className="bg-black cursor-pointer px-5 py-3 rounded text-white font-bold uppercase"
                                onClick={()=> cerrarSesion()}
                            >Cerrar Sesión</button>
                        </div>
                    ) : (
                            <>
                                <Link href="/login">
                                    <a className="bg-red-500 cursor-pointer mr-2 px-5 py-3 rounded text-white font-bold uppercase">Iniciar Sesión</a>
                                </Link>
                                <Link href="/crearcuenta">
                                    <a className="bg-black cursor-pointer px-5 py-3 rounded text-white font-bold uppercase">Crear Cuenta</a>
                                </Link>
                            </>
                        )
                }
            </div>
        </header>
    )
}

export default Header;