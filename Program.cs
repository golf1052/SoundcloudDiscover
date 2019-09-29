using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SoundcloudDiscover
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Build().Run();
        }

        public static IHostBuilder BuildWebHost(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(serverOptions =>
                    {
                    })
                    .UseStartup<Startup>()
                    .UseUrls("http://127.0.0.1:8895");
                });
    }
}
