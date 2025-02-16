import { hash } from "@node-rs/argon2";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

(async () => {
  const password = await rl.question("Enter password: ");

  const hashed = await hash(password);

  console.log(`Hash is: ${hashed}`);

  rl.close();
})();
