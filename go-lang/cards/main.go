package main

func main() {
	cards := newDeck()

	// cards := readFromDisk("cards")

	// cards.saveToDisk("cards")

	// hand, remainingCards := deal(cards, 3)

	// hand.print()
	// remainingCards.print()

	cards.shuffle()

	cards.print()

	// fmt.Println(cards.toString())
}
