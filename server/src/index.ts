import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const port: Number = 5000;
const app = express();
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_CONNECT!).then(() => {
  console.log(`Listening on port ${port}`);
  app.listen(port);
});
