import { Link } from "react-router-dom";

const teamDetails = [
  {
    id: 1,
    name: "Atharv Vani",
    profile: "/images/atharv.jpg",
    designation: "Frontend Developer",
    socials: {
      portfolio: "https://www.atharv110.tech/",
      github: "https://github.com/Atharv-110",
      linkedin: "https://www.linkedin.com/in/atharv-vani110/",
      twitter: "https://twitter.com/atharv_110",
    },
  },
  {
    id: 2,
    name: "Abhishek Kumar",
    profile: "/images/atharv.jpg",
    designation: "Backend Developer",
    socials: {
      portfolio: "",
      github: "",
      linkedin: "",
      twitter: "",
    },
  },
];

const TeamCard = ({ name, profile, designation, socials }) => {

  return (
    <div className="bg-white border shadow-lg p-4 overflow-hidden rounded-md flex items-center flex-col gap-y-4">
      <img src={profile} alt="profile picture" className="w-[280px] rounded-md" />
      <div>
        <h2 className="text-xl font-semibold text-center mb-1">{name}</h2>
        <p className="bg-blue-400 px-2 w-fit rounded-md text-primary-white font-medium text-sm">
          {designation}
        </p>
      </div>
      <div className="w-full border-t border-gray-light pt-3 px-5">
        <div className="flex-between">
          <Link
            to={socials.portfolio}
            target="_blank"
            className="team_card_icon"
          >
            <i className="fa-solid fa-briefcase"></i>
          </Link>
          <Link to={socials.github} target="_blank" className="team_card_icon">
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link
            to={socials.linkedin}
            target="_blank"
            className="team_card_icon"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </Link>
          <Link to={socials.twitter} target="_blank" className="team_card_icon">
            <i className="fa-brands fa-twitter"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TeamCardSection = () => {
  const data = teamDetails;
  return (
    <section className="mt-6 w-full flex max-sm:flex-col justify-center items-center gap-6 md:gap-x-32">
      {data.map((item, idx) => (
        <TeamCard
          key={idx}
          name={item.name}
          profile={item.profile}
          designation={item.designation}
          socials={item.socials}
        />
      ))}
    </section>
  );
};

export default TeamCardSection;
