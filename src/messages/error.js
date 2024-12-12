const botMessage = (color, title, description, footer) => {
    return {
        color: color,
        title: title,
        description: description,
        footer: {
            text: footer,
        },
    };
};

const tooManyArgumentsMessage = botMessage(0xFF0000, 'Invalid command', 'The bot could not recognize your request, if you having trouble type `!help` for full details', '');
const onGoingGameMessage = botMessage(0xFF0000, 'Could not start the game!', 'Unfortunately you have a game ongoing, to start a new game you have to finish that one first. You could also surrender or cancel the game using command `!stop`');
const noOpponentSelectedMessage = botMessage(0xFF0000, 'No opponent selected', 'The bot could not recognize the opponent you want to challenge. try to input i.e. `!join [username]`. Please note that the username may be different from the server name, click in the user\'s profile to check the unique username');
const opponentDoesNotExistsMessage = botMessage(0xFF0000, 'Opponent does not exists', 'The bot could not find the opponent you want to challenge in this server');
const noGameStartedMessage = botMessage(0xFF0000, 'No game started', 'The bot cannot perform this operation, please start a new game by `!start` or make sure you join an existent party started by other player by `!join [username]`');
const waitingForOpponentMessage = botMessage(0xFF0000, 'Waiting for an opponent', 'The game cannot start without an opponent, wait for a player to join');
const fullPartyMessage = botMessage(0xFF0000, 'The party is full', 'Could not join the party, please create a new one by `!start` or join other party that are waiting for players');
const waitForYourTurnMessage = botMessage(0xFF0000, 'Not your turn', 'Please wait for your opponent to finish his turn');
const noRollsLeftMessage = botMessage(0xFF0000, 'No more rolls left', 'You have no more rolls left, please select the result to finish you turn by i.e. `!result [ones]`');
const rollBeforeLockMessage = botMessage(0xFF0000, 'Roll before lock', 'Before locking any dice you need to roll first, use `!roll`');
const wrongLockDiceMessage = botMessage(0xFF0000, 'Wrong lock input', 'The bot could not recognize which dice you want to lock, use `!lock [dice position]`. You can also lock multiple dice at once by specifying each position, i.e. `!lock 1 4 5`');
const wrongMarkMessage = botMessage(0xFF0000, 'Wrong mark input', 'The bot could not recognize which spot you want to mark to finish your turn, use !mark [spot]. You can find all the names at the board, but use them without spaces in between, i.e Ones -> Ones / Three of a Kind -> ThreeOfAKind. The spot name is not case sensitive, so you can write it the way you want');
const alreadyMarkedMessage = botMessage(0xFF0000, 'This spot is already marked', 'Please trying again in an available spot, the 🎲 emoji represents a result preview, an available spot');

module.exports = {
    botMessage,
    tooManyArgumentsMessage, 
    onGoingGameMessage,
    noOpponentSelectedMessage,
    opponentDoesNotExistsMessage,
    noGameStartedMessage,
    waitingForOpponentMessage,
    fullPartyMessage,
    waitForYourTurnMessage,
    noRollsLeftMessage,
    rollBeforeLockMessage,
    wrongLockDiceMessage,
    wrongMarkMessage,
    alreadyMarkedMessage
};