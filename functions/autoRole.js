const autoRoleHandler = async (client, autoRoleId) => {
  client.on('guildMemberAdd', async (member) => {
    const role = member.guild.roles.cache.get(autoRoleId);
    if (!role) {
      console.error('Role not found');
      return;
    }

    try {
      await member.roles.add(role);
      console.log(`Assigned role ${role.name} to ${member.user.tag}`);
    } catch (error) {
      console.error(`Failed to assign role to ${member.user.tag}:`, error);
    }
  });
};

module.exports = autoRoleHandler;
