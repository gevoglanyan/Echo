export default function MessageInput({ msg, onChange }) {
  return (
    <textarea
      value={msg.text}
      onChange={e => onChange(e.target.value)}
      rows={2}
    />
  );
}