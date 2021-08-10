
class Context {
  constructor (client, message, args, data) {
    this.message = message;
    this.client = client;
    this.data = this.client.opts.databaseModule ? {guild: data.guild, member: data.member,}: {}
    this.args = args;
    this.prefix = data.guild.prefix || process.env.PREFIX;
    if (this.client?.shard) {
      this.shard = this.client.shard;
    }
  }

  get shards () {
    if (!this.shard) throw new Error("Shard non trouvable");
    return this.shard;
  }

  get guild () {
    return this.message.guild;
  }

  get channel () {
    return this.message.channel;
  }

  get author () {
    return this.message.author;
  }

  get member () {
    return this.guild.members.cache.get(this.author.id);
  }

  get dbManager(){
    if(this.client.opts.databaseModule !=="none"){
      return this.client.db
    }else{
      return null
    }
  }

  get me () {
    return this.guild
        ? this.guild.members.cache.get(this.client.user.id)
        : undefined;
  }

  get translate () {
    return this.client.translate;
  }

  send (content,...obj) {
    return this.channel.send(content,obj);
  }
}

module.exports = Context;
