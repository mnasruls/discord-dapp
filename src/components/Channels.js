const Channels = ({ provider, account, DiscordDapp, channels, currentChannel, setCurrentChannel }) => {

  const channelHandler = async (channel) => {
    const hasJoined = await DiscordDapp.hasJoined(channel.id, account)
    if (hasJoined) {
      console.log("User has already joined this channel", channel.name) 
      setCurrentChannel(channel)
    }else{
      const signer = provider.getSigner()
      const tx = await DiscordDapp.connect(signer).mint(channel.id, { value: channel.cost })
      await tx.wait()
      setCurrentChannel(channel)
    }
  }
  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Text Channels</h2>
        <ul>
          {channels.map((channel, index) => (
            <li 
              key={index} 
              onClick={() => channelHandler(channel)}
              className={currentChannel && currentChannel.id.toString() === channel.id.toString() ? "active" : ""}>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="channels__voice">
        <h2>Voice Channels</h2>

        <ul>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>
    </div>
  );
}

export default Channels;