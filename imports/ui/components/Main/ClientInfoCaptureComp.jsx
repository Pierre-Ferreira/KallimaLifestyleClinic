import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './ClientInfoCaptureComp.less';

const ClientInfoCaptureComp = () => {
  return (
    <Tabs defaultActiveKey={1} id="client-main-tabs">
      <Tab eventKey={1} title="Client Info">
        CLIENT INFO
      </Tab>
      <Tab eventKey={2} title="Client Consent">
        SIGNATURE AREA
      </Tab>
      <Tab eventKey={3} title="Weight Info">
        WEIGHT INFO
      </Tab>
      <Tab eventKey={4} title="Payment Info">
        PAYMENT INFO
      </Tab>
      <Tab eventKey={5} title="Pics" disabled>
        BEFORE AND AFTER PICS.
      </Tab>
    </Tabs>
  );
};

// WelcomeComp.propTypes = {
//
// };

export default ClientInfoCaptureComp;
