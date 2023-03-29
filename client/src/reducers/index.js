import { combineReducers } from "redux";

import forumReducer from "./forum";
import authReducer from './auth';
import chatReducer from './chat';

export default combineReducers({ authReducer, forumReducer, chatReducer });