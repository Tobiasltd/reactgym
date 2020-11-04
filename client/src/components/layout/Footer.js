import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="container">
          <div className="grid-4 text-muted footer  my-3">
            <ul>
              <li className="text-black bold">About</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Education</li>
              <li>Pilates Teacher Training</li>
              <li>Core Values</li>
              <li>Gift Card</li>
              <li>Contact Us</li>
            </ul>
            <ul>
              <li className="text-black bold">Workouts</li>
              <li>HIIT</li>
              <li>Fit Boxing</li>
              <li>Bikram Yoga</li>
              <li>Goat Yoga</li>
              <li>Bootcamps</li>
              <li>Squat Squad</li>
            </ul>
            <ul>
              <li className="text-black bold">Styles</li>
              <li>Calisthenics</li>
              <li>Powerlifting</li>
              <li>Bodybuilding</li>
              <li>Strongman</li>
              <li>Stretchmasters</li>
            </ul>
            <div className="text-black bold">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-right">
        <div className="container footerbottom">
          <span>Send Feedback</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>FAQs</span>
          <span>Sitemap</span>
        </div>
      </div>
      <div className="bg-black my-2"></div>
    </div>
  );
};

export default Footer;
