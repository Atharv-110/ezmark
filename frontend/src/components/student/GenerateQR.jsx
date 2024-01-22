import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { getGenerateQR } from "../../services/get-service";

const GenerateQRPage = ({ setGenerateQR }) => {
  const [count, setCount] = useState(5);
  const [coolDown, setCoolDown] = useState(65);

  const [value, setValue] = useState("");

  useEffect(() => {
    //Implementing the setInterval method
    if (count > 0) {
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    } else {
      handleGenerateQR();
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
    handleGenerateQR();
    setCoolDown(65);
  }, [coolDown, value]);

  const handleGenerateQR = async () => {
    const data = await getGenerateQR();
    setValue(data.data);
  };

  return (
    <section className="w-full px-2 mt-24 md:mt-32">
      <button
        onClick={() => setGenerateQR(false)}
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
      <section className="panel_section w-fit mx-auto flex items-center justify-center">
        <div className="w-full bg-white shadow-lg p-8 rounded-md">
          {count == 0 ? (
            <div className="flex flex-col items-center gap-10">
              <QRCode value={value + ""} />
              <h1 className="text-xl">
                Re-generating QR in{" "}
                <span className="font-semibold">{coolDown} seconds</span>
              </h1>
            </div>
          ) : (
            <h1 className="text-xl text-center">
              Generating QR in{" "}
              <span className="font-semibold">{count} seconds</span>
            </h1>
          )}
        </div>
      </section>
    </section>
  );
};

export default GenerateQRPage;
