import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import styles from "../CamperDetails.module.css";

const BookingForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });

  const validateField = (inputElement) => {
    const { name, validity } = inputElement;
    let errorMsg = "";

    if (!validity.valid) {
      errorMsg = `Please enter your ${name}.`;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(e.target);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const isFormValid = form.checkValidity();

    const nameError = validateField(form.elements.name);
    const emailError = validateField(form.elements.email);

    setTouched({ name: true, email: true });

    if (!isFormValid) {
      return;
    }

    onSubmitSuccess();
    setFormData({ name: "", email: "" });
    setErrors({ name: "", email: "" });
    setTouched({ name: false, email: false });
  };

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.bookingHeader}>
        <h3 className={styles.bookingTitle}>Book your campervan now</h3>
        <p className={styles.bookingSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.inputWrapper}>
        {formData.name.length > 0 && (
          <label
            className={`${styles.floatingLabel} ${
              errors.name && touched.name ? styles.labelError : ""
            }`}
          >
            Name*
          </label>
        )}
        <input
          type="text"
          name="name"
          required
          minLength={2}
          pattern="^[^0-9]*$"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={formData.name.length > 0 ? "" : "Name*"}
          className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ""}`}
        />
        {errors.name && touched.name && (
          <>
            <FiAlertCircle className={styles.errorIcon} />
            <span className={styles.errorText}>{errors.name}</span>
          </>
        )}
      </div>

      <div className={styles.inputWrapper}>
        {formData.email.length > 0 && (
          <label
            className={`${styles.floatingLabel} ${
              errors.email && touched.email ? styles.labelError : ""
            }`}
          >
            Email*
          </label>
        )}
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={formData.email.length > 0 ? "" : "Email*"}
          className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ""}`}
        />
        {errors.email && touched.email && (
          <>
            <FiAlertCircle className={styles.errorIcon} />
            <span className={styles.errorText}>{errors.email}</span>
          </>
        )}
      </div>

      <button type="submit" className={styles.sendButton}>
        Send
      </button>
    </form>
  );
};

export default BookingForm;
