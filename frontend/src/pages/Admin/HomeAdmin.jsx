import { useUser } from "../../contexts/UserContext";

function HomePage() {
  const { handleSubmitLogIn, handleChange } = useUser();

  return (
    <div className="homeAd min-[490px]:homeAdxsm sm:homeAdsm xl:homeAdxl">
      <div className="centralCard md:centralCardMd lg:centralCardLg">
        <div className="centralCardPButton md:cardFaceFront md:centralCardPButtonMd xl:centralCardPButtonxl">
          <h3 className="centralCardTitle md:centralCardTitleMd">Connexion</h3>
          <form onSubmit={handleSubmitLogIn}>
            <div>
              <label htmlFor="email" className="text-[0.95rem]">
                Adresse mail
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email-connection"
                placeholder="exemple@gmail.com"
                required
                className="w-[90%] p-1 rounded m-1 text-[0.95rem]"
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="password" className="text-[0.95rem]">
                Mot de passe
              </label>
              <br />
              <input
                type="password"
                name="password"
                required
                className="w-[90%] p-1 rounded m-1"
                onChange={handleChange}
              />
            </div>
            <br />
            <button
              type="submit"
              className="self-center mt-2 p-2 text-[0.95rem] btn6"
            >
              Se connecter
            </button>
            <img
              src="assets/vectors/vector_flower2.png"
              alt="flower"
              className="vectorFl2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
