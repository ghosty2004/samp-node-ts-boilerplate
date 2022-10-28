import { blue, green, red } from "colorette";
import { OnGameModeInit, OnPlayerSpawn, OnPlayerUpdate, SetGameModeText } from "samp-node-lib";
import { mysqlConnect } from "@/modules/mysql";
import { timeout } from "@/functions";

OnGameModeInit(async() => {
    await timeout(1000);
    console.log(`${blue("TypeScript")} gamemode loaded`);
    SetGameModeText("TS gamemode");
    mysqlConnect((err) => {
        console.log(`MySQL connection: ${!err ? green("accepted") : red("refused")}`)
    });
});

OnPlayerSpawn((player) => {
    player.SendClientMessage("#FFFFFF", "Welcome to {0000FF}TypeScript {FFFFFF}gamemode!");
});

OnPlayerUpdate((player) => {
    return true;
});