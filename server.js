require('dotenv').config();
const mongoose = require('mongoose');
const dbLoggingPlugin = require('./utils/dbLogger');

mongoose.plugin(dbLoggingPlugin);

const app = require('./app');
const { getTimestamp } = require('./utils/logStyles');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/vacancy-vibe');

mongoose.connection.on('error', (err) => {
    const timestamp = getTimestamp();
    console.error(`${`[${timestamp.label}][DB][CRITICAL]`.labelBox} ${`💥💥💥`.arrow} Connection failed: ${err.message}`);
});

const server = app.listen(PORT, () => {
    const timestamp = getTimestamp();
    console.log(
        `${`[${timestamp.label}][SERVER][ONLINE]`.labelBox} ${`❱❱❱`.arrow} Engine firing up on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`
    );
});


// Gracefully Shutdown
const handleShutdown = (signal) => {
    const timestamp = getTimestamp();
    console.log(`\n${`[${timestamp.label}][SERVER][SHUTDOWN]`.labelBox} ${`💥💥💥`.arrow} ${signal} received. Powering down...`);

    server.close( async () => {
        console.log(`${`[${getTimestamp().label}][SERVER][OFFLINE]`.labelBox} ${`❱❱❱`.arrow} HTTP pool closed.`);

        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log(`${`[${getTimestamp().label}][DB][DISCONNECTED]`.labelBox} ${`❱❱❱`.arrow} Database connection safely drained.`);
        }

       process.exit(0);
        
    });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('unhandledRejection', (err) => {
    const timestamp = getTimestamp();
    console.log(`${`[${timestamp.label}][CRASH][UNHANDLED_REJECTION]`.labelBox} ➔ ${err.message}`);
    console.error(err.stack);
    handleShutdown('UNHANDLED_REJECTION');
});
