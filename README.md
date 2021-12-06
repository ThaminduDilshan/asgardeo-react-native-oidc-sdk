# [WIP] Asgardeo React Native OIDC SDK

Repository containing the source of Asgardeo React Native OIDC SDK & samples.

[![Stackoverflow](https://img.shields.io/badge/Ask%20for%20help%20on-Stackoverflow-orange)](https://stackoverflow.com/questions/tagged/wso2is)
[![Join the chat at https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE](https://img.shields.io/badge/Join%20us%20on-Slack-%23e01563.svg)](https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/wso2/product-is/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/wso2.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=wso2)

---

:construction:&ensp;&ensp;This project is a work in progress. Please do not use this yet!

## Table of contents

- [Introduction](#introduction)
- [Prerequisite](#prerequisite)
- [Getting started](#getting-started)
- [Try out the sample apps](#try-out-the-sample-apps)
- [APIs](#apis)
- [Develop](#develop)
  - [Prerequisites](#prerequisites)
  - [Installing dependencies](#installing-dependencies)
- [Contribute](#contribute)
  - [Reporting issues](#reporting-issues)
- [License](#license)

## Introduction

Asgardeo OIDC React Native SDK allows React native mobile applications to use OIDC or OAuth2 authentication in a simple and secure way. By using Asgardeo and the Asgardeo react native OIDC SDK, mobile application developers will be able to add identity management to their mobile applications with more ease.

## Prerequisite

Create an organization in Asgardeo if you don't already have one. The organization name you choose will be referred to as `<org_name>` throughout this document.

## Try out the sample apps

### 1. Create an application in Asgardeo

Before trying out the sample apps, you need to create an application in **Asgardeo**.

1. Navigate to [**Asgardeo console**](https://console.asgardeo.io/login) and click on **Applications** under **Develop** tab.

2. Click **New Application** and then select **Mobile Application**.

3. Enter **Sample** as the name of the app and add the redirect URL(s). You can find the relevant redirect URL(s) of each sample app in the [Running the sample apps](#2-running-the-sample-apps) section.

4. Click **Register** to complete the registration. You will be navigated to management page of the **sample** application.

5. Only the **Code** and **Refresh token** checkboxes should be enabled  under **Allowed grant types**.

6. Click on **Update** at the bottom.

7. Copy the configurations from the Asgardeo react native quickstart guide to your react native application as mentioned in the next section of the guide.

### 2. Configuring the sample apps

1. Download the sample from the given link in the Asgardeo console.

2. Install the required node packages by running the following command at the root directory.

```bash
npm install
```

3. Update configuration object in the `Screen/LoginScreen.js` file with your registered app details.

**Note:** You will only have to paste in the `clientID`(**OAuth client key**) generated for the application you registered.

Read more about the SDK configurations [here](#configuration).

```js
const Config = {
   clientID: '',
   serverOrigin: 'https://api.asgardeo.io/t/<org_name>',
   signInRedirectURL: 'wso2sample://oauth2'
};
```

### 3. Running the sample apps

This application can be run either in an Android emulator or an Android device.

#### Running in an Android emulator

1. Create a suitable Android virtual device using the **Android virtual device manager (AVD Manager)** and launch it.

2. Build and deploy the apps by running the following command at the root directory.

```bash
react-native run-android
```

#### Running in an Android device

1. Enable **Debugging over USB** and plug in your device via USB.

2. Build and deploy the apps by running the following command at the root directory.

```bash
react-native run-android
```













> (Optional) If you're running in a development or debugging mode, start the Metro by running the following command.

```bash
react-native start
```







#### React Native Sample Application













## Getting Started

You can experience the capabilities of Asgardeo React-native OIDC SDK by following this small guide which contains main
sections listed below.

- [Configuring the Identity Server](#configuring-the-identity-server)
- [Configuring the sample](#configuring-the-sample)
- [Running the sample](#running-the-sample)
  - [Running in an Android Emulator](#running-in-an-android-emulator)
  - [Running in an Android Device](#running-in-an-android-device)


### Configuring the sample

1. Clone/download this project from `https://github.com/asgardeo/asgardeo-react-native-oidc-sdk.git`.

2. Open the cloned project directory via code editors.

3. Add the relevant configs in LoginScreen file located in `Screen/LoginScreen` folder.

   - Replace the value of `client-id` with the value of `OAuth Client Key` property which you copied in the step 3 when
     [configuring the Identity Server](#configuring-the-identity-server).

   ```TypeScript
    const Config = {
      serverOrigin: 'https://{hostname}:9443',
      signInRedirectURL: 'http://{hostname}:{port}',
      clientID: 'ClientID',
      SignOutURL: "http://{hostname}:{port}"       (Optional)
    };
   ```

   Example:

   ```TypeScript
    const Config = {
      serverOrigin: 'https://10.0.2.2:9443',
      signInRedirectURL: 'http://10.0.2.2:8081',
      clientID: 'iMc7TiIaIFafkd5hA5xf7kGiAWUa',
      SignOutURL: "http://10.0.2.2:8081"       (Optional)
    };
   ```

## Try Out the Sample Apps

#### Running in an Android Emulator

1. Create a suitable Android Virtual Device by run `react-native run-android` command in project directory terminal.

2. If the WSO2 IS is hosted in the local machine, change the domain of the endpoints in the `Screen/LoginScreen - Config`
   file to “10.0.2.2”. Refer the documentation on [emulator-networking](https://developer.android.com/studio/run/emulator-networking)

3. By default IS uses a self-signed certificate. If you are using the default pack without
   changing to a CA signed certificate, follow this [guide](https://developer.android.com/training/articles/security-config) to get rid of SSL issues.

4. Change the hostname of IS as 10.0.2.2 in the <IS_HOME>/deployment.toml.<br/>
   i. Create a new keystore with CN as localhost and SAN as 10.0.2.2

   ```
   keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:10.0.2.2
   ```

   ii. Export the public certificate ( name it as wso2carbon.pem ) to add into the truststore.

   ```
   keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
   ```

   iii. Import the certificate in the client-truststore.jks file located in `<IS_HOME>/repository/resources/security/`

   ```
   keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks -storepass wso2carbon
   ```

   iv. Now copy this public certificate ( wso2carbon.pem ) into the `app/src/main/res/raw` folder.

5. Select the Virtual Device to run the application.
6. Run the the module `sample` on the selected Virtual Device.

#### Running in an Android Device

1. Enable USB Debugging in the Developer Options in the Android Device. Refer documentation on
   [Run your App](https://reactnative.dev/docs/running-on-device).

2. If the WSO2 IS is hosted in the local machine, change the domain of the endpoints in the `Screen/LoginScreen - Config` file and the hostnames specified under `hostname` config in the `<IS_HOME>/repository/conf/deployment.toml` file to the IP Address of local machine.
   Make sure that both the Android Device and the local machine is connected to the same WIFI network.

3. By default IS uses a self-signed certificate. If you are using the default pack without
   changing to a CA signed certificate, follow this [guide](https://developer.android.com/training/articles/security-config) to get rid of SSL issues.

4. Change the hostname of IS as IP Address in the <IS_HOME>/deployment.toml.<br/>
   i. Create a new keystore with CN as localhost and SAN as IP Address

   ```
   keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:IP Address
   ```

   ii. Export the public certificate ( name it as wso2carbon.pem ) to add into the truststore.

   ```
   keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
   ```

   iii. Import the certificate in the client-truststore.jks file located in `<IS_HOME>/repository/resources/security/`

   ```
   keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks -storepass wso2carbon
   ```

   iv. Now copy this public certificate ( wso2carbon.pem ) into the `app/src/main/res/raw` folder.

5. Connect the Android Device to the machine through a USB cable.

6. Select the Android Device as the Deployment Target.

7. Run the the module `sample` on the selected Android Device.

## APIs

The SDK provides some APIs necessary methods to implement an authentication.
  - [initialize](#initialize)
  - [getDataLayer](#getdatalayer)
  - [getAuthorizationURL](#getauthorizationurl)
  - [requestAccessTokenDetails](#requestaccesstokendetails)
  - [getSignOutUrl](#getsignouturl)
  - [SignOut](#signout)
  - [getOIDCServiceEndpoints](#getoidcserviceendpoints)
  - [getDecodedIDToken](#getdecodedidtoken)
  - [userInformation](#userinformation)
  - [revokeAccessToken](#revokeaccesstoken)
  - [refreshAccessToken](#refreshaccesstoken)
  - [getAccessToken](#getaccesstoken)
  - [isAuthenticated](#isauthenticated)
  - [getPKCECode](#getpkcecode)
  - [setPKCECode](#setpkcecode)

### initialize

```TypeScript
initialize = async (config):Promise<void> ;
```

#### Arguments

1. config:
   This config contains the ClientID, server Origin, SigINRedirectURL, SighOutRedirectUrl,and etc. This information needed to umplement the authentication.

#### Description

This method initializes the config data instance.

#### Example

```TypeScript
const Config = {
  serverOrigin: 'https://10.0.2.2:9443',
  signInRedirectURL: 'http://10.0.2.2:8081',
  clientID: 'iMc7TiIaIFafkd5hA5xf7kGiAWUa',
  SignOutURL: "http://10.0.2.2:8081"       (Optional)
};


await initialize(Config)
```

---

### getDataLayer

```TypeScript
getDataLayer = async ()
```

#### Description

This method returns DataLayer objects used by the SDK to store authentication data.

#### Example

```TypeScript
const _dataLayer = await getDataLayer();
```

---

### getAuthorizationURL

```TypeScript
getAuthorizationURL = async (config): Promise<String>
```

#### Arguments

1. config:
   This config contains the ClientID, server Origin, SigINRedirectURL, SighOutRedirectUrl,and etc. This information needed to umplement the authentication.

#### Description

This method returns a Promise resolve with the authorization URL.
Then the user can redirect to this URL to authenticate themselves and athorize the client.

#### Example

```TypeScript
getAuthorizationURL(Config).then((url) => {
     Linking.openURL(url)
}).catch((error) => {
     console.error(error);
});
```

---

### requestAccessTokenDetails

```TypeScript
requestAccessTokenDetails = (AuthUrl)
```

#### Arguments

1. AuthUrl
   This is a url. After the user signs in with using Identity server can get this url. It contains sessionState and authorizationCode these are obtained from identity server.
#### Description

This method uses the authorization code and session state to send a request to the token endpoint to obtain the acess token and the id token. The sign-in functionality can be implemented by calling the getAuthorizationURL method followed by this method.

#### Example

```TypeScript
requestAccessTokenDetails(AuthUrl).then((token) => {
    console.log(token)
}).catch((error) => {
    console.log(error)
});
```

---

### getSignOutUrl

```
getSignOutURL = async ()
```

#### Description

This method returns the sign-out URL to which the user should be redirected to be signed out from the server.
The user should be redirect to this URL in order to sign out from the server.

#### Example

```TypeScript
const signOutUrl = await getSignOutURL()
Linking.openURL(signOutUrl)
```

---

### SignOut

```
SignOut = (Url)
```

#### Arugument

1. Url
   This url contains state details obtainted from Identity server after the user redirect SigOutURL with Identityserver.

#### Description

This method return boolean value. This method clear the authentication data from the store and sign out from the Identity server when state is sign_out_sucess and returns true. Otherwise It returns false without any changes in store or Identity server.

#### Example

```TypeScript
_signOut = SignOut(Url)
```

---

### getOIDCServiceEndpoints

```TypeScript
getOIDCServiceEndpoints = async()
```

#### Description

This method returns the OIDC service endpoints obtained from the `.well-known` endpoint.

#### Example

```TypeScript
// This should be within an async function.
const endpoints = await getOIDCServiceEndpoints();
```

---

### getDecodedIDToken

```TypeScript
getDecodedIDToken = async ()
```

#### Description

This method decodes the payload of the id token and returns the decoded values.

#### Example

```TypeScript
// This should be within an async function.
const decodedIdToken = await getDecodedIDToken();
```

---

### userInformation

```TypeScript
userInformation = async ()
```

#### Description

This method returns the basic user information obtained from the id token.

#### Example

```TypeScript
// This should be within an async function.
const UserInfo =  await userInformation();
```

---

### revokeAccessToken

```TypeScript
revokeAccessToken = async ()
```

#### Description

This method clears the authentication data and sends a request to revoke the access token. You can use this method if you want to sign the user out of your application but not from the server.

#### Example

```TypeScript
revokeAccessToken().then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
})
```

---

### refreshAccessToken

```TypeScript
 refreshAccessToken = async (): Promise<TokenResponse>
```

#### Description

This method sends a refresh-token request and returns a promise that resolves with the token response that contains the token information.

#### Example

```TypeScript
refreshAccessToken().then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
})
```

---

### getAccessToken

```TypeScript
getAccessToken = async ()
```

#### Description

This method returns the access token stored in the store.

#### Example

```TypeScript
// This should be used within an async function.
const accessToken = await getAccessToken();
```

---

### isAuthenticated

```TypeScript
isAuthenticated = async ()
```

#### Description

This method returns a boolean value indicating if the user is authenticated or not.

#### Example

```TypeScript
// This should be within an async function.
const isAuth = await isAuthenticated();
```

---

### getPKCECode

```TypeScript
getPKCECode = async ()
```

#### Description

This code returns the PKCE code generated when the authorization URL is generated by the [`getAuthorizationURL`](#getAuthorizationURL) method.

#### Example

```TypeScript
const pkce = getPKCECode();
```

---

### setPKCECode

```TypeScript
setPKCECode = async (pkce:string)
```

#### Arguments

1. pkce: `string`

The PKCE code generated by the [`getAuthorizationURL`](#getAuthorizationURL) method.

#### Description

This method sets the PKCE code to the store.

#### Example

```TypeScript
setPKCECode("pkce");
```

---

## Develop
### Prerequisites
-    [React Native Environment setup](https://reactnative.dev/docs/environment-setup)

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting Issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardeo/asgardeo-react-native-oidc-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
