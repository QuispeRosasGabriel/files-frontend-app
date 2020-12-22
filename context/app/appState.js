import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    LIMPIAR_ALERTA
} from '../../types';
import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: ''
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    const mostrarAlerta = (mensaje) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: mensaje
        })

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
            })
        }, 3000);
    }

    const subirArchivos = async (formData) => {
        try {
             const resultado = await clienteAxios.post('/api/archivos', formData)
             dispatch({
                 type: SUBIR_ARCHIVO_EXITO,
                 payload: resultado.data
             })
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <appContext.Provider
        value={{
            mensaje_archivo: state.mensaje_archivo,
            mostrarAlerta,
            subirArchivos
        }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;
