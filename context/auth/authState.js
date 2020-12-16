import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import { USUARIO_AUTENTICADO } from "../../types/index";

const AuthState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState); 

    // Funciones 
    const usuarioAutenticado = (nombre) => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        });
    }

    const registrarUsuario = (datos) => {
        console.log('desde registrar usuario', datos);
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;