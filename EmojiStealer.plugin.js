/**
 * @name EmojiStealer
 * @authorLink https://github.com/AffinityGH
 * @website https://stjarna.cf
 */

module.exports = (() =>
{
    const config =
    {
		info:
		{
			name: "EmojiStealer",
			authors:
			[
				{
					name: "Affinity",
					discord_id: "411212714707386389",
					github_username: "AffinityGH"

				}
			],
			version: "1.0.1",
			description: "Copy the URL of any emoji and call it using a simple command, allowing you to use emojis at will."
		},
		changelog:
		[
			{
				title: "1.0.1",
				type: "added",
				items:
				[
					"Made the emoji sizes 64x64 pixels"
				]
			}
		]
    };

    return (([Plugin, Api]) => {

		const plugin = (Plugin, Api) =>
		{
			const { DiscordModules, Patcher } = Api;

			return class EmojiStealer extends Plugin
			{
				constructor()
				{
					super();
				}
	
				onStart()
				{
					Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) =>
					{
						const content = message.content.toLowerCase();

						switch (content.split("$")[0])
						{
							case "steal":
								const link = (/^steal\$ /g).exec(content);

								const pieces = message.content.substr(link[0].length, message.content.length).split(" ")

								if (pieces.length > 2){
									message.content = ("Error. More than two fields detected.")
									break;
								}

								const name = pieces[0]
								const url = pieces[1]

								BdApi.saveData("EmojiStealer", name, url)

								message.content = ("Success")
								
								break;

							case "e":
								const data = (/^e\$ /g).exec(content);

								const key = message.content.substr(data[0].length, message.content.length).split(" ")

								if (key.length > 1){
									message.content = ("Error. More than one field detected.")
									break;
								}

								const emojiUrl = BdApi.loadData("EmojiStealer", key[0]);

								message.content = (emojiUrl + '&size=64');
							
							case "es":
								const es = (/^es\$ /g).exec(content);

								const keyes = message.content.substr(es[0].length, message.content.length).split(" ")

								if (keyes.length > 1){
									message.content = ("Error. More than one field detected.")
									break;
								}

								const emojiUrles = BdApi.loadData("EmojiStealer", keyes[0]);

								message.content = (emojiUrles + '&size=32');
						}
					});
				}
	
				onStop()
				{
					Patcher.unpatchAll();
				}
			}
		};

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
