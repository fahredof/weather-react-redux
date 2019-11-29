import React, {useState} from "react";
import "./FavoritesCities.css";
import Spinner from "../Spinner/Spinner";
import addButton from './svg/addButton.svg';
import crossButton from './svg/crossButton.svg';
import Details from "../Details/Details";

const FavoritesCities = ({id, cityData, getWeather, deleteCity}) => {
  const [inputText, setInputText] = useState('');
  const [condition, setCondition] = useState('Add');
  const {
      city,
      temp,
      image,
      wind,
      overcast,
      pressure,
      humidity,
      coordinates,
      error
  } = cityData ? cityData : {};

  const onClickAddButton = () => {
    setCondition('Input');
  };

  const onChangeInput = (event) => {
    setInputText(event.target.value);
  };

  const onClickAddCity = (event) => {
    event.preventDefault();
    setCondition('List');
    getWeather(id, inputText);
  };

  const onClickDelete = () => {
    deleteCity(id);
    setCondition(' ');
  };

  const renderSwitch = () => {
    switch (condition) {
      case 'Input':
        return(
          <div id="input">
            <form>
              <input type="text" value={inputText} onChange={onChangeInput}/>
              <button type="submit" onClick={onClickAddCity}>Add</button>
            </form>
          </div>
        );
      case 'List':
        return(
          JSON.stringify(cityData) !== '{}' ?
            !error ?
            <div id="list">
              <div className="city">{city}</div>
              <div className="temp">{temp}</div>
              <div className="image">
              <img src={image} alt=""/>
              </div>
              <Details className="dt" mainCity={cityData}/>
              <img src={crossButton} alt="" onClick={onClickDelete}/>
              </div>

            : <div id="list">
            <div className="wind">{error}</div>
            <div className="crossButton">
            <img src={crossButton} alt="" onClick={onClickDelete}/>
            </div>
            </div>
          : <Spinner/>
        );
        default :
          return (
            <div id={"addButton"}>
              <img src={addButton} alt="icon" onClick={onClickAddButton}/>
            </div>
          );
      }
  };

  return(
    <div id={"city" + id} className="favCity">
      {renderSwitch()}
    </div>
  )
};

export default FavoritesCities;
