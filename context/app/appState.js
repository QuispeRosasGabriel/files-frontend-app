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

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: ''
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


    return (
        <appContext.Provider
        value={{
            mensaje_archivo: state.mensaje_archivo,
            mostrarAlerta
        }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;
