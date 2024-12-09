const getPreviews = (currentScore, rolledDice) => {
    let previews = [];

    // Ones -- Twos -- Threes -- Fours -- Fives -- Sixes
    for (let i = 0; i < 6; i++) {
        previews.push(currentScore[i] === -1 ? rolledDice.filter(d => d === (i + 1)).length * (i + 1) : currentScore[i])
    }
    
    const sum = calculateSum(currentScore, rolledDice)
    const bonus = sum === -1 ? -1
                            : sum >= 63 ? 35 : 0
    previews.push(sum) // Sum
    previews.push(bonus) // Bonus

    previews.push(currentScore[8] === -1 ? calculateAKind(rolledDice, 3) : currentScore[8]) // Three of a Kind
    previews.push(currentScore[9] === -1 ? calculateAKind(rolledDice, 4) : currentScore[9]) // Four of a Kind
    previews.push(currentScore[10] === -1 ? calculateFullHouse(rolledDice) : currentScore[10]) // Full House
    previews.push(currentScore[11] === -1 ? calculateStraight(rolledDice, false) : currentScore[11]) // Small Straight
    previews.push(currentScore[12] === -1 ? calculateStraight(rolledDice, true) : currentScore[12]) // Large Straight
    previews.push(currentScore[13] === -1 ? rolledDice.reduce((partialSum, value) => partialSum + value, 0) : currentScore[13]) // Chance
    previews.push(currentScore[14] === -1 ? (rolledDice.filter(d => d === rolledDice[0]).length === 5 ? 50 : 0) : currentScore[14]) // Yahtzee

    previews.push(-1) // Final Score

    return previews;
};

const calculateSum = (currentScore, rolledDice) => {
    const upperSection = [...currentScore].splice(0, 6);

    if (upperSection.filter(value => value === -1).length >= 2)
        return -1;

    let sum = 0;
    for (let i = 0; i < upperSection.length; i++) {
        sum += (upperSection[i] === -1) ? rolledDice.filter(dice => dice === i + 1).length * (i + 1)
                                        : value;
    }

    return sum;
}

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

    return 0;
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