import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ image, onClick }) {
  const { id, webformatURL, largeImageURL, tags } = image;

  return (
    <li className={s.item} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.image}
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  toggleModal: PropTypes.func,
};
