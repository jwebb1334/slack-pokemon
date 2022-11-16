// imports
const Sim = require('pokemon-showdown');
stream = new Sim.BattleStream();
// Test Variables
const test_player_one = ["BoB", null, null];
const test_player_two = ["Alice", null, null];
// Constantly print stream output to console for testing
(async () => {
    for await (const output of stream) {
        console.log(output);
    }
})();
// Build PLAYEROPTIONS Json blob
function Player_Options(user_info) {
    const PLAYEROPTIONS = { name: user_info[0], avatar: user_info[1], team: user_info[2] };
    return PLAYEROPTIONS;
}
// start sim stream with player info and battle options
function start_sim(p1, p2, BATTLEOPTIONS, stream) {
    const player_one = Player_Options(p1);
    const player_two = Player_Options(p2);
    stream.write(`>start {"formatid":${JSON.stringify(BATTLEOPTIONS)}, "p1":${JSON.stringify(p1)}, "p2":${JSON.stringify(p2)}}`);
    return stream
}
start_sim(test_player_one, test_player_two, "gen7randombattle", stream)
// stream.write(`>p1 move 1`);
// stream.write(`>p2 move 3`);