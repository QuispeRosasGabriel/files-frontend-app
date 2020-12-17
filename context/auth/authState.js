import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO } from "../../types/index";
import clienteAxios from '../../config/axios';

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

    const registrarUsuario = async (datos) => {
        try {
            const resp = await clienteAxios.post('/api/usuarios', datos);
            const { data: {msg} } = resp;
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: msg
            });
        } catch (error) {
            console.log(error);
        }
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