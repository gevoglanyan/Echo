import { useState } from "react";
import EditorPanel from "./components/EditorPanel.jsx";
import PlatformPreview from "./components/PlatformPreview.jsx";
import { parseConversation } from "./utils/parseConversation.js";

export default function App() {

  const [sender, setSender] = useState({
    name: "John",
    avatar: "/preview.png"
  });

  const [receiver, setReceiver] = useState({
    name: "Doe",
    avatar: "/preview.png"
  });

  const [rawText, setRawText] = useState(
`> Sender
< Receiver
> Good luck!`
  );

  const { messages, errors } = parseConversation(rawText);
  const [platform, setPlatform] = useState("tinder");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="app">
      <div className="container-left">
        <EditorPanel
          sender={sender}
          receiver={receiver}
          setSender={setSender}
          setReceiver={setReceiver}
          rawText={rawText}
          setRawText={setRawText}
          messages={messages}
          errors={errors}
        />
      </div>

      <div className="container-right">
        <PlatformPreview
          sender={sender}
          receiver={receiver}
          messages={messages}
          platform={platform}
          setPlatform={setPlatform}

          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
    </div>
  );
}