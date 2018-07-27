using System;
using System.Threading.Tasks;
using Discord.API.Gateway;

namespace Clide
{
	class Program
	{
		public static void onMessageReceive(Message message) {
			Console.WriteLine($"{message.Author.Username} says: {message.Content}");
		}

		public static async Task Main(string[] args)
		{
			var client = new Discord();
			client.onMessage = onMessageReceive;

			await client.Login(Environment.GetEnvironmentVariable("DISC_KEY"));

			Console.Read();
		}
	}
}
