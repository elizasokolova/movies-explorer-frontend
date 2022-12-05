import "../Input/Input.css";

export default function Input({ title, onChange, value, name, type, error, disabled, inputClass, labelClass, titleClass, errorClass }) {
    const requiredProps = type === "text" ? { minLength: 2, maxLength: 30 } : type === "password" ? { minLength: 4, maxLength: 16 } : null;
    return (
        <label className={labelClass}>
            <span className={titleClass}>{title}</span>
            <input name={name} type={type} value={value} className={`${inputClass} ${error && "input__switch-color"}`} onChange={onChange} disabled={disabled} required{...requiredProps}/>
            <span className={`${errorClass} ${error && "input__error_visible"}`}>{error}</span>
        </label>
    );
}
