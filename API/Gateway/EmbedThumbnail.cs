using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class EmbedThumbnail {
    [JsonProperty("url")]
    public string url;

    [JsonProperty("proxy_url")]
    public string ProxyURL;

    [JsonProperty("height")]
    public int Height;

    [JsonProperty("width")]
    public int Width;
  }
}