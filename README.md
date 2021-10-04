# FidoBot
Discord.js bot for the Follow Fido team discord server. \
(running on d.js v13)

## **Current Public Commands**
### `/follow-fido` : Functions like an "about us" section, with links to the project, GH, etc.
  __Arguments:__
- `show-buttons`: boolean, *required*
  - used to toggle visibility of message in chat (ephemerial)

### `/timer` : Commands related to a per-person timer
  __*Subcommands:*__
- `create (num, duration, message, role, show-msg)` : make a timer for specified duration
- `delete (id)`: delete a timer
- `get (id)` : show current time

## **User-Restricted Commands**
### `/colorroles-new `
- generates embed and buttons to handle adding/removing color roles to/from users
