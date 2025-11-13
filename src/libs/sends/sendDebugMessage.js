const manageState = require('../manages/manageState');

async function sendDebugMessage(message) {

    if (manageState.SHOW_DEBUG === true) {
        console.log('[  ]', message)
    }
}

module.exports = sendDebugMessage;