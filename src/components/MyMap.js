import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import MarkerData from "./Marker.json";
import { Icon } from "leaflet";
import fireDb from "../firebase";
import "./MyMap.css";
import "leaflet/dist/leaflet.css";
const filtered = MarkerData.filter((mark) => mark.country === "India");
console.warn("boo", filtered);
class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aqi: "random",
      list: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      aqi: e.target.value,
      list: e.target.value,
    });
  }

  componentDidMount() {
    var AQI_P = fireDb.ref("AQI/");
    AQI_P.on("value", function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val().AQI_P);
        var aqi = childSnapshot.val().AQI_P;
        console.log(aqi);

        console.log("------------", document.querySelector("p"));
        // document.getElementById("aqi").innerHTML = aqi;
      });
      // });
    });
  }

  render() {
    return (
      <>
        <MapContainer
          center={[19.66328, 75.300293]}
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((mark) => (
            <Marker
              onClick={() => console.log("ji")}
              key={mark.id}
              position={[mark.lat, mark.lng]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup position={[mark.lat, mark.lng]}>
                <div>
                  <p>
                    AQI:
                    <strong
                      id="aqi"
                      onChange={this.handleChange}
                      value={this.state.aqi}
                    ></strong>
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </>
    );
  }
}

export default MyMap;
