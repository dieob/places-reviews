import React, { Component } from 'react';
import './CreatePost.scss';
import { createPostData } from '../actions'
import { connect } from 'react-redux';
import BeautyStars from 'beauty-stars';
import { Redirect } from "react-router-dom";


class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.submitHandle = this.submitHandle.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);

    this.state = {

      post: {
        id: '',
        name: '',
        instagram: '',
        stars: '',
        reviewList: [],
        photoList: []
      },
      postName: '',
      postReview: '',
      postInstagram: '',
      postTwitter: '',
      postCity: '',
      value: 0,
      photos: [],
      photosPreview: [],
      redirectPath: null,
      createdPost: null,
      isNamePresent: true,
      isReviewPresent: true,
      isStarsPresent: true,
      isPhotoPresent: true,
      isCityPresent: true
    }
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isNamePresent: true,
      isReviewPresent: true,
      isStarsPresent: true,
      isCityPresent: true
    });
  }

  handleImageChange(e) {
    let photosArray = [];
    let photosPreviewArray = [];
    if (this.state.photos.length < 3) {
      photosArray = this.state.photos;
      photosPreviewArray = this.state.photosPreview;
    }
    if (e.target.files.length) {
      photosArray.push(e.target.files[0]);
      photosPreviewArray.push(URL.createObjectURL(e.target.files[0]));
      this.setState({
        photos: photosArray,
        photosPreview: photosPreviewArray,
        isPhotoPresent: true
      });
    }
  }

  deletePhoto(event, index) {
    event.preventDefault();
    let newPhotoArray = this.state.photos;
    let newPhotoPreviewArray = this.state.photosPreview;
    newPhotoArray.splice(index, 1);
    newPhotoPreviewArray.splice(index, 1);
    this.setState({
      photos: newPhotoArray,
      photosPreview: newPhotoPreviewArray
    });
  }

  submitHandle(event) {
    event.preventDefault();
    const formData = new FormData();
    var i, c, validationName, validationReview, validationStars, validationPhotos, validationCity;
    validationName = validationReview = validationStars = validationPhotos = validationCity = true;

    //validate all required fields
    if (!this.state.postName) {
      validationName = false;
      this.setState({ isNamePresent: validationName });
    }
    if (!this.state.postReview) {
      validationReview = false;
      this.setState({ isReviewPresent: validationReview });
    }
    if (!this.state.value) {
      validationStars = false;
      this.setState({ isStarsPresent: validationStars });
    }
    if (!this.state.postCity) {
      validationCity = false;
      this.setState({ isCityPresent: validationCity });
    }
    if (this.state.photos.length === 0) {
      validationPhotos = false;
      this.setState({ isPhotoPresent: validationPhotos });
    }

    for (i = 0; i < this.state.photos.length; i++) {
      c = i + 1;
      formData.append("file" + c, this.state.photos[i]);
    }

    formData.append("name", this.state.postName);
    formData.append("review", this.state.postReview);
    formData.append("instagram", this.state.postInstagram);
    formData.append("twitter", this.state.postTwitter);
    formData.append("stars", this.state.value);
    formData.append("city", this.state.postCity);


    //create an object to pass post data
    var createdPost = {
      id: -1,
      name: this.state.postName,
      instagram: this.state.postInstagram,
      stars: this.state.value,
      photoList: this.state.photos,
      reviewList: []
    }

    createdPost.reviewList.push(this.state.postReview);

    if (validationName && validationReview && validationStars && validationPhotos && validationCity) {

      this.props.createPost(formData).then(
        this.setState((state) => ({ redirectPath: '/' }))
      );
    }
  }

  render() {
    if (this.state.redirectPath) {
      return <Redirect to={{ pathname: this.state.redirectPath, state: { successModal: true } }} push />
    }

    return (
      <div className="main-container extra-margin-top">
        <div>
          <h2 className="title">Add information</h2>
          <form onSubmit={this.submitHandle}>
            <div className="form-item">
              <input className={'input-text-box' + (this.state.isNamePresent ? '' : ' invalid')} placeholder="Name" type="text" name="postName" value={this.state.postName} onChange={this.changeHandler} />
              <label className="input-label">Business Name</label>
              <span className={this.state.isNamePresent ? 'hide-invalid' : 'show-invalid'}>Name is required</span>
            </div>
            <div className="form-item">
              <input className={'input-text-box' + (this.state.isCityPresent ? '' : ' invalid')} placeholder="City" type="text" name="postCity" value={this.state.postCity} onChange={this.changeHandler} />
              <label className="input-label">City</label>
              <span className={this.state.isCityPresent ? 'hide-invalid' : 'show-invalid'}>City is required</span>
            </div>
            <div className="form-item-social">
              <div className="social-input">
                <svg className="social-icon">
                  <use xlinkHref="images/sprite.svg#icon-instagram"></use>
                </svg>
                <input className="input-text-box" placeholder="Instagram" type="text" name="postInstagram" value={this.state.postInstagram} required onChange={this.changeHandler} />
                <label className="input-label">Instagram</label>
              </div>
              <div className="social-input">
              <svg className="social-icon">
                  <use xlinkHref="images/sprite.svg#icon-twitter"></use>
                </svg>
                <input className="input-text-box" placeholder="Twitter" type="text" name="postTwitter" value={this.state.postTwitter} required onChange={this.changeHandler} />
                <label className="input-label">Twitter</label>
              </div>
            </div>
            <div className="form-item centered-item extra-margin-bottom">
              {this.state.photosPreview.length === 3 ? (
                <p className="max-message"> &#10003; Max 3 photos</p>
              )
                :
                (
                  <div className="upload-btn-wrapper">
                    <button className="btn">Upload up to 3 photos</button>
                    <input onChange={this.handleImageChange} type="file" name="myfile" accept='image/jpeg,image/jpg,image/png'/>
                  </div>
                )}
              <div className="photos-preview">
                <div className="photos-preview-single">
                  {this.state.photosPreview.length > 0 ? (
                    <div className="placeholder-container">
                      <img className="placeholder-image" src={this.state.photosPreview[0]} alt="placeholder" />
                      <a href="# " id="0" className="delete-photo" onClick={((e) => this.deletePhoto(e, "0"))}><div>X</div></a>
                    </div>
                  ) : (
                      <img className="placeholder-image" src="photo-placeholder.png" alt="placeholder" />
                    )}
                </div>
                <div className="photos-preview-single">
                  {this.state.photosPreview.length > 1 ? (
                    <div className="placeholder-container">
                      <img className="placeholder-image" src={this.state.photosPreview[1]} alt="placeholder" />
                      <a href="# " className="delete-photo" onClick={((e) => this.deletePhoto(e, "1"))}><div>X</div></a>
                    </div>
                  ) : (
                      <img className="placeholder-image" src="photo-placeholder.png" alt="placeholder" />
                    )}
                </div>
                <div className="photos-preview-single">
                  {this.state.photosPreview.length > 2 ? (
                    <div className="placeholder-container">
                      <img className="placeholder-image" src={this.state.photosPreview[2]} alt="placeholder" />
                      <a href="# " className="delete-photo" onClick={((e) => this.deletePhoto(e, "2"))}><div>X</div></a>
                    </div>
                  ) : (
                      <img className="placeholder-image" src="photo-placeholder.png" alt="placeholder" />
                    )}
                </div>
              </div>
              <span className={this.state.isPhotoPresent ? 'hide-invalid' : 'show-invalid'}>At least one photo is required</span>
            </div>
            <div className="form-item">
              <textarea cols="40" rows="5" className={'description-text-box' + (this.state.isReviewPresent ? '' : ' invalid')} placeholder="Review" type="text" name="postReview" value={this.state.postReview} onChange={this.changeHandler} />
              <label className="input-label-description">Review</label>
              <span className={this.state.isReviewPresent ? 'hide-invalid' : 'show-invalid'}>A review is required</span>
            </div>
            <div className="form-item centered-item extra-margin-bottom">
              <BeautyStars activeColor={"#fc0"}
                value={this.state.value}
                onChange={value => this.setState({ value: value, isStarsPresent: true })}
              />
            </div>
            <span className={this.state.isStarsPresent ? 'hide-invalid' : 'show-invalid'}>Stars rating is required</span>
            <div className="form-item centered-item">
              <button className="button-submit" onClick={this.submitHandle}><h3>Post</h3></button>
              <span className={+(this.state.isReviewPresent || this.state.isNamePresent || this.state.isStarsPresent || this.state.isCityPresent || this.state.isPhotoPresent) ? 'hide-invalid' : 'show-invalid extra-margin-top'}>Please fill all required fields</span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch(createPostData(post))
  }
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);