firebase.initializeApp(config);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // return true;
      UIkit.modal('#credentials-modal').hide();
    },
    uiShown: function() {
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    } else {
      ui.start('#firebaseui-auth-container', uiConfig);
      UIkit.modal('#credentials-modal').show();
    }
  });
  document.getElementById('logout-button').addEventListener('click', logout, false);
}

/**
 * Starts the sign-in process.
 */
function logout() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
}

window.onload = function() {
  initApp();
};
