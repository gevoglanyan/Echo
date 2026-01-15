import { toPng } from "html-to-image";
import { useRef } from "react";

export default function PlatformPreview({
  sender,
  receiver,
  messages,
  platform,
  setPlatform,
  darkMode,
  setDarkMode
}) {

  const previewRef = useRef(null);

  const composerPlaceholder = {
    tinder: "Send a message",
    discord: `Message ${receiver.name}`,
    imessage: "iMessage",
    whatsapp: "Type a message",
    instagram: "Message...",
    twitter: "Start a new message"
  }[platform] || "Type a message";

  const exportPreview = async () => {
    if (!previewRef.current) return;

    const dataUrl = await toPng(previewRef.current, {
      pixelRatio: 2
    });

    const link = document.createElement("a");
    link.download = `chat-preview-${platform}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="preview-card">
      <div className="preview-topbar">
        <div className="preview-logo">Conversation Preview</div>

        <div className="preview-controls">
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            className="export-btn"
            onClick={exportPreview}
          >
            📥 Export
          </button>

          <select value={platform} onChange={e => setPlatform(e.target.value)}>
            <option value="tinder">Tinder</option>
            <option value="discord">Discord</option>
            <option value="imessage">iMessage</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter (X)</option>
          </select>
        </div>
      </div>

      <div
        ref={previewRef}
        className={`chat-canvas platform-${platform} ${darkMode ? "dark" : ""}`}
      >

        {platform === "tinder" && (
          <div className="tinder-header">
            <img src={receiver.avatar} className="chat-header-avatar" />
            <div>
              <div className="tinder-header-name">{receiver.name}</div>
              <div className="tinder-header-sub">Active now</div>
            </div>
          </div>
        )}

        <div className="chat">
          {messages.map((m, i) => {
            const isSender = m.from === "sender";
            const showAvatar = platform !== "imessage" && platform !== "whatsapp";

            return (
              <div key={i} className={`msg ${isSender ? "sender" : "receiver"}`}>
                {!isSender && showAvatar && (
                  <img src={receiver.avatar} className="chat-avatar" />
                )}
                {!isSender && !showAvatar && (
                  <div className="chat-avatar" style={{visibility: 'hidden'}} />
                )}

                <div className={`bubble ${isSender ? "sender" : "receiver"}`}>
                  {m.text}
                  {isSender && i === messages.length - 1 && platform !== "discord" && (
                    <div className="timestamp">
                      {platform === "imessage" && "Read"}
                      {platform === "whatsapp" && "✓✓"}
                      {platform === "instagram" && "Seen"}
                      {platform === "twitter" && "Seen"}
                      {platform === "tinder" && "Delivered"}
                    </div>
                  )}
                </div>

                {isSender && showAvatar && (
                  <img src={sender.avatar} className="chat-avatar" />
                )}
                {isSender && !showAvatar && (
                  <div className="chat-avatar" style={{visibility: 'hidden'}} />
                )}
              </div>
            );
          })}
        </div>

        <div className="composer">
          <input
            className="composer-input"
            placeholder={composerPlaceholder}
            disabled
          />
          {platform !== "discord" && (
            <button className="composer-send">
              {platform === "tinder" && "❤"}
              {platform === "imessage" && "↑"}
              {platform === "twitter" && "➤"}
              {platform === "instagram" && "➤"}
              {platform === "whatsapp" && "➤"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}