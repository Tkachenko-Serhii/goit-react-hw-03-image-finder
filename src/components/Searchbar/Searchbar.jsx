import { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    searchValue: "",
  };

  handleSearchValueChange = (e) => {
    this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchValue.trim() === "") {
      toast.error("Enter your search query!");
      return;
    }

    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
          <button type='submit' className={s.button}>
            <span className={s.label}>Search</span>
          </button>
          <input
            className={s.input}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            onChange={this.handleSearchValueChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
