import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';

const dashboard = combineReducers({
    purchaseRequests,
})

export default dashboard