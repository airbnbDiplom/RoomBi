"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./mapMain.module.css";
const MapMain: React.FC = () => {
  const position = [46.469569, 30.707517];
  const mapRef = useRef<typeof MapContainer>(null);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [mapStyle, setMapStyle] = useState(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  );

  //   useEffect(() => {
  //     const delay = 1000;

  //     const timerId = setTimeout(() => {
  //       if (mapRef.current) {
  //         const handleMoveEnd = () => {
  //             if (mapRef.current) {
  //                 const newBounds = mapRef.current?.leafletElement.getBounds();
  //                 setBounds(newBounds);
  //                 console.log(newBounds);
  //               }
  //         };

  //         const handleZoomEnd = () => {
  //           const newBounds1 = mapRef.current.getBounds();
  //           setBounds(newBounds1);
  //           console.log(newBounds1);
  //         };

  //         mapRef.current.on("moveend", handleMoveEnd);
  //         mapRef.current.on("zoomend", handleZoomEnd);

  //         return () => {
  //           mapRef.current.off("zoomend", handleZoomEnd);
  //           mapRef.current.off("moveend", handleMoveEnd);
  //         };
  //       }
  //     }, delay);

  //     return () => clearTimeout(timerId);
  //   }, [mapRef]);

  //   const icons = [];
  //   for (let i = 0; i < 20; i++) {
  //     const customIcon = new L.divIcon({
  //       className: "custom-marker",
  //       html: `<div class="custom-marker-content"><p class="custom-marker-txt">${
  //         i + 11
  //       }</p></div>`,
  //     });
  //     icons.push(customIcon);
  //   }
  //   const markers = [];
  //   for (let i = 0; i < 20; i++) {
  //     const lat = 51.49271076956717;
  //     const lng = -0.1754685535617609;
  //     const marcer = {
  //       geocode: [lat, lng],
  //       popUp: `hello ${i}`,
  //       customIcon: icons[i],
  //     };
  //     markers.push(marcer);
  //   }
  //   const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     setMapStyle(event.target.value);
  //     console.log(event.target.value);
  //   };
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    // <div>
    //   <select
    //     name=""
    //     id=""
    //     onChange={handleStyleChange}
    //     className="selectStyle"
    //   >
    //     <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
    //       a openstreetmap
    //     </option>
    //     <option value="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png">
    //       b openstreetmap
    //     </option>
    //     <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">
    //       hot
    //     </option>
    //     <option value="http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png">
    //       cycle
    //     </option>
    //     <option value="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png">
    //       osmfr
    //     </option>
    //     <option value="https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png">
    //       cyclosm
    //     </option>
    //   </select>

    //   <MapContainer
    //     center={position}
    //     zoom={15}
    //     style={{ height: "70vh", marginTop: "10%" }}
    //     ref={mapRef}
    //   >
    //     <TileLayer url={mapStyle} />

    //     {markers.map((marker, index) => (
    //       <Marker
    //         key={index}
    //         position={marker.geocode}
    //         icon={marker.customIcon}
    //       >
    //         <Popup>
    //           <div>
    //             <h2>{marker.popUp}</h2>
    //             <button className="buttonMarcer" onClick={() => alert("hello")}>
    //               Click
    //             </button>
    //           </div>
    //         </Popup>
    //       </Marker>
    //     ))}
    //   </MapContainer>
    //   <div style={{ marginLeft: "50%", marginTop: "4%" }}>
    //     {bounds && (
    //       <div>
    //         <h3>Bounds:</h3>
    //         <p>NorthEast: {bounds.getNorthEast().toString()}</p>
    //         <p>SouthWest: {bounds.getSouthWest().toString()}</p>
    //         <ul>
    //           {markers.map(
    //             (marker, index) =>
    //               marker.geocode[0] > bounds.getSouthWest().lat &&
    //               marker.geocode[0] < bounds.getNorthEast().lat &&
    //               marker.geocode[1] > bounds.getSouthWest().lng &&
    //               marker.geocode[1] < bounds.getNorthEast().lng && (
    //                 <li key={index}>
    //                   {marker.popUp}-- {marker.geocode[0]}-{marker.geocode[1]}
    //                 </li>
    //               )
    //           )}
    //         </ul>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export { MapMain };
