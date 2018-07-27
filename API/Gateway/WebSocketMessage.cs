using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway
{
  class WebSocketMessage
  {
    [JsonProperty("t")]
    public string t;
    
    [JsonProperty("s")]
    public int? s;

    [JsonProperty("op", Required = Required.DisallowNull)]
    public int op;
  }

  class WebSocketMessage<T> : WebSocketMessage {
    [JsonProperty("d")]
    public T Data;
  }
}