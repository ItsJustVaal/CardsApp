import { config } from "dotenv";
config();
import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { getDecksController } from "./controllers/getDecksController";
import { createDecksController } from "./controllers/createDecksController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const port: Number = parseInt(process.env.PORT!);
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/decks", getDecksController);
app.post("/decks", createDecksController);
app.delete("/decks/:deckId", deleteDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);

mongoose.connect(process.env.MONGO_CONNECT!).then(() => {
  console.log(`Listening on port ${port}`);
  app.listen(port);
});
