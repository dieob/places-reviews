import React, { Component } from 'react';
import './Details.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { createReviewData, fetchPostData } from '../actions';
import BeautyStars from 'beauty-stars';
import AdColumn from './AdColumn';
import Stars from './Stars';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


class Detail extends Component {

    constructor(props) {
        super(props);

        this.submitHandle = this.submitHandle.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.showAllFunction = this.showAllFunction.bind(this);
        this.filterHandler = this.filterHandler.bind(this);

        this.state = {
            post: props.singlePost.length > 0 ? props.singlePost[0] : null,
            postId: '',
            newReview: '',
            value: 0,
            isNewReview: false,
            isReviewPresent: true,
            isStarsPresent: true,
            seeAll: false,
            fetchingPost: false,
            filterStars: 'All',
            reviewsShown: []
        };
    }

    static getDerivedStateFromProps(props, state) {

        let postId = parseInt(props.match.params.postId);
        //find post by id in the all posts array
        const post = props.posts.find((element) => {
            return postId === element.id;
        });

        //CHANGE STATE ONLY THE FIRST TIME
        //return null won't chage the state if the post was already set
        if (state.post) {
            return null;
        }

        //if the post is present, meaning fetchPosts was called, set everything, else, set undefined so that will make the api call fire
        if(post){
            return { postId: postId, post: post, reviewsShown: post.reviewList, fetchingPost: false};
        }else{
            return { postId: postId, post: post, fetchingPost:true};
        }
    }

    showAllFunction() {
        this.setState({
            seeAll: true
        });
    }


    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value,
            isReviewPresent: true
        });
    }

    componentDidMount() {
        //if this i 0 then it's accessing through link so fetch al posts
        if (this.props.posts.length === 0) {
            this.props.fetchPosts();
        }
    }

    componentDidUpdate(prevProps, prevState){
        let reviews = [];
        if(prevState.post){
            //if the filter criteria is changed, change the reviews shown
            if(prevState.filterStars !== this.state.filterStars){

                if(this.state.filterStars !== 'All'){
                    reviews = this.state.post.reviewList.filter((review) => {
                        return review.stars === parseInt(this.state.filterStars);
                    })
                } else {
                    reviews = this.state.post.reviewList;
                }

                this.setState({ reviewsShown: reviews, seeAll: false, isNewReview: false });
            }
        }
    }

    filterHandler(event) {
        this.setState({
            filterStars: event.target.value,
        })
    }

    submitHandle(event) {
        event.preventDefault();

        var validationReview, validationStars;
        validationReview = validationStars = true;

        //validate all required fields
        if (!this.state.newReview) {
            validationReview = false;
            this.setState({ isReviewPresent: validationReview });
        }
        if (!this.state.value) {
            validationStars = false;
            this.setState({ isStarsPresent: validationStars });
        }

        const formData = new FormData();

        formData.append("postId", this.state.post.id);
        formData.append("review", this.state.newReview);
        formData.append("stars", this.state.value);

        var reviewObject = {
            id: 0,
            review: this.state.newReview,
            stars: this.state.value,
            createdDate: 'New'
        }

        let newReviewList = [];

        //add the new review to the list
        this.state.post.reviewList.map(review => {
            return newReviewList.push(review);

        })
        newReviewList.push(reviewObject);

        if (validationReview && validationStars) {
            this.props.createReview(formData).then(
                this.setState((state) => ({
                    ...state,
                    newReview: '',
                    post: {
                        ...state.post,
                        reviewList: newReviewList
                    },
                    isNewReview: true,
                    isReviewPresent: true,
                    isStarsPresent: true,
                    value:0,
                    filterStars: 'All',
                    reviewsShown: newReviewList
                }))
            );
        }
    }
    render() {
        var showLoader = this.props.isLoading;

        //SHOW LOADER IF WAITING FOR DATA
        if (showLoader) {
            return (
                <div className="spinner-container">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={200}
                        width={200}
                        timeout={1500}
                    />
                </div>
            );
        }

        if (!this.state.post) {
            return (
                <div>
                    No Data
                </div>
            )
        }

        return (
            <>
                {/*<AdColumn side="right"></AdColumn>
                <AdColumn side="left"></AdColumn>*/}
                <div className={this.state.seeAll ? 'detail-container show-everything' : 'detail-container'}>
                    <div className="details-title even">
                        <div className="details-title-item">
                            <h1 className="title">{this.state.post.name}</h1>
                        </div>
                        <div className="details-title-item">
                        <div className="stars-block"> <Stars n={this.state.post.stars}></Stars></div> &nbsp;
                        <p className="info-text-block">Based on {this.state.post.reviewList.length} review<span style={{ visibility: this.state.post.reviewList.length > 1 ? 'visible' : 'hidden' }}>s</span></p>
                        </div>
                        <div className="details-title-item">
                            <a className="social-link" href={'//www.instagram.com/' + this.state.post.instagram} target="_blank" rel="noopener noreferrer">
                                <svg className="details-title-social">
                                    <use xlinkHref="images/sprite.svg#icon-instagram"></use>
                                </svg>
                                <p className="details-social-username">@{this.state.post.instagram}</p>
                            </a>
                            <a className="social-link" href={"//www.twitter.com/" + this.state.post.twitter} target="_blank" rel="noopener noreferrer">
                                <svg className="details-title-social">
                                    <use xlinkHref="images/sprite.svg#icon-twitter"></use>
                                </svg>
                                <p className="details-social-username">@{this.state.post.twitter}</p>
                            </a>
                        </div>
                    </div>
                    <div className="carousel-container">
                        <Carousel centerMode={true} centerSlidePercentage={65} autoPlay={true} stopOnHover={true} useKeyboardArrows={true}
                            selectedItem={0} infiniteLoop={true} width={"80%"}>
                            {this.state.post.photoList.map((photo, i) => (
                                <div key={i} className="carousel-image-container">
                                    <img alt="post" className="carousel-image" src={"data:image/gif;base64," + photo} />
                                </div>
                            ))}
                        </Carousel>
                        <form className="section-add-review">
                            <textarea cols="40" rows="5" className={'add-review-text' + (this.state.isReviewPresent ? '' : ' invalid')} placeholder="Write your review.." type="text" name="newReview"
                                value={this.state.newReview} onChange={this.changeHandler} />
                            <span className={this.state.isReviewPresent ? 'hide-invalid' : 'show-invalid-details'}>A review is required</span>
                            <div className="bottom-options">
                                <div className="stars-container">
                                    <BeautyStars activeColor={"#fc0"}
                                        value={this.state.value}
                                        onChange={value => this.setState({ value: value, isStarsPresent: true })}
                                    />
                                </div>
                                <button className="add-review-button" onClick={this.submitHandle}><p>Post</p></button>
                            </div>
                            <span className={this.state.isStarsPresent ? 'hide-invalid' : 'show-invalid-details'}>Stars rating is required</span>
                        </form>
                        <div className="section-sort-reviews">
                            <p className="text">Filter by:</p>
                            <div className={this.state.filterStars === 'All' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper padding-all">
                                    All
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="All" onChange={this.filterHandler} checked={this.state.filterStars === 'All'} />
                                </label>
                            </div>
                            <div className={this.state.filterStars === '5' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper">
                                    5
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="5"onChange={this.filterHandler} />
                                    <svg className="stars">
                                        <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                                    </svg>
                                </label>
                            </div>
                            <div className={this.state.filterStars === '4' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper">
                                    4
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="4" onChange={this.filterHandler}/>
                                    <svg className="stars">
                                        <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                                    </svg>
                                </label>
                            </div>
                            <div className={this.state.filterStars === '3' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper">
                                    3
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="3" onChange={this.filterHandler}/>
                                    <svg className="stars">
                                        <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                                    </svg>
                                </label>
                            </div>
                            <div className={this.state.filterStars === '2' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper">
                                    2
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="2" onChange={this.filterHandler} />
                                    <svg className="stars">
                                        <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                                    </svg>
                                </label>
                            </div>
                            <div className={this.state.filterStars === '1' ? 'sort-item selected-filter':'sort-item'}>
                                <label className="filter-wrapper">
                                    1
                                    <input className="filter-stars-input" type="radio" name="filterStars" value="1" onChange={this.filterHandler} />
                                    <svg className="stars">
                                        <use xlinkHref="images/sprite.svg#icon-star-outlined"></use>
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className={ this.state.reviewsShown.length === 0 ? 'show even' : 'hide'}>
                                <p className="text">No reviews with {this.state.filterStars} star<span style={{ visibility: (this.state.filterStars === '1' && this.state.reviewsShown.length === 0) ? 'hidden' : 'visible' }}>s</span></p>
                        </div>
                        {this.state.reviewsShown.slice(0).reverse().map((review, index) => (
                            <div key={index} className={'section-review ' + (index % 2 === 0 ? 'even ' : 'odd ') + ((this.state.isNewReview && index === 0) ? 'new-review' : '')}>
                                <div className="section-review-text">{review.review}</div>
                                <div className="section-review-stats">
                                    <Stars n={review.stars}></Stars>
                                    <div className="stats-date"><span className="stats-date-text">Date posted:</span> {review.createdDate.slice(0, 10)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={(this.state.reviewsShown.length >= 2 && this.state.seeAll === false) ? 'show see-all' : 'hide'} onClick={this.showAllFunction}>
                        See all reviews
                </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        isLoading: state.loader,
        singlePost: state.singlePost
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPostData()),
        createReview: review => dispatch(createReviewData(review))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);