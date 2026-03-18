export default function Nav({ tabs, activeTab, onTabClick, showBack, onBack }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => onTabClick("welcome")}>
        Chroma<em>Studio</em>
      </div>
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {showBack && (
        <button className="nav-back" onClick={onBack}>
          ← Back
        </button>
      )}
    </nav>
  )
}
