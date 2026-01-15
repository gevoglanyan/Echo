export function parseConversation(text) {
  const messages = [];
  const errors = [];

  text.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed === "") return;

    if (trimmed.startsWith(">")) {
      messages.push({
        from: "sender",
        text: trimmed.slice(1).trim(),
      });
      return;
    }

    if (trimmed.startsWith("<")) {
      messages.push({
        from: "receiver",
        text: trimmed.slice(1).trim(),
      });
      return;
    }

    errors.push({
      line: index + 1,
      value: line,
    });
  });

  return { messages, errors };
}