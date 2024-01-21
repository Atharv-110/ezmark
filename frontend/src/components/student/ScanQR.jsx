import { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { setScanQRAPI } from "../../services/get-service";

const ScanQRPage = ({ setScanQR }) => {
  // const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [allData, setAllData] = useState({
    qr_code_data: "",
    latitude: "",
    longitude: "",
  });

  const handleScan = async (data) => {
    if (data) {
      const parsedData = data.text; // or use the relevant property from the result object
      setAllData({
        qr_code_data: parsedData,
        latitude: String(latitude),
        longitude: String(longitude),
      });
    }
  };

  const handleMarkAttendance = async () => {
    const response = await setScanQRAPI(allData);
    console.log(response);
  };
  // console.log(data);
  // console.log(typeof data);
  // console.log(typeof String(longitude.longitude));
  // console.log(typeof String(latitude.latitude));

  // console.log(allData);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 500,
    width: 500,
  };

  return (
    <section className="w-full px-2 mt-24 md:mt-32">
      <button onClick={() => setScanQR(false)}>go back</button>
      <section className="pane_section flex flex-col items-center justify-center">
        <div className="w-full md:w-[500px]">
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
        <p>{allData.qr_code_data}</p>
        <button onClick={handleMarkAttendance} className="btn">
          Mark Attendance
        </button>
      </section>
    </section>
  );
};

export default ScanQRPage;
