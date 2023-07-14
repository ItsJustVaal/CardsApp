import { config } from "dotenv";
config();
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { getDecksController } from "./controllers/getDeckController copy 2";
import { createDecksController } from "./controllers/createDeckController copy";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";

const port: Number = parseInt(process.env.PORT!);
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/decks", getDecksController);
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks", createDecksController);
app.post("/decks/:deckID/cards", createCardForDeckController);

mongoose.connect(process.env.MONGO_CONNECT!).then(() => {
  console.log(`Listening on port ${port}`);
  app.listen(port);
});
