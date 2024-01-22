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
    height: 300,
    width: 400,
  };

  return (
    <section className="w-full px-2">
      <button
        onClick={() => setScanQR(false)}
        className="flex-center gap-1 capitalize font-medium underline leading-none transition-effect"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1>Go Back</h1>
      </button>
      <section className="flex-center mt-4">
      <div className="pane_section w-fit flex flex-col items-center justify-center bg-white rounded-md shadow-lg p-5 gap-5 md:p-10">
        <div className="w-full flex-center">
          <QrReader
            delay={100}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
        <p className="text-lg">{allData.qr_code_data ? "Data Received!" : "Data not Received!"}</p>
        <button
          disabled={allData.qr_code_data ? false : true}
          onClick={handleMarkAttendance}
          className={
            allData.qr_code_data
              ? "btn"
              : "btn opacity-10 hover:text-primary-white hover:bg-primary-black"
          }
        >
          Mark Attendance
        </button>
      </div>
      </section>
    </section>
  );
};

export default ScanQRPage;
