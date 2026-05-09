require('dotenv').config();
const mongoose = require('mongoose');
const Tutorial = require('./models/tutorial');

const sampleTutorials = [
  {
    title: "Lesson 1: Introduction to Programming",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    duration: "6m",
    level: "Beginner"
  },
  {
    title: "Lesson 2: Variables and Data Types",
    videoUrl: "https://www.youtube.com/watch?v=XKu_SEDAykw",
    duration: "8m",
    level: "Beginner"
  },
  {
    title: "Lesson 3: Control Structures",
    videoUrl: "https://www.youtube.com/watch?v=WKuIrx_1LCE",
    duration: "12m",
    level: "Beginner"
  },
  {
    title: "Lesson 4: Functions and Methods",
    videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    duration: "15m",
    level: "Intermediate"
  },
  {
    title: "Lesson 5: Object-Oriented Programming",
    videoUrl: "https://www.youtube.com/watch?v=pTB0EiLX388",
    duration: "20m",
    level: "Intermediate"
  },
  {
    title: "Lesson 6: Advanced Algorithms",
    videoUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
    duration: "25m",
    level: "Advanced"
  }
];

async function addSampleTutorials() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing tutorials
    await Tutorial.deleteMany({});
    console.log('Cleared existing tutorials');

    // Add sample tutorials
    const insertedTutorials = await Tutorial.insertMany(sampleTutorials);
    console.log(`Added ${insertedTutorials.length} sample tutorials:`);
    
    insertedTutorials.forEach((tutorial, index) => {
      console.log(`${index + 1}. ${tutorial.title} (${tutorial.level}) - ${tutorial.duration}`);
    });

    console.log('\n✅ Sample tutorials added successfully!');
  } catch (error) {
    console.error('Error adding sample tutorials:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleTutorials();
