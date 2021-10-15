import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import getImagesData from "./Api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

import "./App.css";

export default class App extends Component {
  state = {
    images: [],
    status: "idle",
    fullImg: "null",
    showModal: false,
    page: 1,
    searchValue: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=23056173-38182a6d52ebc31115cd52ab2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(
              "No images for you request, please enter more specific query"
            )
          );
        })
        .then((images) => {
          this.setState({
            images: images.hits,
            status: "resolved",
          });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  handleFormSubmit = (searchValue) => {
    if (this.state.searchValue !== searchValue) {
      this.setState({ searchValue });
    }
  };
  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      fullImg: largeImageURL,
    }));
  };

  onCloseModal = () => {
    this.setState({ fullImg: null });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      images: [...prevState.images],
      page: prevState.page + 1,
    }));
    this.handleFormSubmit(this.state.searchValue);
  };

  render() {
    const { status, images, fullImg, showModal } = this.state;
    if (status === "idle") {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <div className='App'>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onClick={this.toggleModal} />
          <ToastContainer autoClose={3000} />
          <Button loadMore={this.loadMore} images={images} />
          {showModal && <Modal src={fullImg} onClose={this.toggleModal} />}
        </div>
      );
    }
    if (status === "rejected") {
      return toast.error(
        "No images for you request, please enter more specific query"
      );
    }
  }
}
