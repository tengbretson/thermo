import React, { Component } from 'react';

const Temp = ({ value }) => <div>{ value.toFixed(1) }° F</div>;

const TempWidget = props => (
  <div>
    <div>
      <div>
        <h2>Current</h2>
        <Temp value={props.currentTemp} />
      </div>
      <div>
        <h2>Target</h2>
        <Temp value={props.targetTemp} />
      </div>
    </div>
  </div>
);

const UserList = () => <span />;

export default props => (
  <div>
    <TempWidget
      currentTemp={55}
      targetTemp={77.77777}
    />
    <UserList />
  </div>
);
