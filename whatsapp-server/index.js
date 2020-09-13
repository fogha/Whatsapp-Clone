const express = require("express");
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");
const config = require("./config");
const Messages = require("./messagesSchema");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

const pusher = new Pusher({
  appId: "1072285",
  key: "9d419c86d2ba7166f4dd",
  secret: "01d427ec08f7a354d46a",
  cluster: "eu",
  encrypted: true,
});

mongoose.connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db is connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const message = req.body;

  Messages.create(message, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
