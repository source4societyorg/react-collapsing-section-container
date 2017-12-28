import { fromJS, Map as ImmutableMap } from 'immutable';

import {
  EXPAND_SECTION,
  COLLAPSE_SECTION,
  INITIALIZE_SECTION,
} from './constants';

const initialState = fromJS({
  collapseContainers: {},
});

const collapsingContainerReducer = (state = initialState, action) => {
  let collapseContainer = null;
  
  switch (action.type) {
    case EXPAND_SECTION:
      collapseContainer = ImmutableMap({ collapsed: false, collapseClasses: '', titleClasses: state.getIn(['collapseContainers', action.uid, 'titleClasses'],'') });
      return state
        .setIn(['collapseContainers', action.uid], collapseContainer)
    case COLLAPSE_SECTION:      
      collapseContainer = ImmutableMap({ collapsed: true, collapseClasses: 'collapsed', titleClasses: state.getIn(['collapseContainers', action.uid, 'titleClasses'],'') });
      return state
        .setIn(['collapseContainers', action.uid], collapseContainer)
    case INITIALIZE_SECTION:
      collapseContainer = ImmutableMap({ collapsed: action.collapse, collapseClasses: action.collapseClasses, titleClasses: action.titleClasses });
      return state
        .setIn(['collapseContainers', action.uid], collapseContainer)
    default:
      return state
  }
}

export default collapsingContainerReducer;
