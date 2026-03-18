export default function CopyToast({ show, message }) {
  return (
    <div className={`copy-toast${show ? " show" : ""}`}>
      {message || "Copied!"}
    </div>
  )
}
