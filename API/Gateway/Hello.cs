using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  internal class Hello {
    [JsonProperty("heartbeat_interval")]
    public int HeartbeatInterval;
  }
}