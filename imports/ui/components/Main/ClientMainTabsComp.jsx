import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './ClientMainTabsComp.less';
import ClientPersonalInfoContainer from '../../containers/Tabs/ClientPersonalInfoContainer';
import ClientHealthInfoContainer from '../../containers/Tabs/ClientHealthInfoContainer';
import ClientWeightInfoContainer from '../../containers/Tabs/ClientWeightInfoContainer';
import ClientPaymentInfoContainer from '../../containers/Tabs/ClientPaymentInfoContainer';
import ClientConsentContainer from '../../containers/Tabs/ClientConsentContainer';
// import ClientPicsComp from '../Tabs/ClientPicsComp';
import ClientWeightChartContainer from '../../containers/Modals/ClientWeightChartContainer';
import FileUploadComponent from '../Tabs/FileUpload';

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
        title="Client Health"
        disabled={disableTabsFlag}
      >
        <ClientHealthInfoContainer clientID={props.clientID} />
      </Tab>
      <Tab
        eventKey={3}
        title="Consent"
        disabled={disableTabsFlag}
      >
        <ClientConsentContainer clientID={props.clientID} />
      </Tab>
      <Tab
        eventKey={4}
        title="Weight Info"
        disabled={disableTabsFlag}
      >
        <ClientWeightInfoContainer clientID={props.clientID} />
      </Tab>
      <Tab
        eventKey={5}
        title="Payments"
        disabled={disableTabsFlag}
      >
        <ClientPaymentInfoContainer clientID={props.clientID} />
      </Tab>
      <Tab
        eventKey={6}
        title="Pics"
        // disabled
      >
        <FileUploadComponent clientID={props.clientID} />
      </Tab>
    </Tabs>
  );
};

export default ClientMainTabsComp;
