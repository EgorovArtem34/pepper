import { ClipLoader } from 'react-spinners';
import './modals.scss';

const ModalLoader = () => (
  <div className="modal">
    <div className="modal__content">
      <div className="modal__loader">
        <ClipLoader color="#000" size={54} />
      </div>
    </div>
  </div>
);

export default ModalLoader;
