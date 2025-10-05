const sendErrorMessage = require("./sendErrorMessage");

async function convertTime(interaction, time) {

    try {
        if (typeof time === 'number') return time;

        const match = String(time).match(/^(\d+)(s|m|h|d|w)$/);
        if (!match) {
            sendErrorMessage(interaction, 'Invalid time format! Use 1s, 1m, 1h, 1d, 1w');
            return null;
        }

        const value = parseInt(match[1], 10);
        const unit = match[2];

        let duration;
        switch (unit) {
            case 's': duration = value * 1000; break;
            case 'm': duration = value * 60 * 1000; break;
            case 'h': duration = value * 60 * 60 * 1000; break;
            case 'd': duration = value * 24 * 60 * 60 * 1000; break;
            case 'w': duration = value * 7 * 24 * 60 * 60 * 1000; break;
            default:
                sendErrorMessage(interaction, 'Unexpected error');
                return null;
        }

        const MAX_TIMEOUT = 28 * 24 * 60 * 60 * 1000;
        if (duration > MAX_TIMEOUT) {
            sendErrorMessage(interaction, 'Maximum punishment length is 28 days!');
            return null;
        }

        return duration;
    } catch {
        sendErrorMessage(interaction, 'Unexpected error');
        return null;
    }
}

module.exports = convertTime;