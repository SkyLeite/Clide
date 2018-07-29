using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Reaction {
    [JsonProperty("count")]
    public int Count;

    [JsonProperty("me")]
    public bool UserReacted;

    [JsonProperty("emoji")]
    public Emoji Emoji;
  }
}