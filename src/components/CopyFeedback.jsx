
function CopyFeedback({ show }) {
  return (
    <div className={`copy-feedback ${show ? "show" : ""}`}>
      Copied to clipboard!
    </div>
  );
}

export default CopyFeedback;
