require('dotenv').config({ quiet: true });

module.exports = {
    SHOW_DEBUG: String(process.env.SHOW_DEBUG).toLowerCase() === 'true'
}