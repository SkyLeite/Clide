using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class EmbedFooter {
    [JsonProperty("text")]
    public string Text;

    [JsonProperty("icon_url")]
    public string IconURL;

    [JsonProperty("proxy_icon_url")]
    public string ProxyIconURL;
  }
}