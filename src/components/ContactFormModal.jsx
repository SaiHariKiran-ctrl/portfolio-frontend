import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './ContactFormModal.module.css';

const ContactFormModal = ({
    isOpen,
    onClose,
    recipientEmail,
    darkMode = false,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Close modal with escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    // Validate form on client side with enhanced security checks
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > 100) {
            newErrors.name = 'Name must be less than 100 characters';
        } else if (/[<>{}]/.test(formData.name)) {
            newErrors.name = 'Name contains invalid characters';
        }

        // Email validation - stricter regex
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                formData.email
            )
        ) {
            newErrors.email = 'Email is invalid';
        } else if (formData.email.length > 100) {
            newErrors.email = 'Email must be less than 100 characters';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.length > 200) {
            newErrors.subject = 'Subject must be less than 200 characters';
        } else if (/[<>{}]/.test(formData.subject)) {
            newErrors.subject = 'Subject contains invalid characters';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length > 5000) {
            newErrors.message = 'Message must be less than 5000 characters';
        }

        // Bot detection - check for too-fast submissions
        const currentTime = Date.now();
        if (
            window.lastSubmitTime &&
            currentTime - window.lastSubmitTime < 2000
        ) {
            newErrors.general = 'Please wait a moment before submitting again';
        }
        window.lastSubmitTime = currentTime;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // State for CSRF token
    const [csrfToken, setCsrfToken] = useState('');

    // Fetch CSRF token when the modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchCsrfToken = async () => {
                try {
                    const response = await fetch(
                        `${'http://localhost:3001'}/api/csrf-token`,
                        {
                            credentials: 'include', // Important for receiving and sending cookies
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setCsrfToken(data.csrfToken);
                    } else {
                        console.error('Failed to fetch CSRF token');
                        setErrors({
                            general:
                                'Failed to establish a secure connection. Please try again.',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching CSRF token:', error);
                    setErrors({
                        general:
                            'Network error. Please check your connection and try again.',
                    });
                }
            };

            fetchCsrfToken();
        }
    }, [isOpen]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Check if CSRF token is available
        if (!csrfToken) {
            setErrors({
                general:
                    'Security token missing. Please refresh and try again.',
            });
            return;
        }

        // Add honeypot detection (if a bot fills this field, reject the submission)
        const honeypotField = document.getElementById('website');
        if (honeypotField && honeypotField.value) {
            setSubmitStatus('success'); // Fake success to confuse bots
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Generate a request ID for this submission
        const requestId = `req-${Date.now()}-${Math.floor(
            Math.random() * 1000000
        )}`;

        try {
            // Sanitize inputs before sending
            const sanitizedData = {
                name: formData.name.trim().substring(0, 100),
                email: formData.email.trim().substring(0, 100),
                subject: formData.subject.trim().substring(0, 200),
                message: formData.message.trim().substring(0, 5000),
                to: recipientEmail,
                requestId: requestId,
                timestamp: Date.now(),
                _csrf: csrfToken, // Include the CSRF token in the request body
            };

            // Send data to the backend API with CSRF token
            const response = await fetch(
                `${'http://localhost:3001'}/api/contact`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest', // Helps prevent CSRF
                        'X-Request-ID': requestId,
                        'CSRF-Token': csrfToken, 
                    },
                    credentials: 'include', // Important for sending cookies with the request
                    body: JSON.stringify(sanitizedData),
                }
            );

            // Check for rate limiting
            if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            }

            // Handle CSRF errors
            if (response.status === 403) {
                throw new Error(
                    'Session expired. Please refresh the page and try again.'
                );
            }

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors from server
                if (data.errors && Array.isArray(data.errors)) {
                    const serverErrors = {};
                    data.errors.forEach((error) => {
                        serverErrors[error.path] = error.msg;
                    });
                    setErrors(serverErrors);
                    throw new Error(
                        data.errors[0]?.msg || 'Failed to send message'
                    );
                } else {
                    throw new Error(data.message || 'An error occurred');
                }
            }

            // Validate server response has our requestId to prevent response spoofing
            if (data.requestId !== requestId) {
                throw new Error('Invalid server response');
            }

            // Success state
            setSubmitStatus('success');

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });

            // Close modal after 3 seconds on success
            setTimeout(() => {
                onClose();
                setSubmitStatus(null);
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            // Set a specific error message if available
            if (error.message) {
                setErrors((prev) => ({
                    ...prev,
                    general: error.message,
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const themeClass = darkMode ? styles.darkMode : '';

    return (
        <div
            className={`${styles.modalOverlay} ${themeClass}`}
            onClick={onClose}>
            <div
                className={`${styles.modalContent} ${themeClass}`}
                onClick={(e) => e.stopPropagation()}>
                <button
                    className={`${styles.closeButton} ${themeClass}`}
                    onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={`${styles.modalHeader} ${themeClass}`}>
                    <h2>Contact Form</h2>
                    <p>Send a message to {recipientEmail}</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className={`${styles.successMessage} ${themeClass}`}>
                        <div className={styles.successIcon}>✓</div>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out.</p>
                    </div>
                ) : (
                    <form
                        className={`${styles.contactForm} ${themeClass}`}
                        onSubmit={handleSubmit}
                        aria-label="Contact form">
                        {/* Hidden honeypot field to catch bots */}
                        <div className={styles.honeypot} aria-hidden="true">
                            <input
                                type="text"
                                id="website"
                                name="website"
                                tabIndex="-1"
                                autoComplete="off"
                            />
                        </div>

                        {errors.general && (
                            <div
                                className={`${styles.errorMessage} ${themeClass}`}>
                                {errors.general}
                            </div>
                        )}

                        <div className={`${styles.formGroup} ${themeClass}`}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`${
                                    errors.name ? styles.errorInput : ''
                                } ${themeClass}`}
                                placeholder="Your name"
                                maxLength={100}
                                autoComplete="name"
                                required
                                aria-required="true"
                                aria-invalid={errors.name ? 'true' : 'false'}
                            />
                            {errors.name && (
                                <span className={styles.errorText} role="alert">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className={`${styles.formGroup} ${themeClass}`}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${
                                    errors.email ? styles.errorInput : ''
                                } ${themeClass}`}
                                placeholder="Your email address"
                                maxLength={100}
                                autoComplete="email"
                                required
                                aria-required="true"
                                aria-invalid={errors.email ? 'true' : 'false'}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            />
                            {errors.email && (
                                <span className={styles.errorText} role="alert">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className={`${styles.formGroup} ${themeClass}`}>
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`${
                                    errors.subject ? styles.errorInput : ''
                                } ${themeClass}`}
                                placeholder="Subject of your message"
                                maxLength={200}
                                required
                                aria-required="true"
                                aria-invalid={errors.subject ? 'true' : 'false'}
                            />
                            {errors.subject && (
                                <span className={styles.errorText} role="alert">
                                    {errors.subject}
                                </span>
                            )}
                        </div>

                        <div className={`${styles.formGroup} ${themeClass}`}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`${
                                    errors.message ? styles.errorInput : ''
                                } ${themeClass}`}
                                placeholder="Your message"
                                rows="5"
                                maxLength={5000}
                                required
                                aria-required="true"
                                aria-invalid={
                                    errors.message ? 'true' : 'false'
                                }></textarea>
                            {errors.message && (
                                <span className={styles.errorText} role="alert">
                                    {errors.message}
                                </span>
                            )}
                        </div>

                        {submitStatus === 'error' && (
                            <div
                                className={`${styles.errorMessage} ${themeClass}`}
                                role="alert">
                                There was an error sending your message. Please
                                try again.
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`${styles.submitButton} ${themeClass}`}
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactFormModal;
