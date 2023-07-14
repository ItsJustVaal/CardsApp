import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckID = req.params.deckID;
  const deck = await Deck.findById(deckID);
  if (!deck) return res.status(400).send("no id exists");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
