const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (Atlas, anu) => {
  try {
    let metadata = await Atlas.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "Pas de Description";

    for (let num of participants) {
      try {
        ppuser = await Atlas.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} a été ajouté à: ${
            metadata.subject
          }\n`
        );
        Atlastext = `
Yo @${WAuserName.split("@")[0]},

T'as rejoint *${metadata.subject}*.

*🧣 Description 🧣*

${desc}

*Ton Babiere Maintenant.*
  `;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} s'est fait shiet de: ${
            metadata.subject
          }\n`
        );
        Atlastext = `
  @${WAuserName.split("@")[0]} a pull up.
  `;
        if (WELstatus) {
          await Atlas.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Atlastext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};