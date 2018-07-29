using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Role {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("name")]
    public string Name;

    [JsonProperty("color")]
    public int Color;

    [JsonProperty("hoist")]
    public bool IsHoisted;

    [JsonProperty("position")]
    public int Position;

    [JsonProperty("permissions")]
    public int Permissions;

    [JsonProperty("managed")]
    public bool Managed;

    [JsonProperty("mentionable")]
    public bool Mentionable;
  }
}