using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Member {
    [JsonProperty("user")]
    public User User;

    [JsonProperty("nick")]
    public string Nickname;

    [JsonProperty("roles")]
    public List<Role> Roles;

    [JsonProperty("joined_at")]
    public string JoinedAt;

    [JsonProperty("deaf")]
    public bool IsDeafened;

    [JsonProperty("mute")]
    public bool IsMuted;
  }
}