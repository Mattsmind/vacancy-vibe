const mongoose = require('mongoose');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')});

const { users } = require('./userSeeds');
const cities = require('./cities');
const { prefixes, cores, suffixes } = require('./nameData');
const { motelImages, atmospheres } = require('./descriptions');
const { sampleReviews } = require('./sampleReviews')

const User = require('../models/user');
const Motel = require('../models/motel');
const Review = require('../models/review');

const numberOfSeeds = 50;
const randomChange = [.00, .99, .79, .75, .50, .49];

const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/vacancy-vibe';

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Database Connected!"));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async (num) => {
    await Motel.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    console.log("Existing collections cleared.");

    const userIDs = [];
    
    for (const userData of users) {
        const user = new User(userData);
        await user.save();
        userIDs.push(user._id);
    }

    console.log("Demo users created.");

    for (let i = 0; i < num; i++) {
        const city = sample(cities);
        const title = `${sample(prefixes)} ${sample(cores)} ${sample(suffixes)}`;

        const motel = new Motel({
            title,
            location: `${city.city}, ${city.state}`,
            image: motelImages[i % motelImages.length],
            description: sample(atmospheres),
            price: Math.floor(Math.random() * 40 + 35) + sample(randomChange),
            geometry: {
                type: "Point",
                coordinates: [city.longitude, city.latitude]
            },
            author: sample(userIDs),
            reviews: []
        });
        
        const reviewCount = Math.floor(Math.random() * 7);
        for (let j = 0; j < reviewCount; j++) {
            const newReview = new Review({
                body: sample(sampleReviews),
                rating: Math.floor(Math.random() * 5) + 1,
                author: sample(userIDs)
            });
            await newReview.save();
            motel.reviews.push(newReview._id);
        }

        await motel.save();
    }
};

seedDB(numberOfSeeds)
    .then(() => {
        mongoose.connection.close();
        console.log(`Successfully compiled and seeded database with ${numberOfSeeds} records!`);
    })
    .catch(err => console.error('Seeding process failed:', err));
