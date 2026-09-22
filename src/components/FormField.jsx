export default function FormField({ label, error, children }) {
  return <label className="field"><span>{label}</span>{children}{error && <em>{error}</em>}</label>
}
