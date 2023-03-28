import { FETCH_CHATS, FETCH_CHAT, SEND_MESSAGE, START_LOADING, END_LOADING } from "../constants/actionTypes";


const chatReducer = (state = { conversations: [], isLoading: false }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

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