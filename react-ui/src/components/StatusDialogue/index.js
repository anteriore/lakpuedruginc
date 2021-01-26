import { Modal, message } from 'antd';

const statusDialogue = (response, dialogueType) => {
  if (dialogueType === 'message') {
    switch (response.statusLevel) {
      case 'warning':
        return message.warning(response.statusMessage);
      case 'error':
        return message.error(response.statusMessage);
      default:
        return message.success(response.statusMessage);
    }
  } else {
    switch (response.statusLevel) {
      case 'warning':
        return Modal.warning(response.modalContent);
      case 'error':
        return Modal.error(response.modalContent);
      default:
        return Modal.success(response.modalContent);
    }
  }
};

export default statusDialogue;
