import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css"

const imageArr = [
    { img: "img/kid1.jpg", key: 1, name: '청년 마인드 톡톡', date: "2024-03-08 ~ 2024-03-10" },
    { img: "img/kid2.png", key: 2, name: '클라이밍' , date: "2024-03-08 ~ 2024-03-10" },
    { img: "img/kid3.jpg", key: 3, name: '청년 마인드 톡톡' , date: "2024-03-08 ~ 2024-03-10" },
    { img: "img/kid4.jpg", key: 4, name: '청년 힐링 드림' , date: "2024-03-08 ~ 2024-03-10" },
    { img: "img/kid5.jpg", key: 5, name: '청년 마인드 톡톡', date: "2024-03-08 ~ 2024-03-10"  },
    { img: "img/kid6.jpg", key: 6, name: '희망 케어' , date: "2024-03-08 ~ 2024-03-10" },
    { img: "img/kid7.jpg", key: 7, name: '청년 마인드 톡톡', date: "2024-03-08 ~ 2024-03-10"  },
];

function Slide({ width, height }) {

    const settings = {
        slide: 'div',
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        // prevArrow: "<button type='button' class='slick-prev'>Previous</button>",		// 이전 화살표 모양 설정
        // nextArrow: "<button type='button' class='slick-next'>Next</button>",		// 다음 화살표 모양 설정
        // dotsClass: "slick-dots", 	//아래 나오는 페이지네이션(점) css class 지정
        draggable: true,
    };



    return (
        <div>
            <Slider {...settings}>
                {imageArr.map((ele, index) => {
                    return (
                        <div >
                            <div className="imgBox_Slider">
                                <img style={{ width: "300px", height: "300px", marginBottom: "10px" }} src={`${ele.img}`} alt="" />
                                <a href="#" className="imgName">{ele.name}</a>
                                <p style={{fontSize: "14px"}}>{ ele.date}</p>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Slide;
