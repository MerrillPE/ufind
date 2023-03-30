import { CREATE, FETCH_ALL, FETCH_POST, DELETE, COMMENT, FETCH_LOCAL, END_LOADING, START_LOADING, CLEAR_POSTS, FETCH_SAVED } from '../constants/actionTypes';



const forumReducer = (state = { posts: [], savedPosts: [], isLoading: false }, action) => {
    switch (action.type) {
        // START and END determines loading circle on page
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case CLEAR_POSTS:
            return { ...state, posts: [], }

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }; // add post to end of posts in redux store
        case FETCH_ALL:
            return { ...state, posts: [...state.posts, ...action.payload.data], numberOfPosts: action.payload.numberOfPosts }; // store posts in redux store
        case FETCH_LOCAL:
            return { ...state, posts: [...state.posts, ...action.payload.data], numberOfPosts: action.payload.numberOfPosts }; // replace posts in redux store with local ones
        case FETCH_POST:
            return { ...state, post: action.payload }; // store current post in redux store
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                })
            };
        case FETCH_SAVED:
            return { ...state, savedPosts: action.payload };
        default:
            return state;
    }
};

export default forumReducer;