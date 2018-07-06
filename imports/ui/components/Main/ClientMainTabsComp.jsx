import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './ClientMainTabsComp.less';
import ClientPersonalInfoContainer from '../../containers/Tabs/ClientPersonalInfoContainer';

const ClientMainTabsComp = (props) => {
  const disableTabsFlag = (props.clientID === '' || props.clientID === 'new');
  return (
    <Tabs defaultActiveKey={1} id="client-main-tabs">
      <Tab
        eventKey={1}
        title="Client Info"
      >
        <ClientPersonalInfoContainer clientID={props.clientID} />
      </Tab>
      <Tab
        eventKey={2}
        title="Client Consent"
        disabled={disableTabsFlag}
      >
        SIGNATURE AREA
      </Tab>
      <Tab
        eventKey={3}
        title="Weight Info"
        disabled={disableTabsFlag}
      >
        WEIGHT INFO
      </Tab>
      <Tab
        eventKey={4}
        title="Payment Info"
        disabled={disableTabsFlag}
      >
        PAYMENT INFO
      </Tab>
      <Tab
        eventKey={5}
        title="Pics"
        disabled
      >
        BEFORE AND AFTER PICS.
      </Tab>
    </Tabs>
  );
};

export default ClientMainTabsComp;
