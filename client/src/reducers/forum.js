import { CREATE, FETCH_ALL, FETCH_POST, DELETE, COMMENT, FETCH_LOCAL, END_LOADING, START_LOADING } from '../constants/actionTypes';



const forumReducer = (state = { posts: [], isLoading: true }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case FETCH_ALL:
            // Checking data flow
            //action.payload.map((post) => console.log(post))

            return { ...state, posts: action.payload };
        case FETCH_LOCAL:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
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
        default:
            return state;
    }
};

export default forumReducer;