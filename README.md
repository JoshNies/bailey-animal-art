# Bailey Animal Art
Bailey Animal Art website.

## Troubleshooting
### "Firebase doesn't install correctly via `npm install`" and "Random errors occuring while running `npm install`"
This issue occurs when your Node.js version is higher than what is currently
compatible with the Firebase SDK. You can solve this by using Node v8.11:
`nvm install 8.11`
or enable it if already installed, using:
`nvm use 8.11`
