import { departmentsData } from "../../assets/data/data.jsx";
import SearchIcon from "../../assets/img/search.svg";
import './Departments.scss';

const Departments = () => {
  
  return (<>
    <div className="main-container">
      <div className="main-nav">
        <div className="search-container">
          <label className="search-container__search">
            <img className="search-container__search-icon" width="16" height="16" src={SearchIcon}/>
            <input className="search-container__search-input" placeholder="Search"/>
          </label>
        </div>
      </div>
      <div className="table">
        <div className="table__header table__header--4">
          <div className="table__item--header">Name</div>
          <div className="table__item--header">Description</div>
        </div>
        <ul className="table__list">
          {(departmentsData.length > 0)
            ? (
              departmentsData.map(({ id, name, description }) => {
                return (<li key={id} className="table__row-item table__row-item--4">
                  <div className="table__item table__item--row">{name}</div>
                  <div className="table__item table__item--row departments-table__item--row-2-4">{description}</div>
                </li>)
              })
            )
            : (
              <p className="page-container__title">
                No departments found
              </p>
            )}
        </ul>
      </div>
    </div>
  </>)
}

export default Departments;