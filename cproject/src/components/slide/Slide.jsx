import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css"
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../server/app-config";
    
function Slide({data}) {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    let slidesToShow = 4;
    const resizeListener = () => {
        setInnerWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    if (innerWidth < 1020) {
        slidesToShow = 2;
    } else if (innerWidth < 1300) {
        slidesToShow = 3;
    } 

    const settings = {
        slide: 'div',
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: slidesToShow,
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
                {data.map((ele, index) => {
                    // console.log(`/project/src/main/webapp/resources/programImg/${ele.prgId}/programImg.png`);
                    // console.log(`${process.env.PUBLIC_URL}/project/src/main/webapp/resources/programImg/교육특기적성독서활동/programImg.png`);
                    return (
                        <Link to="/user/program/dtails" state={ele} key={ele.prgId}>
                            <div className="imgBox_Slider">
                                <img style={{ width: "300px", height: "300px", marginBottom: "10px" }}
                                    src={API_BASE_URL+"/api/prg/prgSlideImg?prgId=" + ele.prgId} alt=""
                                />
                                <div className="imgName">{ele.prgNm}</div>
                                <p style={{ fontSize: "14px" }}>{ele.plnPrd}</p>
                            </div>
                        </Link>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Slide;
