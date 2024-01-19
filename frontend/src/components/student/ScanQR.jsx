import { useState } from "react";
import Navbar from "../core/Navbar";
import QrReader from "react-qr-scanner";

const ScanQRPage = () => {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    if (data) {
      const parsedData = JSON.stringify(data.text); // or use the relevant property from the result object
      // console.log(parsedData);
      setResult(parsedData);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };


  const previewStyle = {
    height: 500,
    width: 500,
  }

  return (
    <section className="w-full px-2 mt-24 md:mt-32">
      <Navbar />
      <section className="pane_section flex flex-col items-center justify-center">
        <div className="w-full md:w-[500px]">
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
          <p>{result}</p>
      </section>
    </section>
  );
};

export default ScanQRPage;
