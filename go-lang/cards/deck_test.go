package main

import (
	"os"
	"testing"
)

func TestNewDeck(t *testing.T) {
	d := newDeck()

	if len(d) != 20 {
		t.Errorf("Expected deck length of 20, but got %v", len(d))
	}

	if d[0] != "A of Spades" {
		t.Errorf("Expected first card 'A of Spades', but got %v", d[0])
	}

	if d[len(d)-1] != "5 of Clubs" {
		t.Errorf("Expected last card '5 of Clubs, but got %v", d[len(d)-1])
	}
}

func TestSaveToDiskAndReadFromDisk(t *testing.T) {
	os.Remove("_decktesting")

	deck := newDeck()
	deck.saveToDisk("_decktesting")

	loadedDeck := readFromDisk("_decktesting")

	if len(loadedDeck) != 20 {
		t.Errorf("Expected deck length of 20, but got %v", len(loadedDeck))
	}

	os.Remove("_decktesting")
}
