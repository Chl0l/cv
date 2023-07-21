function Home() {
  return (
    <div>
      <div className="md:grid md:relative md:items-center md:justify-items-center md:containerHome">
        <div className="md:w-[10rem] md:h-[22rem] bg-[#EC76AD] md:rect" />
        <img src="/assets/Img/Img1.jpeg" alt="accueil" className="md:pict" />
        <h1 className="md:title">Welcome!</h1>
      </div>
      <img
        src="assets/vectors/vector_flower1bis.png"
        alt="flower"
        className="md:vectorFl1b"
      />
      <div className="md:flex md:justify-center md:mt-[2rem]">
        <div className="md:intro">
          <p>Développeur Web Fullstack</p>
          <p>
            En recherche d'une alternance (3/1) à partir du mois d'octobre 2023
            !
          </p>
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

export default Home;
