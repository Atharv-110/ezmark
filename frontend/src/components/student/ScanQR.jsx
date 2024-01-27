import { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { setScanQRAPI } from "../../services/get-service";

const ScanQRPage = ({ setScanQR }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [allData, setAllData] = useState({
    qr_code_data: "",
    latitude: "",
    longitude: "",
  });

  const handleScan = async (data) => {
    if (data) {
      const parsedData = data.text;
      setAllData({
        qr_code_data: parsedData,
        latitude: String(latitude),
        longitude: String(longitude),
      });
    }
  };

  const handleMarkAttendance = async () => {
    const response = await setScanQRAPI(allData);
    if (response.msg === "Attendance marked successfully.") {
      setScanQR(false);
    }
  };

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
        className="px-2 py-1 rounded-full border-2 text-gray-light border-gray-light hover:border-primary-black hover:text-primary-black transition-effect"
      >
        <i className="fa-solid fa-arrow-left-long"></i>
      </button>
      <section className="flex-center mt-4">
        <div className="pane_section w-fit flex flex-col items-center justify-center bg-white rounded-md shadow-lg p-5 gap-5 md:p-10">
          <div className="w-full flex-center">
            <QrReader
              delay={100}
              style={previewStyle}
              facingMode="rear"
              onError={handleError}
              onScan={handleScan}
            />
          </div>
          <p
            className={
              allData.qr_code_data
                ? "bg-blue-400 px-3 rounded-md text-primary-white"
                : "bg-red-400 px-3 rounded-md text-primary-white"
            }
          >
            {allData.qr_code_data
              ? "QR Scanned Successfuly"
              : "QR Not Detected!"}
          </p>
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
