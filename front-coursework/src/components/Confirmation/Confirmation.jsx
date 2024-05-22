import CloseIcon from '../../assets/img/close.svg';
import './Confirmation.scss';

const Confirmation =({children, action})=>{
  return (<>
    <div className="confirmation-modal">
      <button className="confirmation__close-button">
        <img src={CloseIcon} width="18" height="18" alt=""/>
      </button>
      <p className="confirmation__text">{children}</p>
      <div className="confirmation__buttons-container">
        <button className="confirmation__action-button">{action}</button>
        <button className="confirmation__cancel-button">Cancel</button>
      </div>
    </div>
  </>)
}

export default Confirmation;