import { useState, useEffect } from "react";
import Navbar from "../core/Navbar";
import QRCode from "react-qr-code";

const GenerateQRPage = () => {
  const [count, setCount] = useState(5);
  const [coolDown, setCoolDown] = useState(15);

  const [value, setValue] = useState(1);

  useEffect(() => {
    //Implementing the setInterval method
    if (count > 0) {
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [count]);

  useEffect(() => {
    //Implementing the setInterval method
    if (coolDown > 0) {
      const interval = setInterval(() => {
        setCoolDown(coolDown - 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [coolDown, value]);

  useEffect(() => {
    setTimeout(() => {
      setValue(value + 1);
      setCoolDown(15);
    }, 15000);
  }, [value]);

  return (
    <section className="w-full px-2 mt-24 md:mt-32">
      <Navbar />
      <section className="panel_section flex items-center justify-center">
        <div className="w-full bg-white shadow-lg p-6 rounded-md">
          {count == 0 ? (
            <div className="flex flex-col items-center gap-10">
              <QRCode value={value + ""} />{" "}
              <h1 className="text-xl md:text-2xl">
                Re-generating QR in <span className="font-semibold">{coolDown}</span>
              </h1>
            </div>
          ) : (
            <h1 className="text-xl md:text-2xl text-center">Generating QR in <span className="font-semibold">{count}</span></h1>
          )}
        </div>
      </section>
    </section>
  );
};

export default GenerateQRPage;
