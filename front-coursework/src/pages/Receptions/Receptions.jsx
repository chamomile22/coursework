import AddIcon from '../../assets/img/add.svg';
import SearchIcon from '../../assets/img/search.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem, Select, ThemeProvider } from "@mui/material";
import { DatepickerTheme } from "../../assets/data/DatepickerTheme.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CalendarIcon from "../../assets/img/calendar.svg";
import { useState } from "react";
import { departmentsData, usersData, receptionsData, receptionsTabs } from "../../assets/data/data.jsx";
import './Receptions.scss';
import { useStore } from "../../store/store.jsx";

const Receptions = () => {
  const [{ user: { roleId } },] = useStore();
  const [date, setDate] = useState(dayjs());
  const [departmentSelect, setDepartmentSelect] = useState('');
  const [doctorSelect, setDoctorSelect] = useState('');
  const [receptionStatus, setReceptionStatus] = useState('all');
  
  const doctorsData = usersData.filter(user => user.roleId === 2);
  
  return (<>
    <div className="main-container">
      <div className="main-nav">
        <button className="main-nav__button">
          <img className="main-nav__button-icon" width="17" height="17" src={AddIcon}/>
          <span className="main-nav__button-text">Book</span>
        </button>
        <div className="search-container">
          <div className="search-container__filters">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={DatepickerTheme}>
                <DatePicker
                  label=""
                  views={["year", "month", "day"]}
                  value={date}
                  onChange={(value) => {
                    setDate(dayjs(value));
                  }}
                  closeOnSelect={false}
                  slots={{
                    openPickerIcon: () => <img alt="ico" src={CalendarIcon} style={{ width: 17, height: 17 }}/>,
                  }}
                  slotProps={{
                    textField: {
                      placeholder: 'Date'
                    }
                  }}
                  format={'DD.MM.YYYY'}
                  sx={{
                    width: '110px',
                    height: 30,
                    border: '1px solid #6681DF',
                    borderRadius: '4px',
                    padding: '7px 10px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      opacity: 1,
                      color: '#303030',
                    },
                    '& .MuiIconButton-root': {
                      padding: 0,
                      color: '#303030',
                      marginTop: '-3px'
                    },
                    '& .MuiOutlinedInput-root': {
                      paddingRight: 0,
                    },
                    '& .MuiOutlinedInput-input': {
                      fontSize: '12px',
                      padding: 0
                    },
                    '& .MuiInputLabel-root': {
                      color: '#0000001F'
                    },
                    '& .MuiInputAdornment-root': {
                      width: 20,
                    },
                  }}
                />
              </ThemeProvider>
            </LocalizationProvider>
            <Select
              id="demo-simple-select-filled"
              displayEmpty
              autoWidth
              value={departmentSelect}
              onChange={(e) => setDepartmentSelect(e.target.value)}
              IconComponent={ExpandMoreIcon}
              sx={{
                height: 30,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6681DF',
                },
                '& .MuiSelect-select': {
                  paddingTop: '0',
                  paddingBottom: '0',
                  paddingRight: '40px',
                  paddingLeft: '10px',
                  fontSize: '12px',
                },
                '& .MuiSelect-icon': {
                  width: 17,
                  fill: '#303030'
                },
              }}>
              <MenuItem
                value=""
                sx={{
                  fontSize: 12
                }}>
                <span>Department</span>
              </MenuItem>
              {departmentsData.map(({ name }, index) => {
                return (<MenuItem
                  key={index}
                  sx={{
                    fontSize: 13
                  }}
                  value={name}>{name}</MenuItem>)
              })}
            </Select>
            <Select
              id="demo-simple-select-filled"
              displayEmpty
              autoWidth
              value={doctorSelect}
              onChange={(e) => setDoctorSelect(e.target.value)}
              IconComponent={ExpandMoreIcon}
              sx={{
                height: 30,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6681DF',
                },
                '& .MuiSelect-select': {
                  paddingTop: '0',
                  paddingBottom: '0',
                  paddingRight: '40px',
                  paddingLeft: '10px',
                  fontSize: '12px'
                },
                '& .MuiSelect-icon': {
                  width: 17,
                  fill: '#303030'
                },
              }}>
              <MenuItem
                value=""
                sx={{
                  fontSize: 12
                }}>
                <span>Doctor</span>
              </MenuItem>
              {doctorsData.map(({ fullName }, index) => {
                return (<MenuItem
                  key={index}
                  sx={{
                    fontSize: 13
                  }}
                  value={fullName}>{fullName}</MenuItem>)
              })}
            </Select>
          </div>
          <label className="search-container__search">
            <img className="search-container__search-icon" width="16" height="16" src={SearchIcon}/>
            <input className="search-container__search-input" placeholder="Search"/>
          </label>
        </div>
      </div>
      <div className="table">
        <nav className="receptions-table__nav">
          {receptionsTabs.map(tab => (
            <button
              key={tab.id}
              className={receptionStatus === tab.status
                ? "receptions-table__nav-tab receptions-table__nav-tab--selected"
                : "receptions-table__nav-tab "}
              onClick={() => setReceptionStatus(tab.status)}
            >
              {tab.title}
            </button>
          ))}
        </nav>
        <div className="table__header table__header--6">
          <div className="table__item--header">Date</div>
          <div className="table__item--header">Patient email</div>
          <div className="table__item--header">Doctor</div>
          <div className="table__item--header">Status</div>
          <div className="table__item--header">Diagnosis</div>
          {roleId === 3 && (receptionStatus === "done" || receptionStatus === "all") &&
            <div className="table__item--header">Action</div>}
        </div>
        <ul className="table__list">
          {(receptionsData.length > 0)
            ? (
              receptionsData.filter((reception) => {
                if (receptionStatus !== 'all') {
                  return reception?.status?.toLowerCase() === receptionStatus;
                }
                return reception;
              }).map(({ id, patientId, doctorId, date, diagnosis, status }) => {
                const doctorName = usersData.find(user => user.id === doctorId)?.fullName;
                const patientName = usersData.find(user => user.id === patientId)?.fullName;
                
                return (<li key={id} className="table__row-item table__row-item--6">
                  <div className="table__item table__item--row">{dayjs(date).format('DD.MM.YYYY HH:mm')}</div>
                  <div className="table__item table__item--row">{patientName}</div>
                  <div className="table__item table__item--row">{doctorName}</div>
                  <div className="table__item table__item--row">{status}</div>
                  <div className="table__item table__item--row">{diagnosis}</div>
                  <div className="table__item table__item--row">
                    {roleId === 3 && (receptionStatus === "done" || (receptionStatus === "all" && status === "done")) &&
                      <button className="main-nav__button">Pay</button>}
                    {roleId !== 2 && (receptionStatus === "booked" || (receptionStatus === "all" && status === "booked")) &&
                      <button className="main-nav__button">Cancel</button>}
                  </div>
                </li>)
              })
            )
            : (
              <p className="page-container__title">
                No receptions here yet
              </p>
            )}
        </ul>
      </div>
    </div>
  </>)
}

export default Receptions;