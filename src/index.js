// Imports
const Sim = require('pokemon-showdown');
var prompt = require('prompt-sync')();

// Test Variables
const test_player_one = ["BoB", null, null];
const test_player_two = ["Alice", null, null];
let test_move = "move 1";

// Get User Input
function GetUserInput(player){
    var input = prompt(`Input ${player} Move or Switch: `);
    return input
};

// Get User Input - Switch Locked
function GetUserInput_SwitchLocked(player){
    var input = prompt(`Input ${player} Switch: switch `);
    input = "switch "+input
    return input
};

// Build PLAYEROPTIONS Json Blob
function player_options(user_info){
    const PLAYEROPTIONS = {name: user_info[0], avatar: user_info[1], team: user_info[2]};
    return PLAYEROPTIONS;
}

// Start sim stream with player info and battle options
function start_sim(p1, p2, BATTLEOPTIONS, stream){
    const player_one = player_options(p1);
    const player_two = player_options(p2);
    stream.write(`>start {"formatid":${JSON.stringify(BATTLEOPTIONS)}, "p1":${JSON.stringify(player_one)}, "p2":${JSON.stringify(player_two)}}`);
    const sim_input_log = stream.battle.inputLog
    const sim_output_log = stream.battle.log
    const sim_output_buf = stream.buf
    const output = [sim_input_log, sim_output_log, sim_output_buf, stream]
    console.log(sim_output_buf);
    return output
}

// Determine if the user needs to switch
function is_switch_needed(stream_buf, player){

}

function progress_sim(p1_switch_move, p2_switch_move, stream){
    p1_move = GetUserInput("Player_One");
    p2_move = GetUserInput("Player_Two");
    stream.write(`>p1 ${p1_move}`);
    stream.write(`>p2 ${p2_move}`);
    const sim_input_log = stream.battle.inputLog
    const sim_output_log = stream.battle.log
    const sim_output_buf = stream.buf
    const output = [sim_input_log, sim_output_log, sim_output_buf, stream]
    console.log(sim_output_buf);
    return output
}

function loop_progress_options(p1_move, p2_move, stream){
    let counter = 0
    let temp = `turn_${counter}`
    temp = [null, null, null, stream]
    while (counter <= 10){
        counter++;
        temp = progress_sim(p1_move, p2_move, temp[3]);
    }
    return temp
}
function two_player_singles_sim(p1_info, p2_info, test_move){
    stream = new Sim.BattleStream();
    const start = start_sim(p1_info, p2_info, "gen7randombattle", stream);
    output = loop_progress_options(test_move, test_move, start[3]);
    return output[3]
}

console.log(two_player_singles_sim(test_player_one, test_player_two));