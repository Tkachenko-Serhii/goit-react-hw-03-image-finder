import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages, popularImages } from "./Api/Api";
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

  async componentDidMount() {
    const { page } = this.state;
    const images = await popularImages(page);

    this.setState({
      images,
      status: "resolved",
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({ status: "pending" });
        const images = await fetchImages(searchValue, page);

        if (images.length === 0) {
          return toast.error(
            "No images for you request, please enter more specific query"
          );
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          status: "resolved",
        }));

        if (this.state.page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      } catch (error) {
        this.setState({ error, status: "rejected" });
      }
    }
  }

  handleFormSubmit = (searchValue) => {
    if (this.state.searchValue !== searchValue) {
      this.setState({ searchValue, images: [], page: 1 });
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
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images, fullImg, showModal } = this.state;

    if (status === "idle") {
      return (
        <>
          <ToastContainer autoClose={3000} />
          <Searchbar onSubmit={this.handleFormSubmit} />
        </>
      );
    }
    if (status === "pending") {
      return (
        <>
          <ToastContainer autoClose={3000} />
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />;
        </>
      );
    }
    if (status === "resolved") {
      return (
        <div className='App'>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onClick={this.toggleModal} />
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
