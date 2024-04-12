import fs from "node:fs";

export const getMessageCollection = () => JSON.parse(fs.readFileSync('../bd/messageCollection.json').toString());