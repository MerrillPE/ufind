import { FETCH_CHATS, FETCH_CHAT, SEND_MESSAGE } from "../constants/actionTypes";


const chatReducer = (state = { conversations: [] }, action) => {
    switch (action.type) {
        case FETCH_CHATS:
            return { ...state, conversations: action.payload };
        case FETCH_CHAT:
            return { ...state, chat: action.payload };
        case SEND_MESSAGE:
            return { ...state, chat: [...state.chat, action.payload] };
        default:
            return state;
    }
};

export default chatReducer;