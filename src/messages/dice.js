const { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6 } = require("./diceFormat");

const showRollingDice = () => {
    return [
        { name: dice_1, value: '\u200B', inline: true },
        { name: dice_2, value: '\u200B', inline: true },
        { name: dice_3, value: '\u200B', inline: true },
        { name: dice_4, value: '\u200B', inline: true },
        { name: dice_5, value: '\u200B', inline: true },
        { name: dice_6, value: '\u200B', inline: true }
    ];
}

const showLockedDice = () => {

}

module.exports = { showRollingDice, showLockedDice };