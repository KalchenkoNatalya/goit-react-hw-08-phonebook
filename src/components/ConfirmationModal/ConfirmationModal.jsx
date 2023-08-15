import Modal from 'react-modal';
import PropTypes from 'prop-types';
import css from './ConfirmationModal.module.css';

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className={css.modal}
    >
      <p className={css.textModal}>
        Are you sure you want <br></br>to delete this contact?
      </p>
      <div className={css.btnModalWrap}>
        <button className={css.btnModal} onClick={onDelete}>
          <span className={css.modalConfirm}>Confirm</span>{' '}
        </button>
        <button className={css.btnModal} onClick={onRequestClose}>
          {' '}
          <span className={css.modalCancel}>Cancel</span>{' '}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
