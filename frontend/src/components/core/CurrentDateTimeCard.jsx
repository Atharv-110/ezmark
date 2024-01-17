import { useEffect, useState } from "react";

const CurrentDateTimeCard = () => {
  const [time, setTime] = useState({
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        day: date.getDate(),
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number) => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  };

  return (
    <div className="w-fit flex flex-col p-4 gap-2 bg-white rounded-xl shadow-lg">
      <div className="w-full flex items-center justify-between gap-1">
        {time.hours >= 18 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
        <h1 className="font-bold text-xl text-gray-darker">
          <span>{convertToTwoDigit(time.hours)}:</span>
          <span>{convertToTwoDigit(time.minutes)}:</span>
          <span>{convertToTwoDigit(time.seconds)}</span>
          <span>{time.hours >= 12 ? " PM" : " AM"}</span>
        </h1>
      </div>
      <div className="text-xl font-bold">
        <h1 className="text-gray-darker">Today:</h1>
        <h1>
          {time.day}
          {time.day >= 4
            ? "th"
            : time.day == 1
            ? "st"
            : time.day == 2
            ? "nd"
            : time.day == 3
            ? "rd"
            : ""}{" "}
          <span>
            {time.month} {time.year}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default CurrentDateTimeCard;
