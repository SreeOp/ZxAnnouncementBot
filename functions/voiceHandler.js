const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

const voiceHandler = (client, voiceChannelId) => {
  client.on('ready', () => {
    const voiceChannel = client.channels.cache.get(voiceChannelId);

    if (!voiceChannel || voiceChannel.type !== 2) { // 2 is the type for GUILD_VOICE
      console.error('Voice channel not found or invalid channel type.');
      return;
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('The bot has connected to the voice channel.');
    });

    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ]);
      } catch (error) {
        console.error('Failed to reconnect to the voice channel:', error);
        connection.destroy();
      }
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });

    player.on(AudioPlayerStatus.Idle, () => {
      console.log('The audio player is idle.');
    });

    connection.subscribe(player);
  });
};

module.exports = voiceHandler;
