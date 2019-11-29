import React from "react"
import "./DetailWeather.css"
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Details from '../Details/Details';

const DetailWeather = (props) => {

  const { mainCity } = props;
  const { wind } = mainCity;

  return(
    <div className="details">
    { wind ?
      <Details mainCity={mainCity}/>
      : <Spinner/>
    }
    </div>
  );
};

const mapStateToProps = ({ mainCity }) => {
  return {
    mainCity
  };
};

export default connect(mapStateToProps)(DetailWeather);
