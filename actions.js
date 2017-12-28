import {
  EXPAND_SECTION,
  COLLAPSE_SECTION,  
  INITIALIZE_SECTION,
} from './constants';

export function initializeSection (uid, collapse, collapseClasses, titleClasses) {
  return {
    type: INITIALIZE_SECTION,
    uid,
    collapse,
    collapseClasses,
    titleClasses,
  }
}

export function expandSection(uid) {
  return {
    type: EXPAND_SECTION,
    uid,
  }
}

export function collapseSection(uid) {
  return {
    type: COLLAPSE_SECTION,
    uid,
  }
}
