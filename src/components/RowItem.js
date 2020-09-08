import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Stars from './Stars';

import './RowItem.scss';

class RowItem extends Component {

    state = {
        redirectPath: null,
        post: null
    };

    goToDetailsPage() {
        let selectedPost = this.props;
        this.setState((state) => ({ redirectPath: '/post', post: selectedPost }));
    }

    render() {
        if (this.state.redirectPath) {
            return <Redirect to={`/post/${this.state.post.id}`} />
        }
        return (
            <div className="row-item" onClick={() => this.goToDetailsPage()}>
                <div className="row-item-info">
                    <div className="row-item-info-block rounded grey-background hide-on-mobile">
                        <p className="rank-block">{this.props.index + 1}</p>
                    </div>
                    <div className="mobile-rank-container show-on-mobile">
                        <p className="mobile-rank show-on-mobile">{this.props.index + 1}</p>
                    </div>
                    <div className="row-item-photo row-item-info-block">
                        <figure>
                            <img className="row-image" src={"data:image/gif;base64," + this.props.photoList[0]} alt="post" />
                        </figure>
                    </div>
                    <div className="row-item-info-block marked-border-right">
                        <p className="name-block">{this.props.name}</p>
                        <div className="stars-block"> <Stars n={this.props.stars}></Stars></div>
                        <p className="info-text-block">Based on {this.props.reviewList.length} review<span style={{ visibility: this.props.reviewList.length > 1 ? 'visible' : 'hidden' }}>s</span></p>
                    </div>
                    <div className="row-item-info-block">
                        <div className="social-info-container">
                            <svg className="row-item-info-social">
                                <use xlinkHref="images/sprite.svg#icon-instagram"></use>
                            </svg>
                            <p className="social-block">@{this.props.instagram}</p>
                        </div>
                        <div className="social-info-container">
                            <svg className="row-item-info-social">
                                <use xlinkHref="images/sprite.svg#icon-twitter"></use>
                            </svg>
                            <p className="social-block">@{this.props.twitter}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RowItem;
