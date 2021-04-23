// Items actions
// get list items message
export const ITEMS_GET_PENDING = 'Retrieving data';
export const ITEMS_GET_FULFILLED = 'Successfully retrieved data';
export const ITEMS_GET_REJECTED = 'Failed to retrieve data';
export const ITEMS_GET_EMPTY = 'No datas retrieved';

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

// response messages
export const API_401 = 'Sorry, you are not authorized to access this page.';
export const API_500 = 'Sorry, something went wrong to the server.';
export const API_200_EMPTY = 'There are no data saved';
export const API_200_SUCCESS = 'Success fetching list';
export const API_UNDEFINED = 'Undefined response.';

// Titles
export const NO_DATA_FOUND = 'No Data Found!';

// Description
export const NO_DATA_FOUND_DESC = (tableName) =>
  `Sorry, it appears that we can't retrieve any data from ${tableName} because the table is currently empty. Please go to ${tableName} page to create some data.`;

export const ERROR_OCCURED = 'failed. An error has occurred';
