using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  internal class IdentifyParams {
    [JsonProperty("token")]
    public string Token;

    [JsonProperty("properties")]
    public IDictionary<string, string> Properties;

    [JsonProperty("large_threshold")]
    public int LargeThreshold;
  }
}