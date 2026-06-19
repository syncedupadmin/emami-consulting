'use client'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <circle cx="17" cy="17" r="16" stroke="#B6883F" strokeWidth="1" />
              <circle cx="9" cy="22" r="2.4" fill="#CDA251" />
              <circle cx="25" cy="12" r="2.4" fill="#2F8E7E" />
              <path d="M9 22 L17 17 L25 12" stroke="#B6883F" strokeWidth="1.1" />
              <path d="M17 17 L17 9" stroke="#B6883F" strokeWidth="1.1" />
              <circle cx="17" cy="9" r="2" fill="#CDA251" />
            </svg>
            <div>
              <div className="ft-name">Emami Consulting</div>
              <div className="ft-sub">Dental Technology Advisory</div>
            </div>
          </div>

          <div className="ft-links-grid">
            <div className="ft-col">
              <div className="ft-col-head">Engage</div>
              <a href="/intake">Start Blueprint Sprint</a>
              <a href="mailto:nick@syncedupsolutions.com">Talk to Dr. Emami</a>
              <a href="#journey">How It Works</a>
            </div>
            <div className="ft-col">
              <div className="ft-col-head">About</div>
              <a href="#expert">Dr. Justin Emami, DDS</a>
              <a href="#offer">Blueprint Sprint</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="ft-col">
              <div className="ft-col-head">Contact</div>
              <a href="mailto:nick@syncedupsolutions.com">nick@syncedupsolutions.com</a>
              <span style={{ color: 'var(--bone-faint)', fontSize: 12.5 }}>Engagements by application</span>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">
            &copy; {new Date().getFullYear()} Emami Consulting. All rights reserved.
          </div>
          <div className="ft-disclaimer">
            This platform is a technology advisory service. All recommendations are for informational purposes. Emami Consulting has no financial affiliation with any dental equipment manufacturer or distributor.
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer { background: var(--ink-2); color: var(--bone-dim); border-top: 1px solid var(--line-d); padding: 64px 0 36px; }
        .ft-top { display: flex; justify-content: space-between; gap: 40px; margin-bottom: 56px; }
        .ft-brand { display: flex; align-items: center; gap: 14px; }
        .ft-name { font-family: var(--display); font-size: 18px; color: var(--bone); font-weight: 400; }
        .ft-sub { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--bone-faint); margin-top: 5px; }
        .ft-links-grid { display: flex; gap: 48px; }
        .ft-col { display: flex; flex-direction: column; gap: 12px; }
        .ft-col-head { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--bone-faint); margin-bottom: 4px; }
        .ft-col a { font-size: 13.5px; color: var(--bone-dim); transition: color 0.22s; }
        .ft-col a:hover { color: var(--brass-bright); }
        .ft-bottom { border-top: 1px solid var(--line-d); padding-top: 28px; display: flex; gap: 22px; flex-direction: column; }
        .ft-copy { font-size: 12.5px; color: var(--bone-faint); }
        .ft-disclaimer { font-size: 11.5px; color: var(--bone-faint); opacity: 0.6; line-height: 1.65; max-width: 780px; }
        @media (max-width: 860px) { .ft-top { flex-direction: column; } .ft-links-grid { flex-wrap: wrap; gap: 30px; } }
      `}</style>
    </footer>
  )
}
