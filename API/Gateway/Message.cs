using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Message {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("channel_id")]
    public string ChannelID;

    [JsonProperty("author")]
    public User Author;

    [JsonProperty("content")]
    public string Content;

    [JsonProperty("timestamp")]
    public string Timestamp;

    [JsonProperty("edited_timestamp")]
    public string EditedTimestamp;

    [JsonProperty("tts")]
    public bool IsTTS;

    [JsonProperty("mention_everyone")]
    public bool MentionsEveryone;

    [JsonProperty("nonce")]
    public string None;

    [JsonProperty("pinned")]
    public bool IsPinned;

    [JsonProperty("webhook_id")]
    public string WebhookID;

    [JsonProperty("type")]
    public int Type;

    [JsonProperty("mentions")]
    public List<User> Mentions;

    [JsonProperty("mention_roles")]
    public List<Role> MentionRoles;

    [JsonProperty("attachments")]
    public List<Attachment> Attachments;

    [JsonProperty("embeds")]
    public List<Embed> Embeds;

    [JsonProperty("reactions")]
    public List<Reaction> Reactions;
  }
}