import { LIMPIAR_ALERTA, MOSTRAR_ALERTA } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }

        default:
            break;
    }
}