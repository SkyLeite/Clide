using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Attachment {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("filename")]
    public string Filename;

    [JsonProperty("size")]
    public int Size;

    [JsonProperty("url")]
    public string URL;

    [JsonProperty("proxy_url")]
    public string ProxyURL;

    [JsonProperty("height")]
    public int? Height;

    [JsonProperty("width")]
    public int? Width;
  }
}