import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      {/* Header */}
      <div className="about-header">
        <svg className="back-icon" onClick={() => navigate(-1)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <h2 className="header-title">About us</h2>
        <div className="header-spacer"></div>
      </div>

      <div className="about-content">
        <p className="about-paragraph">
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>

        <p className="about-paragraph">
          <strong>Interpretation and Definitions</strong><br/>
          <strong>Interpretation</strong><br/>
          The words of which the initial letter is capitalized have meanings defined under the following conditions.
        </p>

        <p className="about-paragraph">
          <strong>Children's Privacy</strong><br/>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
        </p>

        <p className="about-paragraph">
          If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
        </p>
      </div>
    </div>
  );
};

export default About;
