import { useState } from 'react';
import { profile, RESUME_URL } from '../data/content';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import './Contact.css';

const encode = (data) => new URLSearchParams(data).toString();

function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const mailtoFallback =
    `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${values.name || 'a visitor'}`)}` +
    `&body=${encodeURIComponent(`${values.message}\n\n— ${values.name}${values.email ? ` (${values.email})` : ''}`)}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', 'bot-field': form['bot-field'].value, ...values }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form contact-form--done surface" role="status">
        <span className="contact-form__done-icon" aria-hidden="true"><Icon name="check" size={26} strokeWidth={2} /></span>
        <h3>Message sent</h3>
        <p>Thanks for reaching out — I’ll reply to the email address you provided.</p>
        <Button variant="ghost" onClick={() => setStatus('idle')}>Send another message</Button>
      </div>
    );
  }

  return (
    <form className="contact-form surface" name="contact-app" method="POST" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="form-name" value="contact" />
      <p className="sr-only" aria-hidden="true">
        <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <h3 className="contact-form__title">Send a message</h3>

      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={120} value={values.name} onChange={update} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={200} value={values.email} onChange={update} />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={5} required maxLength={4000} value={values.message} onChange={update} />
      </div>

      <div className="contact-form__footer">
        <Button type="submit" disabled={status === 'sending'} aria-describedby="cf-status">
          {status === 'sending' ? (
            <><span className="spinner" aria-hidden="true" /> Sending…</>
          ) : (
            <>Send message <Icon name="send" size={17} className="icon-nudge-x" /></>
          )}
        </Button>
        <p id="cf-status" className={`contact-form__status ${status === 'error' ? 'is-error' : ''}`} role="status" aria-live="polite">
          {status === 'error' && (
            <>
              Couldn’t send right now.{' '}
              <a className="link" href={mailtoFallback}>Email me directly instead</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <>
      <button type="button" className="icon-btn glass contact__copy" onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'} title="Copy email address">
        <Icon name={copied ? 'check' : 'copy'} size={18} />
      </button>
      <span className="sr-only" role="status" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
    </>
  );
}

export function Contact() {
  const links = [
    { label: 'LinkedIn', detail: 'Mohammed Rasheen K', href: profile.linkedin, icon: 'linkedin', external: true },
    { label: 'GitHub', detail: '@rasheen404', href: profile.github, icon: 'github', external: true },
    { label: 'Résumé', detail: 'PDF download', href: RESUME_URL, icon: 'file', download: 'Mohammed_Rasheen_K_Resume.pdf' },
  ];

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__halo" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <div className="contact__kicker" data-reveal>
            <p className="chapter__index mono">
              <span>05</span>
              <span>Contact</span>
            </p>
            <p className="contact__status">
              <span className="contact__dot" aria-hidden="true" /> Open to new opportunities
            </p>
          </div>
          <h2 id="contact-title" className="contact__title" data-reveal>
            Let’s build something <span className="text-gradient">exceptional.</span>
          </h2>
          <p className="lead contact__lead" data-reveal>
            I’m interested in backend and full-stack Java roles and collaborations. Tell me about the
            system you’re building — email is the fastest way to reach me.
          </p>

          <div className="contact__primary" data-reveal>
            <Button href={`mailto:${profile.email}`} magnetic className="contact__email">
              <Icon name="mail" size={18} /> <span>{profile.email}</span>
            </Button>
            <CopyEmail />
          </div>

          <ul className="contact__links" data-reveal>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(l.download ? { download: l.download } : {})}
                >
                  <Icon name={l.icon} size={20} />
                  <span className="contact__link-label">{l.label}</span>
                  <span className="contact__link-detail">{l.detail}</span>
                  <Icon name={l.download ? 'download' : 'arrowUpRight'} size={18} className="contact__link-arrow" />
                  {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>

          <p className="contact__location" data-reveal>
            <Icon name="pin" size={16} /> {profile.location}
          </p>
        </div>

        <div data-reveal style={{ '--reveal-delay': 120 }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
