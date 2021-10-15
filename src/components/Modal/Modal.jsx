import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleModalClose);
  }

  handleModalClose = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src } = this.props;
    return createPortal(
      <>
        <div className={s.overlay} onClick={this.handleBackdropClick}>
          <div className={s.Modal}>
            <img src={src} alt='' />
          </div>
        </div>
      </>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
