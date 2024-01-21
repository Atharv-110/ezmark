import React from "react";

const MetricCard = ({ title, value }) => {
  return (
    <div className="metric_card w-[30%] shadow-lg rounded-md flex flex-col gap-3 p-3 md:p-4">
      <h1 className="text-2xl md:text-4xl font-bold">{value}</h1>
      <h1 className="text-sm md:text-2xl font-semibold">{title}</h1>
    </div>
  );
};

export default MetricCard;
