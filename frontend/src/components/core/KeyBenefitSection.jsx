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
    <div className="flex-center flex-col border-2 border-transparent gap-y-2 md:w-[20%] bg-white text-primary-black shadow-lg p-4 rounded-md text-6xl hover:border-blue-400 transition-effect">
      <i className={icon}></i>
      <h1 className="text-center text-2xl font-semibold">{title}</h1>
      <p className="text-center text-base text-gray-dark">{desc}</p>
    </div>
  );
};

const KeyBenefitSection = () => {
  return (
    <section className="mt-6 w-full flex max-sm:flex-col justify-center items-center gap-6 md:gap-x-14">
      {benefits.map((item) => (
        <BenefitCard
          key={item.id}
          icon={item.iconClass}
          title={item.title}
          desc={item.desc}
        />
      ))}
    </section>
  );
};

export default KeyBenefitSection;
