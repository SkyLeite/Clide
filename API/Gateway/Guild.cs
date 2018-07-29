using System.Collections.Generic;
using Newtonsoft.Json;

namespace Discord.API.Gateway {
  [JsonObject]
  class Guild {
    [JsonProperty("id")]
    public string ID;

    [JsonProperty("name")]
    public string Name;

    [JsonProperty("icon")]
    public string Icon;

    [JsonProperty("splash")]
    public string Splash;

    [JsonProperty("owner")]
    public bool? IsOwner;

    [JsonProperty("permissions")]
    public int Permissions;

    [JsonProperty("region")]
    public string Region;

    [JsonProperty("afk_channel_id")]
    public string AFKChannelID;

    [JsonProperty("afk_timeout")]
    public int? AFKTimeout;

    [JsonProperty("embed_enabled")]
    public bool? IsEmbedEnabled;

    [JsonProperty("embed_channel_id")]
    public string EmbedChannelID;

    [JsonProperty("verification_level")]
    public int VerificationLevel;

    [JsonProperty("default_message_notifications")]
    public int MessageNotificationsLevel;

    [JsonProperty("explicit_content_filter")]
    public int ExplicitContentFilterLevel;

    [JsonProperty("roles")]
    public List<Role> Roles;

    [JsonProperty("emojis")]
    public List<Emoji> Emojis;

    [JsonProperty("features")]
    public List<string> Features;

    [JsonProperty("mfa_level")]
    public int MFALevel;

    [JsonProperty("application_id")]
    public int? ApplicationID;

    [JsonProperty("widget_enabled")]
    public bool? IsWidgetEnabled;

    [JsonProperty("widget_channel_id")]
    public string WidgetChannelID;

    [JsonProperty("system_channel_id")]
    public string SystemChannelID;

    [JsonProperty("joined_at")]
    public string JoinedAt;

    [JsonProperty("large")]
    public bool? IsLarge;

    [JsonProperty("unavailable")]
    public bool? IsUnavailable;

    [JsonProperty("member_count")]
    public int MemberCount;

    [JsonProperty("channels")]
    public List<Channel> Channels;

    [JsonProperty("members")]
    public List<Member> Members;
  }
}