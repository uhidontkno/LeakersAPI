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

## Official Bot
The official Discord bot for this repo is open source on GitHub and can be invited. 
https://discord.com/api/oauth2/authorize?client_id=1189290892486516737&permissions=274877908996&scope=bot%20applications.commands
The bot is also open source at https://github.com/uhidontkno/AntiLinkLeak