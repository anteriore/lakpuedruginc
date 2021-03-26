import { Modal, message } from 'antd';

const statusDialogue = (response, dialogueType) => {
  if (dialogueType === 'message') {
    switch (response.statusLevel) {
      case 'warning':
        return message.warning({
          content: response.statusMessage,
          key: response.action,
        });
      case 'error':
        return message.error({
          content: response.statusMessage,
          key: response.action,
        });
      case 'success': 
        return message.success({
          content: response.statusMessage,
          key: response.action,
        });
      default:
        return message.loading({
          content: response.statusMessage,
          key: response.action,
        })
    }
  } else {
    switch (response.statusLevel) {
      case 'warning':
        return Modal.warning(response?.modalContent ?? {});
      case 'error':
        return Modal.error(response?.modalContent ?? {});
      default:
        return Modal.success(response?.modalContent ?? {});
    }
  }
};

export default statusDialogue;
