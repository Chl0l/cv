import { NavLink } from "react-router-dom";
import { useExperience } from "../../contexts/ExperienceContext";
import ExperienceBubbleAdmin from "../../components/ExperienceBubbleAdmin";

function ExperiencesAdmin() {
  const { experiences, fetchExperiences } = useExperience();

  return (
    <div>
      <NavLink to="/admin/createxperience1">
        <button type="button" className="btnAd1 w-[5%] flex border">
          <img src="/assets/adminBtn/add_1.svg" alt="add button relative" />
        </button>
      </NavLink>
      <div className="main lg:all">
        {experiences.map((experience) => (
          <ExperienceBubbleAdmin
            key={experience.id}
            idexperience={experience.id}
            enterprise={experience.enterprise}
            localisation={experience.localisation}
            jobTitle={experience.jobTitle}
            startDate={experience.startDate}
            endDate={experience.endDate}
            onDelete={() => {
              fetchExperiences();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ExperiencesAdmin;
