## Service Account

You will need to aquire a service account for Google APIs. We will use Firebase since it's easier and they are the same credentials for any Google Cloud project. Create some arbitray Firebase app then:

1. Navigate to the [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) tab in your project's settings page.
2. Select your Firebase project. If you don't already have one, click Create New Project. If you already have an existing Google project associated with your app, click Import Google Project instead.
3. Click the Generate New Private Key button at the bottom of the Firebase Admin SDK section of the Service Accounts tab.
4. After you click the button, a JSON file containing your service account's credentials will be downloaded. Save this file as `serviceAccount.json`

## API Call

Use the following `fileId`: `0BxPliU68S4G0cTdyb09Iek16NEE`

1. `http://localhost:3000/api/0BxPliU68S4G0cTdyb09Iek16NEE` should give you back a [Files Resource](https://developers.google.com/drive/v3/reference/files#resource) as specified [here](https://developers.google.com/drive/v3/reference/files/get)
2. Tack on `alt=media` as a query string: `http://localhost:3000/api/0BxPliU68S4G0cTdyb09Iek16NEE?alt=media`

Direct Drive link: https://drive.google.com/file/d/0BxPliU68S4G0cTdyb09Iek16NEE/view

I will remove this image once I solve my issue.