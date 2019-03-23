const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
client.user.setActivity("Loving every single one of you all 😘", {
  type: "STREAMING",
  url: "https://www.twitch.tv/thisisnxzt"
});
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
client.user.setActivity("Loving every single one of you all 😘", {
  type: "STREAMING",
  url: "https://www.twitch.tv/thisisnxzt"
});
      });

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.user.setActivity("Loving every single one of you all 😘", {
  type: "STREAMING",
  url: "https://www.twitch.tv/thisisnxzt"
});
});


client.on("message", async message => {

  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {

    const m = await message.channel.send("Who? Come here!");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms :kissing_heart:`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
  }

    var facts = ["You will breathe.", "I will hopefully get better", "You will win 100k dollars", "You will reach over 1M YouTube subscribers, if lucky.", "Google Stadia will be everywhere", "You won't get sued for that one thing you did, because I know you did it :eyes:", "Hypesquad will get free nitro, again.", "Global emojis will be back at it!", "SA:MP will get back as how it was before, i miss those good times :cry:"];
  var fact = Math.floor(Math.random() * facts.length);

  if(command == "fortune") {
  message.channel.send(facts[fact]);
  }

  var b8ball = [":8ball: **|** Yes.", ":8ball: **|** No.", ":8ball: **|** Maybe.", ":8ball: **|** Depends on current situation.", ":8ball: **|** It is better if it is not talked about it."];
  var check8b = Math.floor(Math.random() * facts.length);

  if(command == "8ball") {
    message.channel.send(b8ball[check8b]);
  }

  if(command == "invite") {
    message.channel.send("Invite me to your server via this invite!: https://discordapp.com/api/oauth2/authorize?client_id=558789021409607687&permissions=2146958839&scope=bot");
  }
  
  if(command === "kick") {

  if(!message.member.roles.some(r=>["Administrator", "Moderator", "moderation", "mod", "moderator", "admin", "queens", "administrations", "admins", "ADMINS", "Admins", "Owner", "owner", "OWNER"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {

      if(!message.member.roles.some(r=>["Administrator", "Moderator", "moderation", "mod", "moderator", "admin", "queens", "administrations", "admins", "ADMINS", "Admins", "Owner", "owner", "OWNER"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
  if(!message.member.roles.some(r=>["Administrator", "Moderator", "moderation", "mod", "moderator", "admin", "queens", "administrations", "admins", "ADMINS", "Admins", "Owner", "owner", "OWNER"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
       const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "help") {
   message.author.send({embed: {
    color: 3066993,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "eevee's help command.",
    url: "https://www.youtube.com/channel/UCZGxT8gY5wrlr2yIn66qTFg",
    description: "All of eevees commands are here! [The prefix is e!]",
    fields: [{
        name: "Moderation.:",
        value: `ban, kick & purge.`
      },
      {
        name: "Fun..",
        value: "ping, fortune"
      },
      {
        name: "Others",
        value: "invite"
      }]
  }
});
 }

});

client.login(config.token);
