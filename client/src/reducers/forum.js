import { CREATE, FETCH_ALL, FETCH_POST } from '../constants/actionTypes';

// TODO: Spread state before returning to preserve old values

const forumReducer = (posts = [], action) => {
    switch (action.type) {
        case CREATE:
            return [...posts, action.payload];
        case FETCH_ALL:
            // Checking data flow
            //action.payload.map((post) => console.log(post))

            return action.payload;
        case FETCH_POST:
            return action.payload;
        default:
            return posts;
    }
};

export default forumReducer;