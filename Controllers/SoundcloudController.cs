using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace SoundcloudDiscover.Controllers
{
    [Route("api/[controller]")]
    public class SoundcloudController : Controller
    {
        private const string BaseUrl = "https://api.soundcloud.com";
        private HttpClient httpClient;
        private Dictionary<int, JObject> userObjectCache;

        public SoundcloudController()
        {
            httpClient = new HttpClient();
            userObjectCache = new Dictionary<int, JObject>();
        }

        [HttpGet]
        public async Task<JArray> GetMutualFollowings([FromQuery] string username, [FromQuery] int min = 2)
        {
            return await GetDiscoveries(username, min);
        }

        private async Task<JArray> GetDiscoveries(string username, int minMutual = 2)
        {
            int id = await ResolveId(username);
            var followings = await GetFollowings(id);
            var discoveries = await GetDiscover(id);
            List<JObject> discoveriesList = new List<JObject>();
            foreach (var discover in discoveries)
            {
                if (discover.Value.Count >= minMutual && !followings.Contains(discover.Key))
                {
                    JObject o = new JObject();
                    o["url"] = userObjectCache[discover.Key]["permalink_url"];
                    JArray followedByList = new JArray();
                    foreach (var followedBy in discover.Value)
                    {
                        followedByList.Add(userObjectCache[followedBy]["permalink_url"]);
                    }
                    o["followed_by"] = followedByList;
                    discoveriesList.Add(o);
                }
            }
            discoveriesList.Sort((a, b) =>
            {
                return ((JArray)a["followed_by"]).Count.CompareTo(((JArray)b["followed_by"]).Count) * -1;
            });
            JArray discoveriesA = new JArray();
            foreach (var o in discoveriesList)
            {
                discoveriesA.Add(o);
            }
            return discoveriesA;
        }

        private async Task<int> ResolveId(string username)
        {
            JObject responseObject = JObject.Parse(await (await httpClient.GetAsync($"{BaseUrl}/resolve?url=https://soundcloud.com/{username}&client_id={Secrets.SoundcloudClientId}")).Content.ReadAsStringAsync());
            return (int)responseObject["id"];
        }

        private async Task<Dictionary<int, List<int>>> GetDiscover(int id)
        {
            Dictionary<int, List<int>> discover = new Dictionary<int, List<int>>();
            // first get users followings
            var followings = await GetFollowings(id);
            foreach (int following in followings)
            {
                // then get that followings followings
                var secondFollowings = await GetFollowings(following);
                foreach (int secondFollowing in secondFollowings)
                {
                    // then link that second following to the first following
                    if (!discover.ContainsKey(secondFollowing))
                    {
                        discover.Add(secondFollowing, new List<int>());
                    }
                    discover[secondFollowing].Add(following);
                }
            }
            return discover;
        }
        private async Task<List<int>> GetFollowings(int id)
        {
            List<int> followings = new List<int>();
            JObject responseObject = JObject.Parse(await (await httpClient.GetAsync($"{BaseUrl}/users/{id}/followings?page_size=200&client_id={Secrets.SoundcloudClientId}")).Content.ReadAsStringAsync());
            do
            {
                foreach (JObject o in (JArray)responseObject["collection"])
                {
                    int followingsId = (int)o["id"];
                    followings.Add(followingsId);
                    if (!userObjectCache.ContainsKey(followingsId))
                    {
                        userObjectCache.Add(followingsId, o);
                    }
                }
                responseObject = await GetContinuation(responseObject);
            }
            while(responseObject != null);
            return followings;
        }

        private async Task<JObject> GetContinuation(JObject o)
        {
            if (o["next_href"].Type != JTokenType.Null)
            {
                return JObject.Parse(await (await httpClient.GetAsync((string)o["next_href"])).Content.ReadAsStringAsync());
            }
            return null;
        }
    }
}
