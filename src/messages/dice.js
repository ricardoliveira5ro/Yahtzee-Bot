const { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6 } = require("./diceFormat");

const diceFormats = {
    1: dice_1,
    2: dice_2,
    3: dice_3,
    4: dice_4,
    5: dice_5,
    6: dice_6,
};

const showRolledDice = (dice) => {
    let diceArr = [];
    dice.forEach(d => diceArr.push({ name: diceFormats[d], value: '\u200B', inline: true }) )
    
    return diceArr;
}

const showLockedDice = () => {

}

module.exports = { showRolledDice, showLockedDice };