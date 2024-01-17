import Navbar from "../core/Navbar"
import CurrentDateTimeCard from "../core/CurrentDateTimeCard"
import MetricCard from "../core/MetricCard"

const StudentDashboard = () => {
  return (
    <section className="w-full md:w-[95%] mx-auto">
      <Navbar />
      <section className="panel_section flex-center gap-4 md:gap-10 flex-wrap">
        <CurrentDateTimeCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </section>
      <hr />
      <section className="panel_section w-full md:w-fit mx-auto">
        <h1 className="text-center mb-6 text-xl font-medium">Quick access links</h1>
        <div className="flex gap-1 md:gap-8">
          <button className="btn">Generate QR</button>
          <button className="btn_bordered">Scan QR</button>
        </div>
      </section>
    </section>
  )
}

export default StudentDashboard