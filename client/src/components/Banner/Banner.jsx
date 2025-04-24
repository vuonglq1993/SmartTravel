import React from "react";
import "../Banner/banner.css";
import bannervideo from "../../assets/video/bannervideo.mp4";

const Banner = () => {
  return (
    <section className="video-section">
      <div className="video-container">
        <video
          className="cropped-video"
          src={bannervideo}
          type="video/mp4"
          autoPlay
          muted
          loop
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Banner;
