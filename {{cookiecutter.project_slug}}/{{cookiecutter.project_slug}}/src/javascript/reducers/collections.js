const initialState = {
    collections: [],
    projects: [],
};


export default function notes(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_COLLECTION':
      console.log('test');
      return state;
    default:
      return state;
  }
}