# Bailey Animal Art
Bailey Animal Art website built using React with Node.js (Express) backend.

## Environment Variables
The following Node environment variables are used:
* `STRIPE_SK`: Stripe Secret Key
* `STRIPE_SK_TEST`: Stripe Test Secret Key (not actively used)
* `EMAIL`: Email used to send emails to admin
* `EMAIL_PASS`: Email password for logging into above email account

## Troubleshooting
### "Firebase doesn't install correctly via `npm install`" and "Random errors occurring while running `npm install`"
This issue occurs when your Node.js version is higher than what is currently
compatible with the Firebase SDK. You can solve this by using Node v8.11:
`nvm install 8.11`
or enable it if already installed, using:
`nvm use 8.11`
