import "./dropdown-comp.css";
import { useState } from "react";

function DropdownComp({ name, options, selectedOption, setSelectedOption }) {

  const [isExpanded, setIsExpanded] = useState(false);
  let expandedClass = isExpanded ? "" : " collapsed";
  let title = selectedOption?.text ? selectedOption.text : "Select one";

  function loadDropDownOptions() {
    // Check if options is undefined or not an array
    if (!Array.isArray(options)) {
      return;
    }

    // Handle case where options is empty
    if (options.length === 0) {
      return <div className="dropdown-body-error">No options available.</div>;
    }

    return options.map((option, index) => {
      if (!option || typeof option !== 'object' || !('value' in option) || !('text' in option)) {
        return;
      }

      const { value, text } = option;
      return (
        <div key={index} className="dropdown-option-div">
          <input
            type="radio"
            name={"dropdown-" + name}
            id={`${name}-${index}`}
            checked={value == selectedOption?.value}
            onChange={() => { setSelectedOption(option), toggleDropdown() }}
            className="dropdown-option-input"
          />
          <label htmlFor={`${name}-${index}`} className="dropdown-option-label">{text}</label>
        </div>
      );
    });
  }

  function toggleDropdown() {
    setIsExpanded(prevState => !prevState);
  }

  return (
    <>
      <div className={"dropdown-component" + expandedClass}>
        <div className="dropdown-head">
          <div onClick={() => toggleDropdown()} className="dropdown-title">
            {title}
          </div>
          <div className="dropdown-toggler">
            <button onClick={() => toggleDropdown()} title="Expand dropdown" aria-label="Expand dropdown">v</button>
          </div>
        </div>
        <div className="dropdown-body">
          {loadDropDownOptions()}
        </div>
      </div>
    </>
  )
}

export default DropdownComp