// testing putting this here so it can ba accessed by different commands
//  - create_timer
//  - delete_timer

//id (starts at 0, increases)
//time (int)
//duration (string | s, m, h)
//message (string)
//user? grabbed automatically, to ping when timer is done?

var timers = [];

id = 0;

function BotTimer(time, duration, message, user) {
    id++,
    this.time = time,
    this.duration = duration,
    this.message = message,
    this.user = user
}