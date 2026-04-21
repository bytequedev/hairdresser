import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AiOutlineHome } from "react-icons/ai";
import { LuScissors } from "react-icons/lu";
import { BsImages } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import AuthModal from "./AuthModal";
import "../../styles/BottomNavBar.css";

/* Navigation items that scroll to a section */
const scrollItems = [
  { name: "anasayfa",  label: "Anasayfa",  Icon: AiOutlineHome },
  { name: "hizmetler", label: "Hizmetler", Icon: LuScissors },
  { name: "galeri",    label: "Galeri",    Icon: BsImages },
  { name: "randevu",   label: "Randevu",   Icon: MdOutlineCalendarMonth },
  { name: "iletisim",  label: "İletişim",  Icon: IoCallOutline },
];

const BottomNavBar = ({ active, setActive }) => {
  const [user, setUser]           = useState(null);
  const [showAuth, setShowAuth]   = useState(false);
  const [displayName, setDisplayName] = useState("");

  /* Listen to Firebase auth state */
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setDisplayName(u?.displayName || "");
    });
    return () => unsub();
  }, []);

  const handleScroll = (section) => {
    setActive(section);
    scroller.scrollTo(section, {
      duration: 600,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -70,
    });
  };

  const handleAuthClick = () => {
    if (user) {
      signOut(getAuth());
    } else {
      setShowAuth(true);
    }
  };

  /* Label shown in the auth button */
  const authLabel = user
    ? (displayName || user.email?.split("@")[0] || "Üye")
    : "Giriş / Üye";

  return (
    <>
      <nav
        className="bottom-navbar"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="bottom-navbar__list">
          {/* Scroll items */}
          {scrollItems.map(({ name, label, Icon }) => (
            <li key={name} className="bottom-navbar__item">
              <button
                className={`bottom-navbar__btn${active === name ? " bottom-navbar__btn--active" : ""}`}
                onClick={() => handleScroll(name)}
                aria-label={label}
                aria-current={active === name ? "page" : undefined}
              >
                <span className="bottom-navbar__icon-wrap">
                  <span className="bottom-navbar__icon" aria-hidden="true">
                    <Icon />
                  </span>
                </span>
                <span className="bottom-navbar__label">{label}</span>
              </button>
            </li>
          ))}

          {/* Auth item */}
          <li className="bottom-navbar__item">
            <button
              className={`bottom-navbar__btn bottom-navbar__btn--auth${user ? " bottom-navbar__btn--loggedin" : ""}`}
              onClick={handleAuthClick}
              aria-label={user ? "Çıkış Yap" : "Giriş Yap / Üye Ol"}
            >
              <span className="bottom-navbar__icon-wrap">
                <span className="bottom-navbar__icon" aria-hidden="true">
                  <HiOutlineUser />
                </span>
              </span>
              <span className="bottom-navbar__label bottom-navbar__label--auth">
                {authLabel}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <AuthModal
        show={showAuth}
        onClose={() => setShowAuth(false)}
        setDisplayName={setDisplayName}
      />
    </>
  );
};

export default BottomNavBar;
