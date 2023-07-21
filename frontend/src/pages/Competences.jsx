function Competences() {
  return (
    <div>
      <div className="container">
        <div className="diagonal-text1">Compétences</div>
        <div className="skills">
          <div className="skill">
            <h2>TECH</h2>
          </div>
          <div className="skill">
            <p>React</p>
          </div>
          <div className="skill">
            <p>Tailwind CSS</p>
          </div>
          <div className="skill">
            <p>GitHub</p>
          </div>
          <div className="skill">
            <p>HTLM 5</p>
          </div>
          <div className="skill">
            <p>JavaScript</p>
          </div>
          <div className="skill">
            <p>Node.js</p>
          </div>
          <div className="skill">
            <p>MySql</p>
          </div>
          <div className="skill">
            <p>Express</p>
          </div>
          <div className="skill">
            <p>Pack Office</p>
          </div>
          <div className="skill">
            <p>Pack Mac</p>
          </div>
          <div className="skill">
            <p>Figma</p>
          </div>
          <div className="skill">
            <p className="text-end">
              Adobe : <br /> Indesign, Acrobat, <br />
              Lightroom
            </p>
          </div>
          <div className="skill">
            <p>Da Vinci Resolve</p>
          </div>
        </div>
        <div className="skills2">
          <div className="skill2">
            <h2>LINGUISTIQUE</h2>
          </div>
          <div className="skill2 font-bold">
            <p>Français :</p>
          </div>
          <div className="skill2">
            <p>Langue maternelle</p>
          </div>
          <div className="skill2 font-bold">
            <p>Anglais :</p>
          </div>
          <div className="skill2">
            <p>Courant</p>
          </div>
          <div className="skill2">
            <p>
              Bac européen section anglais <br /> et TOEFL (2015) : 99/120
            </p>
          </div>
        </div>
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

export default Competences;
