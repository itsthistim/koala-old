import "#lib/setup";
import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits, Partials } from "discord.js";

let prefixes = [];
if (process.env.NODE_ENV === "PRODUCTION") {
	prefixes.push("-");
} else {
	prefixes.push("+");
}

const client = new SapphireClient({
	defaultPrefix: prefixes,
	caseInsensitivePrefixes: true,
	caseInsensitiveCommands: true,
	intents: [
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.MessageContent,
	],
	allowedMentions: { repliedUser: false },
	loadMessageCommandListeners: true,
	partials: [Partials.Channel],
	shards: "auto"
});

const main = async () => {
	try {
		client.logger.info("Logging in...");
		await client.login();
	} catch (error) {
		console.error(error);
		await client.destroy();
		process.exit(1);
	}
};

main().then(() => {
	client.logger.info("Logged in as " + client.user.tag);
});
