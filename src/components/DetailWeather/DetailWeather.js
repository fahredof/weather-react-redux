import React from "react"
import "./DetailWeather.css"
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner"

const DetailWeather = (props) => {

  const { mainCity } = props;
  const { wind, overcast, pressure, humidity, coordinates} = mainCity;

  return(
    <div className="details">
    { wind ?
      <div>
        <p>{wind}</p>
        <p>{overcast}</p>
        <p>{pressure}</p>
        <p>{humidity}</p>
        <p>{coordinates}</p>
      </div>
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
