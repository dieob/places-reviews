import {
    FETCH_POST_DATA, SET_SINGLE_POST_DATA, CREATE_POST, CREATE_POST_ERROR,
    FETCH_BEST_POSTS, CREATE_REVIEW, CREATE_REVIEW_ERROR
    , SET_ERROR, HIDE_ERROR, SHOW_MODAL, HIDE_MODAL, FETCH_POST_DATA_ERROR, IS_LOADING, IS_NOT_LOADING,
    FETCH_PREMIUM_MODELS,
    SET_SHOW
} from './types';
import axios from 'axios';


//const apiJava = '//heroku-java-webapp.herokuapp.com/';
const apiJava = 'http://localhost:8080/';



//FETCHING POSTS
export const fetchPostData = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.get(apiJava + "posts", {
            headers: {
                'x-apikey': 'API_KEY',
            },
            responseType: 'json',
        }).then(response => {
            dispatch(fetchPostsSuccess(response.data));
            dispatch(setLoading(false));
            return (response.data);
        })
            .catch(error => {
                dispatch(fetchPostsError(error));
            });
    };
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POST_DATA,
        posts,
        error: null
    }
};

//FETCHING SINGLE POST
export const fetchSinglePostData = (id) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.get(apiJava + "post" + id)
            .then(response => {
                dispatch(setSinglePostData(response.data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(fetchPostsError(error));
            });
    };
};

export const setSinglePostData = (singlePost) => {
    return {
        type: SET_SINGLE_POST_DATA,
        singlePost
    }
};

//FETCHING BEST MODELS
export const fetchBestPostsData = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.get(apiJava + "bestposts/", {
            headers: {
                'x-apikey': 'API_KEY',
            },
            responseType: 'json',
        })
            .then(response => {
                dispatch(fetchBestPosts(response.data))
                    dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(fetchPostsError(error));
            });
    };
};

export const fetchBestPosts = (bestposts) => {
    return {
        type: FETCH_BEST_POSTS,
        bestposts
    }
};

//CREATING REVIEWS
export const createReviewData = (review) => {
    /*
    //iterate over multipart file
    for (var pair of post.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }*/
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.post(apiJava + "postreview", review)
            .then(response => {
                dispatch(createReview(response.data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(createReviewError(error));
            });
    };
};

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
};


//CREATING POSTS
export const createPost = (post) => {
    return {
        type: CREATE_POST,
        post
    }
};

export const createPostData = (post) => {
    /*
    iterate over multipart file
    for (var pair of post.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }*/
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.post(apiJava + "post", post, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                dispatch(createPost(response.data));
                dispatch(setLoading(false));
            })
            .then(() => {  //call api again to update list of POSTS
                console.log("success post")
                dispatch(fetchPostData())
            })
            .catch(error => {
                console.log("error post")
                dispatch(createPostError(error));
            });
    };
};

//SENDING MESSAGES
export const sendMessage = (form) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return axios.post(apiJava + "contact", form)
            .then(response => {
                dispatch(setLoading(false));
                dispatch(showModal("Thanks for contacting us! We'll be back to you shortly."))
            })
            .catch(error => {
                dispatch(setError(error));
            });
    };
};

//SUCCESS MODAL MESSAGE
export function showModal(message) {
    return {
        type: SHOW_MODAL,
        message: message
    }
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}

//SHOW GUYS OR GIRLS
export function setShow(show) {
    return {
        type: SET_SHOW,
        show: show
    }
}

//ERROR HANDLING
//error notification
export function setError(error) {
    return {
        type: SET_ERROR,
        error: error
    }
}

export function hideError() {
    return {
        type: HIDE_ERROR
    }
}

//error when loading models
export function fetchPostsError(error) {
    var message = 'Couldn\'t fetch Posts, please try again, or contact Administrators';
    return {
        type: FETCH_POST_DATA_ERROR,
        posts: null,
        error: error,
        errorMessage: message
    }
}

//error when creating a new post
export function createPostError(error) {
    var message = 'There was an error creating this Post, please try again, or contact Administrators';
    return {
        type: CREATE_POST_ERROR,
        posts: null,
        error: error,
        errorMessage: message
    }
}

//error posting a review
export function createReviewError(error) {
    var message = 'This review couldn\'t be saved, please try again or contact Administrators';
    return {
        type: CREATE_REVIEW_ERROR,
        posts: null,
        error: error,
        errorMessage: message
    }
}

//loader handling
export function setLoading(isLoading) {
    if (isLoading) {
        return {
            type: IS_LOADING,
            loader: true
        }
    } else {
        return {
            type: IS_NOT_LOADING,
            loader: false
        }
    }
}