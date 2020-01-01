export const BASTO = "BASTO";
export const ESPADA = "ESPADA";
export const JOKER = "JOKER";
export const COPA = "COPA";
export const ORO = "ORO";

export function createSuit(suit, maxRank = 12) {
  return "0"
    .repeat(maxRank)
    .split("")
    .map((_, index) => ({
      id: suit + (index + 1),
      suit,
      rank: index + 1
    }));
}

export class SpanishDeck {
  constructor() {
    this.deck = [
      ...createSuit(BASTO),
      ...createSuit(ESPADA),
      ...createSuit(ORO),
      ...createSuit(COPA),
      ...createSuit(JOKER, 2)
    ];
    console.log("conchis", this.deck);
  }

  drawCard() {
    const cardCount = this.deck.length;
    // get a float between 0 and cardCount (exclusive)
    // cardCount will be 50 at first draw and will get smaller as we go
    const randomNumber = cardCount * Math.random();
    // get an integer between 0 and 50 exclusively
    const randomCardIndex = Math.floor(randomNumber);

    const card = this.deck.splice(randomCardIndex, 1)[0];

    //TODO use assert
    if (!card) {
      console.error(
        "GENERATED an undef card",
        card,
        randomNumber,
        randomCardIndex,
        cardCount,
        this.deck
      );
    }

    return card;
  }

  drawCards(amount) {
    return "0"
      .repeat(amount)
      .split("")
      .map(() => this.drawCard());
  }
}
