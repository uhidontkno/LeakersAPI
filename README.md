# LinkLeakers API
API for the public link leakers doc by Deblok
(https://docs.google.com/spreadsheets/d/1t3Prko-nEoxpBnNotYUS3fsYeZli-ASr9mXwXYRj96U/edit#gid=0)

## Routes:
* `/` or `/json` - JSON for the entire thing
* `/csv` - CSV for the entire thing
* `/ids` - All the IDs of link leakers in JSON.  (cached until `/` or `/json` is called)
* `/mentions` - All the mentions (`<@id>`) of link leakers in JSON. (cached until `/` or `/json` is called)
<br />
There are no ratelimits.

## Bot Invite:
A Discord Bot has already been made for it by sparkowe (https://github.com/fidind3211), you can invite it here: https://discord.com/api/oauth2/authorize?client_id=1189282780425760888&permissions=8&scope=bot