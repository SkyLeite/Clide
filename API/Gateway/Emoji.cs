using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Emoji {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("name")]
    public string Name;

    [JsonProperty("roles")]
    public List<Role> Roles;

    [JsonProperty("user")]
    public User Creator;

    [JsonProperty("require_colons")]
    public bool? RequresColons;

    [JsonProperty("managed")]
    public bool IsManaged;

    [JsonProperty("animated")]
    public bool IsAnimated;
  }
}