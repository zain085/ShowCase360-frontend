import React from 'react';

export const FormLayout = ({ title, children, onSubmit }) => {
  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="bg-dark-custom p-4 rounded border-purple shadow"
      >
        {children}
      </form>
    </div>
  );
};

// === Reusable Input Field ===
export const InputField = ({ label, name, type = 'text', value, onChange, required = true }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      className="form-control bg-dark text-white border-purple"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

// === Reusable Textarea ===
export const TextAreaField = ({ label, name, value, onChange, rows = 4, required = true }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <textarea
      name={name}
      rows={rows}
      className="form-control bg-dark text-white border-purple"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

// === Reusable Select Field ===
export const SelectField = ({ label, name, value, onChange, options = [], required = true }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <select
      name={name}
      className="form-select bg-dark text-white border-purple"
      value={value}
      onChange={onChange}
      required={required}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// === Reusable Radio Button Group ===
export const RadioButtonGroup = ({ label, name, value, onChange, options = [], required = true }) => (
  <div className="mb-3">
    <label className="form-label d-block">{label}</label>
    {options.map((opt) => (
      <div className="form-check form-check-inline" key={opt.value}>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
          required={required}
        />
        <label className="form-check-label text-white">{opt.label}</label>
      </div>
    ))}
  </div>
);


export default FormLayout;