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
    return (
        <appContext.Provider
        value={{ }}
        >
            {children}
        </appContext.Provider>
    );
}

export default AppState;
