// Fallback in-memory DB in case MongoDB Atlas is not configured or offline
let localMockDb = {
  hero: {
    subtitle: "Your one-stop solution for software development, web development, and IT services."
  },
  about: {
    p1: "The Intelliverse is a dynamic software development company dedicated to providing innovative solutions. We specialize in web development, mobile applications, and comprehensive IT services that empower businesses to thrive in the digital age."
  }
};

let clientPromise = null;

const uri = process.env.MONGODB_URI;

if (uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))) {
  try {
    // Dynamic import to prevent crash if npm installation fails or is missing
    const { MongoClient } = require("mongodb");
    
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      const client = new MongoClient(uri);
      clientPromise = client.connect();
    }
  } catch (error) {
    console.error("Failed to initialize MongoDB client. Make sure 'mongodb' package is installed.", error);
  }
}

export { clientPromise, localMockDb };
