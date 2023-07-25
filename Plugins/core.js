const fs = require("fs");
const axios = require("axios");
const path = require("path");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "script",
];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  uniquecommands: ["sc", "support"],
  description: "All miscellaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD, doReact }) => {
    let pic = fs.readFileSync("./Assets/cringe.mp4");
    let pic2 = fs.readFileSync("./Assets/finger-wag-dolla-shack.mp4");
    switch (inputCMD) {
      case "script":
      case "sc":
        await doReact("🧏‍♂️");
        let repoInfo = await axios.get(
          "https://api.github.com/repos/FantoX001/Atlas-MD"
        );
        let repo = repoInfo.data;
        let txt = `Lolz, this repo is private bruv.`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
        await doReact("🙅‍♂️");
        let txt2 = `The only support I know is child support. 😔`;
        Atlas.sendMessage(m.from, { image: pic2, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("💁‍♂️");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
            //formatted += `\`\`\`${commands.join("\n")}\`\`\`\n\n\n`;
            // Adding a - before each command
            formatted += `\`\`\`${commands
              .map((cmd) => `➺   ${prefix + cmd}`)
              .join("\n")}\`\`\`\n\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nYo my nigga *${pushName}*,\n\nI am *${botName}* and I am here to make your boring ass life more entertaining.\n\n*🔖 My Prefix is:*  ${prefix}\n\n${formattedCommands}\n\n\n*©️ Galaxy - 2023*`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;
      default:
        break;
    }
  },
};
