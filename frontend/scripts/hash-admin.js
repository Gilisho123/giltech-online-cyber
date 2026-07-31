const bcrypt = require("bcryptjs");

async function run() {

    const password = "Giltech@2026";

    const hash = await bcrypt.hash(password, 10);

    console.log(hash);

}

run();