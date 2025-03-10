/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/** **********************************************************************
                            DISCLAIMER

This is just a playground package. It does not comply with best practices
of using Cloudscape Design components. For production code, follow the
integration guidelines:

https://cloudscape.design/patterns/patterns/overview/
*********************************************************************** */

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Route, Routes, Link, useParams } from 'react-router-dom';

// Components
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from './Dashboard';
import MyBittles from './MyBittles';
import SingleBittle from './SingleBittle';
import BittleFleetControl from './BittleFleetControl';
import GettingStarted from './GettingStarted';
import SetupGuide from './SetupGuide';
import DataUploader from './DataUploader';
import AccountSettings from './AccountSettings';
import ErrorPage from './ErrorPage';
import S3Objects from './S3Objects';
import FetchUserDetails from '../common/components/FetchUserDetails';
import TopNavigationHeader from '../common/components/TopNavigationHeader';

// Styles
import '@cloudscape-design/global-styles/index.css';

// Amplify
// import Amplify, { Auth, Storage, API, graphqlOperation } from 'aws-amplify';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

// No touchy
import { AmplifyConfig } from '../config/amplify-config';

Amplify.configure(AmplifyConfig);

// Uncomment line 44 for debugging
// Amplify.Logger.LOG_LEVEL = 'DEBUG';
const { identityId } = await fetchAuthSession();
console.log('cognito identity id', identityId);

// eslint-disable-next-line react/prop-types
const App = ({ signOut, user }) => {
  // let { userId } = useParams();
  // State for current signed in user info
  const [userInfo, setUserInfo] = useState({
    username: '',
    given_name: '',
    family_name: '',
    email: '',
  });
  const getCurrentUserInfo = async () => {
    const attributes = await fetchUserAttributes();
    setUserInfo({
      username: attributes.username,
      given_name: attributes.given_name,
      family_name: attributes.family_name,
      email: attributes.email,
    });
  };
  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  return (
    <>
      {/* <Authenticator loginMechanisms={['email']}  hideSignUp> */}
      {/* <Router> */}
      <TopNavigationHeader userInfo={userInfo} />;
      <Routes>
      <Route path="/" element={<Dashboard userInfo = {userInfo} />} />
        <Route path="/dashboard" element={<Dashboard  userInfo = {userInfo}/>} />
        <Route path="/my-bittles/" element={<MyBittles />} />
        <Route path="/my-bittles/:DeviceId" element={<SingleBittle />} />
        <Route path="/bittle-fleet-control" element={<BittleFleetControl />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        {/* <Route path="/setup-guide" element={<SetupGuide />} /> */}
        <Route path="/data-uploader" element={<DataUploader />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/s3-objects" element={<S3Objects />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* </Router> */}
      {/* </Authenticator> */}
    </>
  );
};

// export default App;
export default withAuthenticator(App);
