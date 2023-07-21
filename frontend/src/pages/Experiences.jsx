import { useExperience } from "../contexts/ExperienceContext";
import ExperienceBubble from "../components/ExperienceBubble";

function Experiences() {
  const { experiences } = useExperience();

  return (
    <div className="mainEx">
      <div className="main lg:all">
        {experiences.map((experience) => (
          <ExperienceBubble
            key={experience.id}
            idexperience={experience.id}
            enterprise={experience.enterprise}
            localisation={experience.localisation}
            jobTitle={experience.jobTitle}
            startDate={experience.startDate}
            endDate={experience.endDate}
          />
        ))}
        {/* <div
          className={`lg:firstLine ${
            areAllBubblesOpened ? "lg:firstLine--expanded" : ""
          }`}
        />
        <div
          className={`lg:secondLine ${
            areAllBubblesOpened ? "lg:secondLine--reduced" : ""
          }`}
        />
        <div
          className={`lg:thirdLine ${
            areAllBubblesOpened ? "lg:thirdLine--expanded" : ""
          }`}
        />
        <div
          className={`lg:fourthLine ${
            areAllBubblesOpened ? "lg:fourthLine--expanded" : ""
          }`}
        />
        <div
          className={`lg:fifthLine ${
            areAllBubblesOpened ? "lg:fifthLine--expanded" : ""
          }`}
        />
        <div
          className={`lg:sixthLine ${
            areAllBubblesOpened ? "lg:sixthLine--expanded" : ""
          }`}
        /> */}
      </div>
      <div className="md:rs">
        <a href="." className="link">
          <img
            src="assets/icon/github.svg"
            alt="github logo"
            className="md:w-[2.5%]"
          />
        </a>
        <a href="." className="link">
          <img
            src="assets/icon/linkedin.svg"
            alt="linkedin logo"
            className="md:w-[2.5%]"
          />
        </a>
      </div>
    </div>
  );
}

export default Experiences;
