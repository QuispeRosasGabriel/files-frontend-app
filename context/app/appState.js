import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_CARGANDO
} from '../../types';
import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: '',
        cargando: null,
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

    const subirArchivos = async (formData, nombreArchivo) => {
        try {
            dispatch({
                type: SUBIR_ARCHIVO_CARGANDO,
            })
             const resultado = await clienteAxios.post('/api/archivos', formData)
             dispatch({
                 type: SUBIR_ARCHIVO_EXITO,
                 payload: {
                     nombre: resultado.data.archivo,
                     nombre_original: nombreArchivo
                 }
             })
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    return (
        <appContext.Provider
        value={{
            mensaje_archivo: state.mensaje_archivo,
            mostrarAlerta,
            subirArchivos,
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            cargando: state.cargando
        }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;
