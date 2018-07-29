using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Channel {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("type")]
    public int Type;

    [JsonProperty("guild_id")]
    public int? GuildID;

    [JsonProperty("position")]
    public int? Position;

    [JsonProperty("name")]
    public string Name;

    [JsonProperty("topic")]
    public string Topic;

    [JsonProperty("nsfw")]
    public bool? IsNSFW;

    [JsonProperty("last_message_id")]
    public string LastMessageID;

    [JsonProperty("bitrate")]
    public int? Bitrate;

    [JsonProperty("user_limit")]
    public int? UserLimit;

    [JsonProperty("recipients")]
    public List<User> Recipients;

    [JsonProperty("icon")]
    public string Icon;

    [JsonProperty("owner_id")]
    public string OwnerID;

    [JsonProperty("application_id")]
    public string ApplicationID;

    [JsonProperty("parent_id")]
    public string ParentID;

    [JsonProperty("last_pin_timestamp")]
    public string LastPinTimestamp;
  }
}