import * as api from '../api/index';
import { FETCH_CHATS, FETCH_CHAT, SEND_MESSAGE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const getConversations = (userID) => async (dispatch) => {
    try {
        const { data } = await api.fetchChats(userID);
        //console.log("Chat data: " + data);
        dispatch({ type: FETCH_CHATS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getChat = (userID, partnerID) => async (dispatch) => {
    try {
        const { data } = await api.fetchChat(userID, partnerID);

        dispatch({ type: FETCH_CHAT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = (message) => async (dispatch) => {
    try {
        const { data } = await api.sendMessage(message);
        dispatch({ type: SEND_MESSAGE, payload: data })
    } catch (error) {
        console.log(error);
    }

}