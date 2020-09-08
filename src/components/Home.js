import React, { Component } from 'react';
import './Home.scss';
import { Modal } from 'react-responsive-modal';

import { connect } from 'react-redux';
import { fetchPostData, setShow } from '../actions';
import Item from './Item';
import Search from './Search';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Pagination from "react-js-pagination";

class Home extends Component {

  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.sortHandler = this.sortHandler.bind(this);

    this.state = {
      successModal: this.props.location.state ? this.props.location.state.successModal : false,
      activePage: 1,
      indexOfLastItem : 16,
      indexOfFirstItem: 0,
      itemsShown: [],
      allItems: [],
      itemsPerPage: 16,
      sortCriteria: props.sortCriteria.show
    }
  }

  static getDerivedStateFromProps(props, state) {
    //this will be set the first time the page is loaded, with the first 16 items
    if (state.itemsShown.length === 0 && props.posts.length === 0) {
      return {
        itemsShown: props.posts.slice(0, 16),
        allItems: props.posts
      };
    }

    let showThese = props.posts.filter((model) => {
      return model.gender === props.sortCriteria.show;
    })

    //if there's a sort criteria defined, show them accordingly, otherwise show all
    if (state.sortCriteria !== "All") {
      return {
        itemsShown: showThese.slice(state.indexOfFirstItem, state.indexOfLastItem),
        allItems: showThese
      }
    } else {
      return {
        itemsShown: props.posts.slice(state.indexOfFirstItem, state.indexOfLastItem),
        allItems: props.posts
      };
    }
  }

  componentDidMount() {
    if(this.props.posts.length === 0){
      this.props.fetchPosts();
    }
  }

  sortHandler(event) {
    this.props.setShowCriteria(event.target.value);

    this.setState({
      sortCriteria: event.target.value,
      activePage: 1,
      indexOfLastItem : 16,
      indexOfFirstItem: 0,
      allItems: this.props.posts.filter((model) => {
        return model.gender === event.target.value;
      })
    })
  }

  onCloseModal = () => {
    this.setState({ successModal: false });
    this.props.location.state = undefined;
  };

  handlePageChange(pageNumber) {
    let indexOfLastItem = pageNumber * this.state.itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    this.setState({ 
                    activePage: pageNumber,
                    indexOfLastItem : indexOfLastItem,
                    indexOfFirstItem: indexOfFirstItem
                });
  }

  render() {
    const { successModal } = this.state;
    //SHOW LOADER IF WAITING FOR DATA
    if (this.props.isLoading) {
      return (
        <div className="spinner-container">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={20000}
          />
        </div>
      );
    }

    if (this.state.allItems.length === 0) {
      return (
        <div>
          No Data
          <Link to='/find' className="create-button">
          <div>
            <svg className="nav-icon">
              <use xlinkHref="images/sprite.svg#icon-new-message"></use>
            </svg>Create</div>
        </Link>
        </div>
      )
    }

    return (
      <div className="home-container">
        <Link to='/find' className="create-button">
          <div>
            <svg className="nav-icon">
              <use xlinkHref="images/sprite.svg#icon-new-message"></use>
            </svg>Create</div>
        </Link>
        <Search class="search-box"></Search>
        <Modal open={successModal} onClose={this.onCloseModal} blockScroll={false} animationDuration={700} center>
          <div className="modal">
            <div className="modal-text">
              Post review succesfully created!
                <hr />
            </div>
            <svg className="modal-icon">
              <use xlinkHref="images/sprite.svg#icon-thumbs-up"></use>
            </svg>
          </div>
        </Modal>
        {this.state.itemsShown.map(post => (
          <Item key={post.id} id={post.id} name={post.name} instagram={post.instagram} stars={post.stars} photoList={post.photoList} reviewList={post.reviewList}></Item>
        ))}
        <div className="pagination-container">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsPerPage}
            totalItemsCount={this.state.allItems.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    isLoading: state.loader,
    sortCriteria: state.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPostData()),
    setShowCriteria: (show) => dispatch(setShow(show))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);