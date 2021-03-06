import React from 'react';

const WelcomeComp = (props) => {
  const currentUser = Meteor.user();
  let userFirstName = '';
  let userLastName = '';
  if (currentUser && currentUser.profile && currentUser.profile.firstName) {
    userFirstName = currentUser.profile.firstName;
  }
  if (currentUser && currentUser.profile && currentUser.profile.lastName) {
    userLastName = currentUser.profile.lastName;
  }
  console.log('currentUser:',currentUser);
  return (
    <div>
      <h1 className="text-center">
        Welcome {userFirstName} {userLastName}
      </h1>
    </div>
  );
};

// WelcomeComp.propTypes = {
//
// };

export default WelcomeComp;
