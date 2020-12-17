import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            break;
    }
}