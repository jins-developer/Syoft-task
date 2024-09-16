import React from "react";
import style from "./Loader.module.css";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={style.container}>
      <BeatLoader color="#dc2f00" size={25} />
    </div>
  );
};

export default Loader;
