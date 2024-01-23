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
    profile: "/images/abhishek.jpeg",
    designation: "Backend Developer",
    socials: {
      github: "https://github.com/Abhishek6973",
      linkedin: "https://www.linkedin.com/in/abhishek-kumar-658a47245/",
    },
  },
];

const TeamCard = ({ name, profile, designation, socials }) => {
  return (
    <div className="bg-white border shadow-lg p-4 rounded-lg flex items-center flex-col gap-y-4">
      <div className="w-full overflow-hidden rounded-md border-2 border-transparent hover:border-blue-400 transition-effect">
        <img
          src={profile}
          alt="profile picture"
          className="w-[280px] hover:scale-105 transition-effect"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-center mb-1">{name}</h2>
        <p className="bg-blue-400 px-2 w-fit rounded-md text-primary-white font-medium text-sm">
          {designation}
        </p>
      </div>
      <div className="w-full border-t border-gray-light pt-4 px-4">
        <div className="w-full flex-center gap-6">
          {socials.portfolio ? (
            <Link
              to={socials.portfolio}
              target="_blank"
              className="team_card_icon"
            >
              <i className="fa-solid fa-briefcase"></i>
            </Link>
          ) : (
            ""
          )}
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
          {socials.twitter ? (
            <Link
              to={socials.twitter}
              target="_blank"
              className="team_card_icon"
            >
              <i className="fa-brands fa-twitter"></i>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const TeamCardSection = () => {
  const data = teamDetails;
  return (
    <section className="mt-32 flex-center flex-col">
      <h2 className="section_title">Meet ByteBlasters</h2>
      <p className="section_subtitle">
        The one and only force behind development of ezMark from scratch.
        Recursively testing and upgrading the application for seamless and best
        user experience.
      </p>
      <div className="w-full mt-10 flex-center max-sm:flex-col gap-y-6 md:gap-x-[15%]">
        {data.map((item, idx) => (
          <TeamCard
            key={idx}
            name={item.name}
            profile={item.profile}
            designation={item.designation}
            socials={item.socials}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamCardSection;
