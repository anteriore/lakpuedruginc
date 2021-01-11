// Items actions
// get list items message
export const ITEMS_GET_PENDING = 'Retrieving data';
export const ITEMS_GET_FULFILLED = 'Successfully retrieved data';
export const ITEMS_GET_REJECTED = 'Failed to retrieve data';

// get item message
export const ITEM_GET_PENDING = 'Searching specific item';
export const ITEM_GET_FULFILLED = 'Successfully retrieved specific item';
export const ITEM_GET_REJECTED = 'Failed to retrieve specific item';

// add item message
export const ITEM_ADD_PENDING = 'Adding item';
export const ITEM_ADD_FULFILLED = 'Successfully added item';
export const ITEM_ADD_REJECTED = 'Failed to add item';

// update item message
export const ITEM_UPDATE_PENDING = 'Updating specified item';
export const ITEM_UPDATE_FULFILLED = 'Successfully updated specified item';
export const ITEM_UPDATE_REJECTED = 'Failed to update specified item';

// delete item message
export const ITEM_DELETE_PENDING = 'Deleting specified item';
export const ITEM_DELETE_FULFILLED = 'Successfully deleted specified item';
export const ITEM_DELETE_REJECTED = 'Failed to delete specified item';


// api errors

export const API_401 = 'Sorry, you are not authorized to access this page.'
export const API_500 = 'Sorry, something went wrong to the server.'