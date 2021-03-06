import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import { USUARIO_AUTENTICADO,
         REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_ALERTA,
         LOGIN_ERROR, 
         LOGIN_EXITOSO, 
         CERRAR_SESION} from "../../types/index";
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Funciones 

    const registrarUsuario = async (datos) => {
        try {
            const resp = await clienteAxios.post('/api/usuarios', datos);
            const { data: { msg } } = resp;
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: msg
            });
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
            }, 3000);
        } catch (error) {
            const { response: { data: { msg } } } = error;
            dispatch({
                type: REGISTRO_ERROR,
                payload: msg,
            });
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
            }, 3000);
        }
    }

    const iniciarSesion = async (datos) => {
        try {
            const resp = await clienteAxios.post('/api/auth', datos);
            const { data: { token } } = resp;
            dispatch({
                type: LOGIN_EXITOSO,
                payload: token
            });
        } catch (error) {
            const { response: { data: { msg } } } = error;
            dispatch({
                type: LOGIN_ERROR,
                payload: msg,
            });
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                })
            }, 3000);
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const resp = await clienteAxios.get('/api/auth');
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: resp.data.usuario
            })
        } catch (error) {
            console.log(error);
        }
    }

    const cerrarSesion = async () => {
        dispatch({
            type: CERRAR_SESION
        });
    } 

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;