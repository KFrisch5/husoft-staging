import React, { useState } from 'react';
import { useStore } from '../../store';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import './index.css';

const HomePage = (props) => {
  const { state, dispatch } = useStore();

  return (
    <div className="page-container">

     
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
