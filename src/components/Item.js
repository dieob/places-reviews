import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Stars from './Stars';

import './Item.scss';

class Item extends Component {

    state = {
        redirectPath: null,
        post: null,
        postId: null
    };

    goToDetailsPage() {
        let selectedPost = this.props;
        this.setState((state) => ({ redirectPath: '/post', post: selectedPost, postId:selectedPost.id }));
    }

    render() {
        if (this.state.redirectPath) {
            return <Redirect to={`/post/${this.state.postId}`} />
        }
        return (
            <div  className="item" onClick={() => this.goToDetailsPage()}>
                <div className="item-photo">
                    <figure>
                        <img className="image" src={"data:image/gif;base64," + this.props.photoList[0]} alt="post" />
                    </figure>
                </div>
                <div className="photo-count">
                    {this.props.photoList.length}
                    <svg className="photo-icon">
                        <use xlinkHref="images/sprite.svg#icon-camera"></use>
                    </svg>
                </div>
                <div className="item-info">
                    <p>{this.props.name}</p>
                </div>
                <div className="item-stars">
                    <Stars n={this.props.stars}></Stars>
                </div>
            </div>
        );
    }
}

export default Item;
