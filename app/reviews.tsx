import { Quote } from 'lucide-react';

// Client testimonials supplied and confirmed by Jaysub.
const reviews = [
  {
    service: 'Business analysis',
    quote: 'We came to Jaysub with a long list of features we thought we needed. They spent time with our team, mapped how we actually work, and helped us focus on the few things that mattered. That clarity saved us months and a lot of money.',
    name: 'Toheeb Olayemi', role: 'Founder, Intrapair', initials: 'TO',
  },
  {
    service: 'Web & mobile solutions',
    quote: 'From the first workshop to launch, we always knew where the project stood. Jaysub’s weekly updates were clear and honest, and the app they built is something our customers use every day.',
    name: 'Tobiloba Kolawole', role: 'Co-founder of Stitchvine', initials: 'TK',
  },
  {
    service: 'IT consulting',
    quote: 'Jaysub treated our goals like their own. They gave us a practical technology plan our whole team could understand and get behind, not just a pile of recommendations.',
    name: 'Tayo Adekanmbi', role: 'CEO, KeepUp', initials: 'TA',
  },
];

export default function Reviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="reviews-heading">
          <div><span className="eyebrow">CLIENT PERSPECTIVES</span><h2 id="reviews-title">Good work.<br />Shared experiences.</h2></div>
          <p>Clarity, collaboration and thoughtful delivery.<br />Hear from the people we’ve worked with.</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <figure className="review-card" key={review.service}>
              <div className="review-top"><Quote size={28} aria-hidden="true" /><span>{review.service}</span></div>
              <blockquote><p>“{review.quote}”</p></blockquote>
              <figcaption><span className="review-avatar" aria-hidden="true">{review.initials}</span><div><strong>{review.name}</strong><span>{review.role}</span></div></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
