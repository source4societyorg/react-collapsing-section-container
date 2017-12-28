import { createSelector } from 'reselect';
import { Map as ImmutableMap } from 'immutable';

const selectCollapseSection = (key) => (state) => state.get('collapseSection').getIn(['collapseContainers', key], ImmutableMap({}));

const makeSelectCollapsed = (key) => createSelector(
  selectCollapseSection(key),
  (collapseSectionState) => collapseSectionState.get('collapsed', true),
);

const makeSelectCollapseClasses = (key) => createSelector(
  selectCollapseSection(key),
  (collapseSectionState) => collapseSectionState.get('collapseClasses', 'collapsed'),
);

const makeSelectTitleClasses = (key) => createSelector(
  selectCollapseSection(key),
  (collapseSectionState) => collapseSectionState.get('titleClasses', ''),
);

export {
  selectCollapseSection,
  makeSelectCollapsed,
  makeSelectCollapseClasses,
  makeSelectTitleClasses,
}
