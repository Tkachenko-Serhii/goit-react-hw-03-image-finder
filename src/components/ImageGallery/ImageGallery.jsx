import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import s from "./ImageGallery.module.css";
import { Component } from "react";

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={s.gallery}>
        {this.props.images.map((image) => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.props.onClick}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onItemClick: PropTypes.func,
};
