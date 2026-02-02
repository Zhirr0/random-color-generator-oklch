
function WelcomeSection({ onSelectCategory }) {
  const categories = [
    { name: "random", label: "Absolute Random", className: "absolute-random" },
    { name: "red", label: "Red", className: "red" },
    { name: "orange", label: "Orange", className: "orange" },
    { name: "yellow", label: "Yellow", className: "yellow" },
    { name: "brown", label: "Brown", className: "brown" },
    { name: "green", label: "Green", className: "green" },
    { name: "cyan", label: "Cyan", className: "cyan" },
    { name: "blue", label: "Blue", className: "blue" },
    { name: "purple", label: "Purple", className: "purple" },
    { name: "pink", label: "Pink", className: "pink" },
  ];

  return (
    <div className="section welcome-section-wrapper">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Random Color Generator</h1>
        <div className="color-categories">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-btn ${category.className}`}
              onClick={() => onSelectCategory(category.name)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
