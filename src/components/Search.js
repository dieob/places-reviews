import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { Redirect } from "react-router-dom";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import './Search.scss';


class Search extends Component {

  constructor(props) {
    super(props);

    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);

    this.state = {
      value: '',
      suggestions: [],
      redirectPath: null,
      inputSelectedPost: null,
      suggestion: null,
      open: false
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let postList = this.props.posts;
    return inputLength === 0 ? [] : postList.filter(post =>
      post.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  //getSuggestionValue = suggestion => suggestion.name;

  getSuggestionValue = suggestion => {
    this.setState({
      suggestion: suggestion
    });
    return suggestion.name
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    suggestion.name
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.suggestion) {
      this.setState({
        open: false
      });
    } else {
      this.setState({
        open: true
      });
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  redirectToCreatePost = () => {
    this.setState((state) => ({ redirectPath: '/create' }))
  }

  selectedSuggestion = () => {
    //wait half second until state is set
    setTimeout(() => {
      this.setState((state) => ({ redirectPath: '/post', inputSelectedPost: this.state.suggestion }))
    }
      , 500);
  }

  render() {
    const { value, suggestions, open } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search here...',
      value,
      onChange: this.onChange
    };

    if (this.state.redirectPath) {
      if(this.state.redirectPath==='/create'){
        return <Redirect to={{ pathname: this.state.redirectPath}}/>
      } 
      return <Redirect to={`/post/${this.state.inputSelectedPost.id}`} />
    }
    return (
      <form className={this.props.class} onSubmit={this.onSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.selectedSuggestion}
          highlightFirstSuggestion={true}
        />
        <svg className="search-icon">
          <use xlinkHref="images/sprite.svg#icon-magnifying-glass"></use>
        </svg>
        <Modal open={open} onClose={this.onCloseModal} blockScroll={false} animationDuration={700} center>
          <div className="modal">
            <div className="modal-text">
              Ooops! We could't find this.
              <hr />
            </div>
            <div className="modal-text">
              Create the first review using the button below.
            </div>
            <button className="button-submit" onClick={this.redirectToCreatePost}><h2>Create!</h2></button>
          </div>
        </Modal>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};


export default connect(
  mapStateToProps,
  null
)(Search);