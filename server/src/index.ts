import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";

const port: Number = parseInt(process.env.PORT!);
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

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
