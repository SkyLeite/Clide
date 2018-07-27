using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  class Message {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("channel_id")]
    public string ChannelID;

    [JsonProperty("author")]
    public User Author;

    [JsonProperty("content")]
    public string Content;
  }
}