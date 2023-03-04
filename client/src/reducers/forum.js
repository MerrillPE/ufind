import { CREATE, FETCH_ALL, FETCH_POST, DELETE, } from '../constants/actionTypes';

// TODO: Spread state before returning to preserve old values

const forumReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case FETCH_ALL:
            // Checking data flow
            //action.payload.map((post) => console.log(post))

            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};

export default forumReducer;