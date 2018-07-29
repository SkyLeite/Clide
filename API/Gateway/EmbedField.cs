using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class EmbedField {
    [JsonProperty("name")]
    public string Name;

    [JsonProperty("value")]
    public string Value;

    [JsonProperty("inline")]
    public bool IsInline;
  }
}