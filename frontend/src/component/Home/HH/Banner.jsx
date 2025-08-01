import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    onClick: (e) => {
      // Only navigate if clicking directly on the slide (not dots)
      if (!e.target.closest(".slick-dots")) {
        navigate("/offer");
      }
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
          zIndex: 2, // Ensure dots stay above
        }}
      >
        <ul
          style={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul
                style={{
                  margin: "0px",
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white relative">
      {" "}
      {/* Added relative positioning */}
      <Slider {...settings}>
        <div onClick={() => navigate("/offer")}>
          <Image imgSrc={bannerImgOne} style={{ cursor: "pointer" }} />
        </div>

        <div onClick={() => navigate("/offer")}>
          <Image imgSrc={bannerImgTwo} style={{ cursor: "pointer" }} />
        </div>

        <div onClick={() => navigate("/offer")}>
          <Image imgSrc={bannerImgThree} style={{ cursor: "pointer" }} />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
