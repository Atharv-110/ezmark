import Loader from "./Loader";

const MetricCard = ({ title, value, loading }) => {
  return (
    <div className="metric_card w-[30%] shadow-lg rounded-md flex flex-col gap-3 p-3 md:p-4">
      {loading ? (
        <Loader color="white" />
      ) : (
        <h1 className="text-2xl md:text-4xl font-bold">{value}</h1>
      )}

      <h1 className="text-sm md:text-2xl font-semibold">{title}</h1>
    </div>
  );
};

export default MetricCard;
