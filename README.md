# Link with Women

A chrome extension to help you connect with more women on LinkedIn:

-Navigate to the My Network<br/>
-Click the Link with Women Chrome Extension icon<br/>
-The extension will filter items currently loaded

If you want to use this extension, see the install instructions listed below.

# Demo

![LinkWithWomen](/readme/Demo.gif?raw=true "My Network")

# Install Instructions

Sign-up for a FREE API key from Clarifai:<br/>
https://developer.clarifai.com/signup/

```
git clone the repo
cd wit
touch secret.js
```

Add the following to secret.js (replace words with actual key and secret from previous step):

```
const clarKey = 'CLARIFAI_ID_HERE'
const clarSecret = 'CLARIFAI_SECRET_HERE'
```

In Chrome, navigate to:  chrome://extensions/<br/>
Check the Developer mode check box<br/>
Click Load unpacked extension...<br/>
Select the wit folder<br/>
