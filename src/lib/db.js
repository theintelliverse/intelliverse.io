import { MongoClient } from "mongodb";

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
    const options = {};
    
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  } catch (error) {
    console.error("Failed to initialize MongoDB client.", error);
  }
}

export { clientPromise, localMockDb };
