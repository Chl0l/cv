import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavBarAdmin from "./NavBarAdmin";

export default function Layout({ children }) {
  const homePageBg = {
    background:
      "url('/assets/bg/vertical line.png') no-repeat 55.2% 0%/5% 35%, url('/assets/bg/horizontal line.png') no-repeat 0% 13%/65% 5%, url('/assets/bg/horizontal line.png') no-repeat 100% 39%/80% 5%, url('/assets/bg/EDECD7.png') no-repeat 0% bottom/55% 96%",
  };
  const ExpPageBg = {
    background:
      "url('/assets/bg/rgba(220, 224, 217, 0.6).png') no-repeat 0% bottom/55% 96%",
  };
  const ForPageBg = {
    background: "url('/assets/bg/E2EBDA.png') no-repeat 0% bottom/55% 96%",
  };
  const ComPageBg = {
    background: "url('/assets/bg/DBC6D7.png') no-repeat 0% bottom/55% 94%",
  };
  const otherPageBg = {
    background:
      "url('/assets/bg/rgba(220, 224, 217, 0.6).png') no-repeat 0% bottom/55% 94%",
  };

  const homePageMd = {
    background: "url('/assets/bg/EDECD7.png') no-repeat 0% bottom/55% 94%",
  };
  const ExpPageMd = {
    background:
      "url('/assets/bg/rgba(220, 224, 217, 0.6).png') no-repeat 0% bottom/55% 94%",
  };
  const ForPageMd = {
    background: "url('/assets/bg/E2EBDA.png') no-repeat 0% bottom/55% 96%",
  };
  const otherPageMd = {
    background:
      "url('/assets/bg/rgba(220, 224, 217, 0.6).png') no-repeat 0% bottom/55% 94%",
  };

  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const getBackgroundStyle = () => {
    if (isMobile) {
      if (location.pathname === "/admin") {
        return homePageBg;
      }
      if (location.pathname === "/admin/experiences") {
        return ExpPageBg;
      }
      if (location.pathname === "/admin/competences") {
        return ComPageBg;
      }
      if (location.pathname === "/admin/formations") {
        return ForPageBg;
      }
      return otherPageBg;
    }
    if (location.pathname === "/admin") {
      return homePageMd;
    }
    if (location.pathname === "/admin/experiences") {
      return ExpPageMd;
    }
    if (location.pathname === "/admin/formations") {
      return ForPageMd;
    }
    return otherPageMd;
  };

  return (
    <div className="root md:rootmd" style={getBackgroundStyle()}>
      <NavBarAdmin />
      <div className="h-screen">
        <div className="h-screen pt-8 pb-8">
          <main className="h-full overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
