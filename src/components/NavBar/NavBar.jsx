import NavBarItem from "./NavBarItem";
import DashboardIcon from "../../assets/icons/Dashboard.png";
import DashboardIconActive from "../../assets/icons/DashboardActive.png";
import BoardsIcon from "../../assets/icons/Boards.png";
import BoardsIconActive from "../../assets/icons/BoardsActive.png";
import ProfileIcon from "../../assets/icons/User.png";
import ProfileIconActive from "../../assets/icons/UserActive.png";
import SearchIcon from "../../assets/icons/Search.png";
import SearchIconActive from "../../assets/icons/SearchActive.png";
import SettingsIcon from "../../assets/icons/Settings.png";
import SettingsIconActive from "../../assets/icons/SettingsActive.png";
import FaceImage from "../../assets/images/Face.png";
import "./NavBar.css";

const topNavItems = [
  { screen: "dashboard", label: "Search", icon: DashboardIcon, activeIcon: DashboardIconActive },
  { screen: "boards", label: "Boards", icon: BoardsIcon, activeIcon: BoardsIconActive },
  { screen: "profile", label: "Profile", icon: ProfileIcon, activeIcon: ProfileIconActive },
  { screen: "search", label: "Search", icon: SearchIcon, activeIcon: SearchIconActive },
];

const bottomNavItems = [
  { screen: "profile", label: "Profile", icon: FaceImage, activeIcon: FaceImage },
  { screen: "settings", label: "", icon: SettingsIcon, activeIcon: SettingsIconActive },
];

function NavBar({ handleScreenChange, activeScreen }) {
  const onScreenChange = (screen) => {
    handleScreenChange(screen);
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-bar--top-menu">
        {topNavItems.map(({ screen, label, icon, activeIcon }) => (
          <NavBarItem key={screen} label={label} icon={screen === activeScreen ? activeIcon : icon} onClick={() => onScreenChange(screen)} activeScreen={activeScreen} screen={screen} />
        ))}
      </ul>
      <ul className="nav-bar--bottom-menu">
        {bottomNavItems.map(({ screen, label, icon, activeIcon }) => (
          <NavBarItem key={screen} label={label} icon={screen === activeScreen ? activeIcon : icon} onClick={() => onScreenChange(screen)} activeScreen={activeScreen} screen={screen} />
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
