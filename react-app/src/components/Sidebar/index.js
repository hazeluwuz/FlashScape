import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import LogoutButton from "../auth/LogoutButton";
import ClassList from "../Class/ClassList";
import smallLogo from "../../images/small-logo.png";

function Sidebar() {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  return (
    <div className="side-bar">
      {/* User Info and Decks list*/}
      <div className="side-bar-info-outer">
        <div className="side-bar-info">
          <div className="side-bar-logo-container">
            <img className="side-bar-logo" src={smallLogo} alt="" />
          </div>
          <div className="user-info">
            <div className="user-picture-container">
              <img
                className="user-picture"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt=""
              />
            </div>
            <div className="user-info-name">
              {user.first_name} {user.last_name}
            </div>
          </div>
          <div className={`user-cog`} onClick={openMenu}>
            <i
              class={`fa-solid fa-gear fa-xl ${
                showMenu ? "user-menu-open" : ""
              }`}
            ></i>
            {showMenu && (
              <div className="profile-menu">
                <div className="profile-dropdown">
                  <div className="dropdown-item">
                    <LogoutButton />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="side-bar-classes">
        <ClassList />
      </div>
    </div>
  );
}

export default Sidebar;
