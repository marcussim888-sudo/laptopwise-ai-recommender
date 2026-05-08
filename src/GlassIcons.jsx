import './GlassIcons.css'

const gradientMapping = {
  blue: 'linear-gradient(135deg, hsl(223, 90%, 55%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(135deg, hsl(283, 90%, 55%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(135deg, hsl(3, 90%, 55%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(135deg, hsl(253, 90%, 55%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(135deg, hsl(43, 90%, 55%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(135deg, hsl(123, 70%, 45%), hsl(108, 70%, 40%))',
}

const GlassIcons = ({ items, className }) => {
  const getBackgroundStyle = (color) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] }
    }

    return { background: color }
  }

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button
          key={index}
          className={`icon-btn ${item.customClass || ''}`}
          aria-label={item.label}
          type="button"
          onClick={item.onClick}
        >
          <span
            className="icon-btn__back"
            style={getBackgroundStyle(item.color)}
          ></span>

          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>

          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default GlassIcons