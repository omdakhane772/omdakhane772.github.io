import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'ok' | 'bad', message: string }
  const [copyFeedback, setCopyFeedback] = useState('COPY ADDRESS');

  const emailAddress = 'omdakhane23@gmail.com';

  const handleCopyEmail = () => {
    const notifyDone = (msg) => {
      setCopyFeedback(msg);
      setTimeout(() => setCopyFeedback('COPY ADDRESS'), 1800);
    };

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(emailAddress)
        .then(() => notifyDone('COPIED!'))
        .catch(() => notifyDone('PRESS CTRL+C TO COPY'));
    } else {
      notifyDone('PRESS CTRL+C TO COPY');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Enter your name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Enter a subject.';
    if (!formData.message.trim()) newErrors.message = 'Write a message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({
        type: 'bad',
        message: 'Fix the highlighted fields and try again.',
      });
      return;
    }

    setErrors({});
    setStatus({
      type: 'ok',
      message:
        'Your message looks complete, but nothing was sent. This demo form has no mail service connected. Copy the address above and email me directly.',
    });
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">CONTACT</div>
          <h2>Have a Project in Mind? Let's Connect.</h2>
          <p className="sub">
            I'm interested in entry-level cloud engineering, cloud support, DevOps, and backend development opportunities. Let's connect and discuss how I can contribute.
          </p>
        </div>

        <div className="contact">
          {/* Info Card */}
          <div className="panel cinfo rv">
            <div className="row">
              <span className="mono">EMAIL</span>
              <code id="mail">{emailAddress}</code>
              <button type="button" className="copy" id="copymail" onClick={handleCopyEmail}>
                {copyFeedback}
              </button>
            </div>

            <div className="row">
              <span className="mono">GITHUB</span>
              <a href="https://github.com/omdakhane772" target="_blank" rel="noopener noreferrer">
                github.com/omdakhane772
              </a>
            </div>

            <div className="row">
              <span className="mono">LINKEDIN</span>
              <a
                href="https://www.linkedin.com/in/om-jayesh-dakhane-107507444/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/om-jayesh-dakhane-107507444
              </a>
            </div>

            {/* Decorative SVG network */}
            <svg className="net" viewBox="0 0 220 220" aria-hidden="true">
              <g stroke="#38BDF8" strokeOpacity="0.4" fill="none">
                <path d="M0 40 L110 110" />
                <path d="M0 180 L110 110" />
                <path d="M220 20 L110 110" />
                <path d="M60 220 L110 110" />
                <path d="M220 160 L110 110" />
              </g>
              <circle cx="110" cy="110" r="14" fill="#38BDF8" fillOpacity="0.15" stroke="#38BDF8" />
              <circle cx="110" cy="110" r="5" fill="#fff" />
            </svg>
          </div>

          {/* Contact Form */}
          <form className="panel rv" id="cform" onSubmit={handleSubmit} noValidate>
            <div className="f">
              <label htmlFor="cn">NAME</label>
              <input
                id="cn"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby="en"
                required
              />
              <div className="err" id="en">
                {errors.name}
              </div>
            </div>

            <div className="f">
              <label htmlFor="ce">EMAIL</label>
              <input
                id="ce"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby="ee"
                required
              />
              <div className="err" id="ee">
                {errors.email}
              </div>
            </div>

            <div className="f">
              <label htmlFor="cs">SUBJECT</label>
              <input
                id="cs"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                aria-invalid={!!errors.subject}
                aria-describedby="es"
                required
              />
              <div className="err" id="es">
                {errors.subject}
              </div>
            </div>

            <div className="f">
              <label htmlFor="cm">MESSAGE</label>
              <textarea
                id="cm"
                name="message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby="em"
                required
              />
              <div className="err" id="em">
                {errors.message}
              </div>
            </div>

            <button className="btn primary" type="submit">
              SEND MESSAGE <span className="ar">↗</span>
            </button>

            <p className="fnote">
              This form is a frontend demonstration. It has no mail service connected, so nothing is sent from here.
            </p>

            {status && (
              <div className={`status ${status.type}`} role="status">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
