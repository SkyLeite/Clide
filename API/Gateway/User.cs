using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  class User {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("username")]
    public string Username;

    [JsonProperty("discriminator")]
    public string Discriminator;

    [JsonProperty("avatar")]
    public string Avatar;

    [JsonProperty("bot")]
    public bool? IsBot;

    [JsonProperty("mfa_enabled")]
    public bool? IsMFAEnabled;

    [JsonProperty("verified")]
    public bool? IsVerified;

    [JsonProperty("email")]
    public string Email;
  }
}