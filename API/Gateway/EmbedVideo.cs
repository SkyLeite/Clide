using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class EmbedVideo {
    [JsonProperty("url")]
    public string url;

    [JsonProperty("height")]
    public int Height;

    [JsonProperty("width")]
    public int Width;
  }
}