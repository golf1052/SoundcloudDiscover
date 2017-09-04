using System;
using Newtonsoft.Json.Linq;

namespace SoundcloudDiscover
{
    public struct SoundcloudUser
    {
        public int Id { get; private set; }
        public string Url { get; private set; }
        public string Username { get; private set; }
        public string AvatarUrl { get; private set; }

        public static SoundcloudUser FromJObject(JObject o)
        {
            return new SoundcloudUser()
            {
                Id = (int)o["id"],
                Url = (string)o["permalink_url"],
                Username = (string)o["username"],
                AvatarUrl = (string)o["avatar_url"]
            };
        }

        public JObject ToJObject()
        {
            JObject o = new JObject();
            o["_id"] = Id;
            o["url"] = Url;
            o["username"] = Username;
            o["image"] = AvatarUrl;
            return o;
        }
    }
}
