import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { STATUS } from 'foremanReact/constants';
import EmptyStateMessage from '../../../components/Table/EmptyStateMessage';
import Loading from '../../../components/Table/Loading';
import getContentViewDetails from './ContentViewDetailActions';
import { selectCVDetails,
  selectCVDetailStatus,
  selectCVDetailError } from './ContentViewDetailSelectors';

const DetailsContainer = ({ children, cvId, isOpen }) => {
  const dispatch = useDispatch();
  const details = useSelector(state => selectCVDetails(state, cvId), shallowEqual);
  const status = useSelector(state => selectCVDetailStatus(state, cvId), shallowEqual);
  const error = useSelector(state => selectCVDetailError(state, cvId), shallowEqual);

  useEffect(() => {
    if (isOpen && Object.keys(details).length === 0) {
      dispatch(getContentViewDetails(cvId));
    }
  });

  if (status === STATUS.PENDING) return (<Loading size="sm" />);
  if (status === STATUS.ERROR) return (<EmptyStateMessage error={error} />);
  return (<React.Fragment>{children}</React.Fragment>);
};

DetailsContainer.propTypes = {
  children: PropTypes.element.isRequired,
  cvId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default DetailsContainer;
