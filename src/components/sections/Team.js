"use client";

import Link from "next/link";

const DEFAULT_TEAM = [
  {
    name: "Dhruvil Thummar",
    role: "Co-founder & CTO",
    tagline: "Systems architect & performance engineering lead",
    image: "/founder_dhruvil.jpg",
    linkedin: "https://www.linkedin.com/in/dhruvilthummar",
    circleColor: "var(--blue)",
    order: 1,
  },
  {
    name: "Rudra Kankotiya",
    role: "Co-founder & CMO",
    tagline: "Growth director, brand strategist & client partnerships",
    image: "/founder_rudra.jpg",
    linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
    circleColor: "var(--coral)",
    order: 2,
  },
  {
    name: "Jal Anghan",
    role: "Founder & Director",
    tagline: "Corporate governance & strategic business development",
    image: "/founder_jal.jpg",
    linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
    circleColor: "var(--orange)",
    order: 3,
  },
];

export default function Team({ data }) {
  const members =
    data && data.length > 0
      ? data.map((m, idx) => ({
          ...m,
          circleColor:
            idx === 0 ? "var(--blue)" : idx === 1 ? "var(--coral)" : "var(--orange)",
        }))
      : DEFAULT_TEAM;

  return (
    <section
      id="team"
      data-theme="cream"
      className="section-gap"
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--cream)",
        color: "var(--ink)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Section Label and Heading */}
        <div
          style={{
            marginBottom: "3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span className="section-label" style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
              Team &amp; Leadership
            </span>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              The founders who build it.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Direct Access · No Middlemen
          </p>
        </div>

        {/* Full-width 3-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {members.map((member, i) => (
            <TeamCard key={member.name || i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--hairline)",
        borderRadius: "16px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 30px rgba(14,27,61,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Photo Frame with Offset Brand Circle Behind */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "340px",
          aspectRatio: "1/0.85",
          borderRadius: "12px",
          margin: "0 auto 1.5rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Offset Solid Brand Circle Behind (Blue, Coral, Orange) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "82%",
            height: "82%",
            borderRadius: "50%",
            backgroundColor: member.circleColor || "var(--blue)",
            opacity: 0.22,
            mixBlendMode: "multiply",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Real Portrait Image (grayscale to colour on hover) */}
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: `${member.imageX || 50}% ${member.imageY || 20}%`,
              borderRadius: "12px",
              filter: "grayscale(100%)",
              transition: "filter 0.35s ease, transform 0.35s ease",
              position: "relative",
              zIndex: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0%)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(100%)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ) : (
          /* Fallback Initials Monogram */
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              backgroundColor: "var(--cream)",
              border: "1px solid var(--hairline)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "3.5rem",
              color: "var(--ink)",
              zIndex: 2,
            }}
          >
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
      </div>

      {/* Founder Details */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.4rem",
          }}
        >
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "1.9rem",
              letterSpacing: "-0.015em",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {member.name}
          </h3>

          {/* Social and Profile Links */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.35rem",
            }}
          >
            {member.portfolio && (
              <a
                href={member.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} Portfolio / Website`}
                aria-label={`${member.name} Portfolio / Website`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} LinkedIn Profile`}
                aria-label={`${member.name} LinkedIn Profile`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.9 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.1 9.3h3.6v11.6H3.1V9.3Zm6 0h3.4v1.6h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.35 4.3 5.4v6.45h-3.6v-5.72c0-1.36-.02-3.12-1.92-3.12-1.92 0-2.22 1.48-2.22 3.02v5.82H9.1V9.3Z" />
                </svg>
              </a>
            )}

            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} Instagram`}
                aria-label={`${member.name} Instagram`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            )}

            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} GitHub`}
                aria-label={`${member.name} GitHub`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            )}

            {member.youtube && (
              <a
                href={member.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} YouTube Channel`}
                aria-label={`${member.name} YouTube Channel`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}

            {member.facebook && (
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} Facebook`}
                aria-label={`${member.name} Facebook`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}

            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                title={`${member.name} X / Twitter`}
                aria-label={`${member.name} X / Twitter`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}

            {(member.customLinks || []).map((cl, clIdx) => (
              <a
                key={clIdx}
                href={cl.url}
                target="_blank"
                rel="noopener noreferrer"
                title={cl.name || "Link"}
                aria-label={`${member.name} - ${cl.name || "Link"}`}
                className="team-social-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--hairline)",
                  color: "var(--blue-deep)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--blue-deep)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--cream)";
                  e.currentTarget.style.color = "var(--blue-deep)";
                }}
              >
                {cl.icon ? (
                  <i className={`${cl.icon} text-xs`}></i>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6875rem",
            color: "var(--blue-deep)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          {member.role}
        </span>

        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          {member.tagline || member.bio}
        </p>
      </div>
    </div>
  );
}
