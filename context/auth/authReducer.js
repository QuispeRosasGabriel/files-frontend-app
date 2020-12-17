import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            break;
    }
}