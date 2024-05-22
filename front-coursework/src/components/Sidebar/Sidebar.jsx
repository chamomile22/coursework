import { paths } from "../../routes.jsx";
import { useStore } from "../../store/store.jsx";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SettingsIcon from "../../assets/img/settings.svg";
import LogOutIcon from "../../assets/img/log-out.svg";
import { adminLinks, doctorLinks, patientLinks } from "../../assets/data/data.jsx";
import './Sidebar.scss';

const Sidebar = () => {
  const [{ user: { roleId, userName, email } }, setState] = useStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState('');
  const links = (roleId === 1 && adminLinks) || (roleId === 2 && doctorLinks) || (roleId === 3 && patientLinks) || [];
  
  const isLinkActive = (isActive) => "sidebar__link" + (isActive ? "--active" : '')
  
  return (<>
    <div className="sidebar">
      <div className="sidebar__info">
        <div className="sidebar__user-info">
          <div className="sidebar__username">
            {userName}
          </div>
          <div className="sidebar__useremail">
            {email}
          </div>
          <p
            className="sidebar__userrole">{(roleId === 1 && 'Admin') || (roleId === 2 && 'Doctor') || (roleId === 3 && 'Patient')}</p>
        </div>
        <button className="sidebar__logout-button" onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem('signedIn');
          setState(prevState => {
            return {
              ...prevState,
              user: { ...prevState.user, roleId: null }
            }
          })
          navigate(paths.login);
        }}><img className="sidebar__logout-button-icon" src={LogOutIcon} alt="ico"/>
        </button>
      </div>
      <nav className="sidebar__nav">
        {links.map(({ id, path, title }) => {
          return (<NavLink key={id} to={path} className={({ isActive }) => `sidebar__link ${isLinkActive(isActive)}`}>
            <span>{title}</span>
          </NavLink>)
        })}
      </nav>
      
      <button className="sidebar__settings-button">
        <img className="sidebar__settings-button-icon" src={SettingsIcon} alt="ico"/>
      </button>
    </div>
  </>)
}

export default Sidebar;