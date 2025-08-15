"use client";

export default function MissionStatement() {
  // Define contact details here for cleaner JSX
  const address = "35 Aladelola Street, Ikosi, Ketu, LAGOS";
  // URL-encode the address for the Google Maps link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <>
      <style jsx>{`
        .mission-section {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #f8f9fa;
          color: #212529;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 4rem 1rem;
          box-sizing: border-box;
        }
        .main-container {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #212529;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 24px;
          align-self: flex-start;
        }
        .section-link .dot {
          width: 8px;
          height: 8px;
          background-color: #5d99f7;
          border-radius: 50%;
        }
        .main-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #212529;
          text-align: center;
          line-height: 1.1;
          margin: 0 0 24px 0;
        }
        .subtitle {
          font-size: 18px;
          color: #6c757d;
          text-align: center;
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 48px;
        }
        .content-container {
          background-color: white;
          border: 1px solid #e9ecef;
          width: 100%;
          padding: 2.5rem;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 1024px) {
          .content-container {
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
          }
        }
        .content-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 1rem 0;
            color: #212529;
        }
        .mission-quote {
            margin: 0;
            border-left: 4px solid #5d99f7;
            padding-left: 1.5rem;
            font-size: 1.1rem;
            font-style: italic;
            line-height: 1.6;
            color: #6c757d;
        }
        .contact-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        .contact-item .icon {
            flex-shrink: 0;
            margin-top: 4px;
            stroke: #5d99f7;
            width: 24px;
            height: 24px;
        }
        .contact-item h4 {
            margin: 0 0 4px 0;
            font-weight: 600;
            font-size: 16px;
        }
        /* UPDATED: General styling for all links in the contact item */
        .contact-item a {
            margin: 0;
            color: #6c757d;
            line-height: 1.5;
            text-decoration: none;
            font-size: 15px;
            transition: color 0.2s ease;
        }
        .contact-item a:hover {
            color: #5d99f7;
            text-decoration: underline;
        }
      `}</style>

      <section id="about" className="mission-section">
        <main className="main-container">
            <a href="#about" className="section-link">
                <span className="dot"></span>
                WHO WE ARE
            </a>
            <h1 className="main-title">Our Commitment to You</h1>
            <p className="subtitle">
                We are dedicated to providing exceptional service grounded in a clear mission and open communication. Here's how to connect with us.
            </p>

            <div className="content-container">
                <div>
                    <h2 className="content-title">Our Mission</h2>
                    <blockquote className="mission-quote">
                        Delivering affordable air conditioning solutions for both residential and commercial spaces, employing top-tier systems and adhering strictly to industry standards to establish a comfortable living and working environment.
                    </blockquote>
                </div>
                <div>
                    <h2 className="content-title">Contact Us</h2>
                    <div className="contact-details">
                        <div className="contact-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <div>
                                <h4>Office Address</h4>
                                {/* UPDATED: Address is now a link to Google Maps */}
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                  {address}
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <div>
                                <h4>Phone</h4>
                                {/* UPDATED: Each phone number is now a clickable "tel:" link */}
                                <a href="tel:+2349090904363">234 909 090 4363</a>
                                <br/>
                                <a href="tel:+2348162038620">234 816 203 8620</a>
                            </div>
                        </div>
                         <div className="contact-item">
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:alpinetechhvac@gmail.com">alpinetechhvac@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
      </section>
    </>
  );
}