import React, { Component } from 'react';
import RowItem from './RowItem';
import Loader from 'react-loader-spinner';
import './BestPosts.scss';

import { connect } from 'react-redux';
import { fetchBestPostsData, setShow } from '../actions';

class BestPosts extends Component {

    constructor(props) {
        super(props);

        this.sortHandler = this.sortHandler.bind(this);

        this.state = {
            sortCriteria: '',
            postsShown: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        //if there's a sort criteria defined, show them accordingly, otherwise show all
        if(state.sortCriteria === ''){
            return {
                sortCriteria: props.sortCriteria.show
            }
        }
        return null;
    }


    componentDidMount() {
        this.props.fetchBestPosts(this.state.sortCriteria);
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar los props) o entra en bucle infinito
        if (this.props.sortCriteria !== prevProps.sortCriteria) {
            console.log("DID UPDATE API CALL");
            this.props.fetchBestPosts(this.props.sortCriteria.show);
        }
    }

    sortHandler(event) {
        this.props.setShowCriteria(event.target.value);

        this.setState({
            sortCriteria: event.target.value,
        })
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
                    timeout={15000}
                />
            </div>
        );
    }

    if (this.props.bestPosts.length === 0) {
        return (
            <div>
                No Data
            </div>
        )
    }

    return (
        <div className="best-models-container extra-margin-top">
            <h2 className="title extra-margin-bottom">10 Best Rated</h2>
            {this.props.bestPosts.map((post, index) => (
                <RowItem key={post.id} index={index} id={post.id} name={post.name} instagram={post.instagram} twitter={post.twitter} stars={post.stars} photoList={post.photoList} reviewList={post.reviewList}></RowItem>
            ))}
        </div>
    );
}
}

const mapStateToProps = state => {
    return {
        bestPosts: state.bestPosts,
        isLoading: state.loader,
        sortCriteria: state.show
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBestPosts: (gender) => dispatch(fetchBestPostsData(gender)),
        setShowCriteria: (show) => dispatch(setShow(show))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BestPosts);