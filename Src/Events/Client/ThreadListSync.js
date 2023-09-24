const { Events } = require('discord.js');

module.exports = {
    name: Events.ThreadListSync,
    execute: async (client, threads) => {
        try {
            for (let thread of threads) {
                thread.join();
            }
        } catch (err) {
            console.log(err);
        }
    }
}