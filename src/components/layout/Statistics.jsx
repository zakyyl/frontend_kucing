import React from "react";
import "../../styles/statistics.css"; 


const Statistics = () => {
  return (
    <div className="statistics">
      <div className="stat-item">
        <span className="stat-number">2k+</span>
        <span className="stat-label">Doctors</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">5k+</span>
        <span className="stat-label">Pets</span>
      </div>
      <div className="stat-reviews">
        <span>⭐ 4.8 (1.5k Reviews)</span>
        <div className="review-profiles">
          {/* Tambahkan avatar/ikon di sini */}
          <span>+3k</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
