using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Embed {
    [JsonProperty("title")]
    public string Title;

    [JsonProperty("type")]
    public string Type;

    [JsonProperty("description")]
    public string Description;

    [JsonProperty("url")]
    public string URL;

    [JsonProperty("timestamp")]
    public int Timestamp;

    [JsonProperty("color")]
    public int Color;

    [JsonProperty("thumbnail")]
    public EmbedThumbnail Thumbnail;

    [JsonProperty("video")]
    public EmbedVideo Video;

    [JsonProperty("image")]
    public EmbedImage Image;

    [JsonProperty("footer")]
    public EmbedFooter Footer;

    [JsonProperty("fields")]
    public List<EmbedField> Field;
  }
}