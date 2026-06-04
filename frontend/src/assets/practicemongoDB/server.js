const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://soniya:0159@firstdb.imq7o.mongodb.net/?retryWrites=true&w=majority&appName=FirstDB";

const port = process.env.PORT || 3000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware to parse JSON requests
app.use(express.json());

async function run() {
    try {
        console.log("inside run function");
        // Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection failed", error);
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("hey");
});

// Route to fetch data from the listingsAndReviews collection
app.get("/listings", async (req, res) => {
    try {
        const database = client.db("sample_airbnb");
        console.log("this is after checking database")
        const collection = database.collection("listingsAndReviews");
        console.log("collection");
        // Fetch data
        const listings = await collection.findMany({}).toArray();
        console.log("listingsAndReviews");

        // Send the data back as a response
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings", error);
        res.status(500).send("Error fetching listings");
    }
});

app.listen(port, () => {
    console.log("Server started on port: " + port);
});
