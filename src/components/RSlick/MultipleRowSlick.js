import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styleSlick from './MultipleRowSlick.module.css';
import Film from '../Film/Film'
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/actions/types/QuanLyPhimType'
import { useTranslation } from 'react-i18next';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}


const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

  const renderFilms = () => {

    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className="mt-2" key={index}  >
        <Film_Flip item={item} />
      </div>
    })
  }
  const { t, i18n } = useTranslation();
  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

  console.log('activeSC', activeClassSC)

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    rows: 2,
    slidesToShow: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1199.98,
        settings: {
          slidesToShow: 2,
          slidesPerRow: 2,
          centerPadding: "60px",
        }
      },
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
          slidesPerRow: 1,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
          slidesPerRow: 2,
          rows: 2,
        }
      },
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 1,
          slidesPerRow: 1,
          slidesToScroll: 1,
          centerPadding: "60px",
        }
      }
    ]
  };



  return (
    <div>
      <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded mr-2`} onClick={() => {
        const action = { type: SET_FILM_DANG_CHIEU }
        dispatch(action);
      }}>
        
        {t('PHIM ĐANG CHIẾU')}
      </button>

      <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded `} onClick={() => {
        const action = { type: SET_FILM_SAP_CHIEU }
        dispatch(action);
      }}>
        
        {t('PHIM SẮP CHIẾU')}
      </button>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );
}


export default MultipleRowSlick;