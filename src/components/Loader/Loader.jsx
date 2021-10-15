import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Spinner from "react-loader-spinner";
import s from "./Loader.module.css";

export default class Loader extends Component {
  render() {
    return (
      <Spinner
        type='ThreeDots'
        color='#00BFFF'
        height={100}
        width={100}
        className={s.loader}
      />
    );
  }
}
