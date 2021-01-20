
import { message, Modal } from 'antd';
import {
NO_DATA_FOUND,
NO_DATA_FOUND_DESC,
} from '../data/constants/response-message.constant';

export const fnCallback = (response, history, useModal, onSuccess, returnURL) => {
    const { status } = response;
    switch (status) {
        case 200:
            onSuccess()
            if (response.data.length === 0) {
                if(useModal) {
                    Modal.warning({
                      title: NO_DATA_FOUND,
                      content: NO_DATA_FOUND_DESC(response.config.url.split(/[/?]/g)[1]),
                    });
                }
                else {
                    message.warning(response.statusText);
                }
            }
        break;
        case 400:
        case 500:
        break;
        default:
            history.push({
                pathname: `/error/${status === 400 ? 403 : status}`,
                state: {
                moduleList: returnURL,
                },
            });
        break;
    }
}