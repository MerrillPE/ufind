import { combineReducers } from "redux";

import forumReducer from "./forum";
import authReducer from './auth';

export default combineReducers({ authReducer, forumReducer });