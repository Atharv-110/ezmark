import PropTypes from 'prop-types';

const benefits = [
  {
    id: 1,
    iconClass: "fa-solid fa-desktop",
    title: "Accessibility",
    desc: "Easy and hassle-free access via desktop, mobile or desktop.",
  },
  {
    id: 2,
    iconClass: "fa-solid fa-cubes-stacked",
    title: "Features",
    desc: "Robust features like Geofencing and QR Attendance",
  },
  {
    id: 3,
    iconClass: "fa-solid fa-shield-halved",
    title: "Security",
    desc: "From login to your last session, everything is highly secured",
  },
  {
    id: 4,
    iconClass: "fa-solid fa-face-laugh-beam",
    title: "Minimal UI",
    desc: "For the aesthetics out there, we provide minimalistic UI/UX",
  },
];

const BenefitCard = ({ icon, title, desc }) => {
  return (
    <div className="md:place-self-center flex-center flex-col border-2 border-transparent gap-y-2 md:w-[500px] bg-white text-primary-black shadow-md p-4 rounded-md text-6xl hover:border-blue-400 transition-effect">
      <i className={icon}></i>
      <h1 className="text-center text-2xl font-semibold">{title}</h1>
      <p className="text-center text-base text-gray-dark">{desc}</p>
    </div>
  );
};

BenefitCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

const KeyBenefitSection = () => {
  return (
    <section className="mt-32 flex-center flex-col">
      <h2 className="section_title">Key Benefits</h2>
      <p className="section_subtitle">
        Our application provides all the basic to advanced features that will surely increase the user experience. This is the revolution for the physical attendance procedure.
      </p>
      <div className="w-full px-2 gap-y-4 grid-cols-1 md:gap-y-10 grid md:grid-cols-2 mt-10">
        {benefits.map((item) => (
          <BenefitCard
            key={item.id}
            icon={item.iconClass}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyBenefitSection;
