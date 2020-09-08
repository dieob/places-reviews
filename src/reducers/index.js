import { combineReducers } from 'redux';
import posts from './postReducer';
import reviews from './reviewReducer';
import bestPosts from './bestPostsReducer';
import error from './errorReducer';
import loader from './loaderReducer';
import singlePost from './singlePostReducer';
import premiumModels from './premiumModelsReducer';
import modal from './modalReducer';
import show from './showReducer';

export default combineReducers({
    posts: posts,
    bestPosts: bestPosts,
    reviews: reviews,
    error: error,
    loader: loader,
    singlePost: singlePost,
    show: show,
    premiumModels: premiumModels,
    modal:modal
});