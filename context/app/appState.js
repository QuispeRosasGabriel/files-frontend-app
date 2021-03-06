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
        descargas: 1,
        password: '',
        autor: null,
        url: ''
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

    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <appContext.Provider
        value={{
            mensaje_archivo: state.mensaje_archivo,
            mostrarAlerta,
            subirArchivos,
            crearEnlace,
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            cargando: state.cargando,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
            url: state.url,
        }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;
