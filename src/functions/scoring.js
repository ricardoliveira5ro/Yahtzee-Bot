const getPreviews = (rolledDice) => {
    let previews = [];

    previews.push(rolledDice.filter(d => d === 1).length * 1) // Ones
    previews.push(rolledDice.filter(d => d === 2).length * 2) // Twos
    previews.push(rolledDice.filter(d => d === 3).length * 3) // Threes
    previews.push(rolledDice.filter(d => d === 4).length * 4) // Fours
    previews.push(rolledDice.filter(d => d === 5).length * 5) // Fives
    previews.push(rolledDice.filter(d => d === 6).length * 6) // Sixes
    
    previews.push(0) // Sum
    previews.push(0) // Bonus
    
    previews.push(calculateAKind(rolledDice, 3)) // Three of a Kind
    previews.push(calculateAKind(rolledDice, 4)) // Four of a Kind
    previews.push(calculateFullHouse(rolledDice)) // Full House
    previews.push(calculateStraight(rolledDice, false)) // Small Straight
    previews.push(calculateStraight(rolledDice, true)) // Large Straight
    previews.push(rolledDice.reduce((partialSum, value) => partialSum + value, 0)) // Chance
    previews.push(rolledDice.filter(d => d === rolledDice[0]).length === 5 ? 50 : 0) // Yahtzee
};

const calculateAKind = (dice, amount) => {
    const counts = {};
    for (const d of dice) {
        counts[d] = (counts[d] || 0) + 1;
        if (counts[d] >= amount) {
            return dice.reduce((partialSum, value) => partialSum + value, 0);
        }
    }

    return 0;
}

const calculateStraight = (dice, isLarge) => {
    const sortedDice = [...dice].sort((a, b) => a - b);

    const smallStraights = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
    ];

    const largeStraights = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6]
    ];

    const straights = isLarge ? largeStraights : smallStraights

    for (const straight of straights) {
        if (straight.every(num => sortedDice.includes(num))) {
            return isLarge ? 40 : 30;
        }
    }
}

const calculateFullHouse = (dice) => {
    const counts = {};
    for (const d of dice) {
        counts[d] = (counts[d] || 0) + 1;
    }

    const values = Object.values(counts);
    if (values.includes(3) && values.includes(2)) {
        return 25;
    }

    return 0;
}

module.exports = { getPreviews };