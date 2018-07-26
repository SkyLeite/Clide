using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Clide {
  class WebSocket {
    private ClientWebSocket client { get; set; }
    private CancellationToken ct { get; set; }

    public WebSocket() {
      this.client = new ClientWebSocket();
      this.ct = CancellationToken.None;
    }

    public async void Connect(string url) {
      var uri = new Uri(url);
      await this.client.ConnectAsync(uri, this.ct);
      this.ReceiveAsync();
    }

    public async void Send(string message) {
      var bytes = Encoding.UTF8.GetBytes(message);
      var buffer = new ArraySegment<byte>(bytes);
      await client.SendAsync(bytes, WebSocketMessageType.Text, true, this.ct);
    }

    public async void ReceiveAsync() {
      while (client.State == WebSocketState.Open) {
        var buffer = new byte[256];
        await client.ReceiveAsync(buffer, this.ct);

        var data = Encoding.UTF8.GetString(buffer);
        Console.WriteLine(data);
      }
    }
  }
}