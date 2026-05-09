require('dotenv').config();
const mongoose = require('mongoose');
const Tutorial = require('./models/tutorial');

// Function to convert YouTube URL to embed format
const convertToEmbedUrl = (url) => {
  if (!url) return url;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url; // Return original if no match
};

async function updateTutorialUrls() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all tutorials
    const tutorials = await Tutorial.find({});
    console.log(`Found ${tutorials.length} tutorials to update`);

    let updatedCount = 0;
    
    for (const tutorial of tutorials) {
      const originalUrl = tutorial.videoUrl;
      const embedUrl = convertToEmbedUrl(originalUrl);
      
      if (originalUrl !== embedUrl) {
        console.log(`Updating: ${tutorial.title}`);
        console.log(`  Original: ${originalUrl}`);
        console.log(`  Embed:    ${embedUrl}`);
        
        await Tutorial.updateOne(
          { _id: tutorial._id },
          { videoUrl: embedUrl }
        );
        
        updatedCount++;
      }
    }

    console.log(`\n✅ Updated ${updatedCount} tutorials to embed format!`);
  } catch (error) {
    console.error('Error updating tutorial URLs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateTutorialUrls();
