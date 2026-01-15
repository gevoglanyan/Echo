export default function EditorPanel({
  sender,
  receiver,
  setSender,
  setReceiver,
  rawText,
  setRawText,
  messages,
  errors
}) {

  const handleImageUpload = (e, user, setUser) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setUser({ ...user, avatar: file });
  };

  return (
    <div className="panel-card">
      <h2>
        Echo — Powered by{" "}
        <a
          href="https://gevoglanyan.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2484ff", textDecoration: "none" }}
        >
          Harry Gevoglanyan
        </a>
      </h2>

      <br />

      <div className="panel-section">
        <div className="profile-row">
          <div className="profile-card">
            <div className="profile-label">Sender</div>

            <img src={sender.avatar} className="profile-pic" alt="Sender avatar" />

            <input
              type="text"
              value={sender.name}
              onChange={e => setSender({ ...sender, name: e.target.value })}
              placeholder="Sender name"
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageUpload(e, sender, setSender)}
            />
          </div>

          <div className="profile-card">
            <div className="profile-label">Receiver</div>

            <img src={receiver.avatar} className="profile-pic" alt="Receiver avatar" />

            <input
              type="text"
              value={receiver.name}
              onChange={e => setReceiver({ ...receiver, name: e.target.value })}
              placeholder="Receiver name"
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => handleImageUpload(e, receiver, setReceiver)}
            />
          </div>

        </div>
      </div>

      <br /> 

      <h2>Input a Conversation</h2>

      <div className="panel-section">
        <div className="conv-header">
          <div>Type a Conversation</div>
          <div className="conv-count">
            {messages.length} Messages
          </div>
        </div>

        <textarea
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          spellCheck="false"
        />

        {errors?.length > 0 && (
          <div className="hint-box hint-error">
            <b>⚠️ Invalid lines detected</b><br />
            Every line must start with &gt; or &lt;
            <br /><br />

            {errors.map(e => (
              <div key={e.line}>
                Line {e.line}: "{e.value.trim()}"
              </div>
            ))}
          </div>
        )}
      </div>

      <br />

      <h2>How to Guide</h2>

      <div className="panel-section info-section">
        <ul className="rules-list">
          <li>
            Use <code>&gt;</code> to send a message from the <b>Sender</b>
          </li>
          <li>
            Use <code>&lt;</code> to send a message from the <b>Receiver</b>
          </li>
          <li>
            Each message must be on its own line
          </li>
          <li>
            Export captures only the chat preview
          </li>
        </ul>
      </div>
    </div>
  );
}