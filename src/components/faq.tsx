"use client";

import { useEffect } from 'react';

export function Faq() {
  useEffect(() => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    const handleClick = (event) => {
      const item = event.currentTarget.closest('.accordion-item');
      if (!item) return;

      const currentlyActive = document.querySelector('.accordion-item.active');

      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('active');
      }

      item.classList.toggle('active');
    };

    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', handleClick);
      }
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
          header.removeEventListener('click', handleClick);
        }
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .faq-section {
            --brand-blue: #5d99f7;
            --dark-bg: #000000;
            --light-text: #8b949e;
            --white-text: #f0f6fc;
            --border-color: #4a5568;
            --icon-bg: #374151;

            width: 100%;
            background-color: var(--dark-bg);
            color: var(--white-text);
            padding: 80px 20px;
            position: relative;
        }

        .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }

        .faq-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .faq-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: var(--light-text);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 24px;
        }

        .faq-link .dot {
            width: 8px;
            height: 8px;
            background-color: var(--brand-blue);
            border-radius: 50%;
        }

        .faq-header h2 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            line-height: 1.1;
            margin: 0 0 24px 0;
            color: var(--white-text);
        }

        .faq-header p {
            font-size: 18px;
            color: var(--light-text);
            max-width: 550px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .accordion-item {
            border-bottom: 1px solid var(--border-color);
        }
        .accordion-item:first-child {
            border-top: 1px solid var(--border-color);
        }

        .accordion-header {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 32px 0;
            cursor: pointer;
            background: none;
            border: none;
            text-align: left;
            gap: 24px;
        }

        .item-number {
            font-size: 16px;
            color: var(--light-text);
            font-weight: 500;
        }

        .item-question {
            flex-grow: 1;
            font-size: 22px;
            color: var(--white-text);
            font-weight: 500;
            margin: 0;
            transition: color 0.3s ease;
        }
        
        .accordion-header:hover .item-question {
            color: var(--brand-blue);
        }

        .item-icon {
            flex-shrink: 0;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--icon-bg);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease-in-out;
        }
        
        .item-icon::before,
        .item-icon::after {
            content: '';
            position: absolute;
            background-color: #ffffff;
            transition: transform 0.3s ease-in-out;
        }
        .item-icon::before {
            width: 14px;
            height: 2px;
        }
        .item-icon::after {
            width: 2px;
            height: 14px;
        }

        .accordion-content {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.4s ease-out, opacity 0.3s ease-in-out, padding 0.4s ease-out;
            padding-left: 50px;
        }
        
        .accordion-content p {
            margin: 0;
            padding-bottom: 32px;
            color: var(--light-text);
            font-size: 16px;
            line-height: 1.7;
            max-width: 650px;
        }
        
        .accordion-item.active .item-icon {
            transform: rotate(225deg);
        }
        
        .accordion-item.active .accordion-content {
            max-height: 250px;
            opacity: 1;
        }
      `}</style>
      <section className="faq-section">
        <div className="container">
            <div className="faq-header">
                <a href="#" className="faq-link">
                    <span className="dot"></span>
                    FAQ
                </a>
                <h2>Frequently<br />Asked Questions</h2>
                <p>
                    Answers to common questions about our services, from installation and brand partnerships to our maintenance contracts.
                </p>
            </div>

            <div className="faq-accordion">
                <div className="accordion-item">
                    <button className="accordion-header">
                        <span className="item-number">01</span>
                        <h3 className="item-question">What brands of AC units do you work with?</h3>
                        <div className="item-icon"></div>
                    </button>
                    <div className="accordion-content">
                        <p>We have proudly carried the GREE brand since 2012 and are official partners, allowing us to offer world-class equipment at unbeatable prices. However, our experienced team is fully equipped to supply, install, and service all other popular HVAC brands as specified by our clients.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button className="accordion-header">
                        <span className="item-number">02</span>
                        <h3 className="item-question">What are your maintenance options?</h3>
                        <div className="item-icon"></div>
                    </button>
                    <div className="accordion-content">
                        <p>We offer two maintenance programs. The 'Pay As You Go' option is for on-demand routine service. For complete peace of mind, we offer an 'Annual Service Contract' where we take full responsibility for servicing your units every three months for a full year.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button className="accordion-header">
                        <span className="item-number">03</span>
                        <h3 className="item-question">What happens if a fault is found during maintenance?</h3>
                        <div className="item-icon"></div>
                    </button>
                    <div className="accordion-content">
                        <p>In either maintenance program, if a unit is found to be faulty, we will immediately notify you and provide a detailed repair estimate. All repair work commences only after we receive your explicit approval, ensuring full transparency and control.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button className="accordion-header">
                        <span className="item-number">04</span>
                        <h3 className="item-question">Do you handle both residential and large commercial projects?</h3>
                        <div className="item-icon"></div>
                    </button>
                    <div className="accordion-content">
                        <p>Yes. With 13 years of practice, we have evolved to serve both residential and commercial clients. Our portfolio includes everything from residential homes to large-scale projects for hospitals, universities, event centers, and industrial facilities like cement plants.</p>
                    </div>
                </div>
                
                <div className="accordion-item">
                    <button className="accordion-header">
                        <span className="item-number">05</span>
                        <h3 className="item-question">Where are you located and what areas do you serve?</h3>
                        <div className="item-icon"></div>
                    </button>
                    <div className="accordion-content">
                        <p>Our office is located at 35 Aladelola Street, Ikosi, Ketu, Lagos. We provide reliable services nationwide and have a proven track record of successfully delivering major projects in Abuja, Port Harcourt, Gombe, Edo, Ondo, Benue, Abeokuta, Osun, and Ekiti.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}