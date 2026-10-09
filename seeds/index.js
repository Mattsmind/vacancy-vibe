const mongoose = require('mongoose');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')});
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

const { users } = require('./userSeeds');
const cities = require('./cities');
const { prefixes, cores, suffixes } = require('./nameData');
const { atmospheres } = require('./descriptions');
const { sampleReviews } = require('./sampleReviews')

const User = require('../models/user');
const Motel = require('../models/motel');
const Review = require('../models/review');

const numberOfSeeds = Number(process.env.NUMBER_OF_SEEDS) || 50;
const randomChange = [.00, .99, .79, .75, .50, .49];

const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/vacancy-vibe';

mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Database Connected!"));

const sample = array => array[Math.floor(Math.random() * array.length)];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const imageDirectory = path.join(__dirname, 'review-images');
const seedImages = fs
    .readdirSync(imageDirectory)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

const seedImagePaths = seedImages.map(file =>
    path.join(imageDirectory, file)
);

const sampleImages = (images) => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 6) + 1;

    return shuffled.slice(0, count);
};

const uploadSeedImages = async (imagePaths) => {
    const uploadedImages = [];

    for (const imagePath of imagePaths) {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'vacancy-vibe/seeds'
        });

        uploadedImages.push({
            url: result.secure_url,
            filename: result.public_id
        });

        await delay(500);
    }
  
    return uploadedImages;
}; 

const clearSeedImages = async () => {
    const result = await cloudinary.api.delete_resources_by_prefix(
        'vacancy-vibe/seeds/',
        {
            resource_type: 'image',
            type: 'upload',
            invalidate: true
        }
    );

    const deletedCount = Object.values(result.deleted || {})
        .filter(status => status === 'deleted')
        .length;
    console.log(`Deleted ${deletedCount} seed images from Cloudinary.`);
};

const seedDB = async (num) => {
    await clearSeedImages();

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

    console.log(`Seeding ${num} Motels...`)

    for (let i = 0; i < num; i++) {
        const city = sample(cities);
        const title = `${sample(prefixes)} ${sample(cores)} ${sample(suffixes)}`;

        const images = await uploadSeedImages(sampleImages(seedImagePaths));

        const motel = new Motel({
            title,
            location: `${city.city}, ${city.state}`,
            images,
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

        const completed = i + 1;
        const percentage = Math.floor((completed / num) * 100);
        const barLength = 50;
        const filled = Math.floor((completed / num) * barLength);
        const progressBar = '█'.repeat(Math.max(0, filled - 1)) 
            + (filled > 0 ? '▓' : '')
            + '░'.repeat(barLength - filled);

        process.stdout.write(`\r${progressBar} 🢩 ${percentage}% 🢩 (${completed}/${num})`)
    }
    console.log();
};

seedDB(numberOfSeeds)
    .then(() => {
        mongoose.connection.close();
        console.log(`Successfully compiled and seeded database with ${numberOfSeeds} records!`);
    })
    .catch(err => console.error('Seeding process failed:', err));
