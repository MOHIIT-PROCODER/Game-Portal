import React from "react";
import { Link } from "react-router-dom";

export function SectionHeader({ title, linkTo, linkLabel = "See All" }) {
  return (
    <div className="section-header-container">
      <h2 className="section-title">{title}</h2>
      {linkTo && (
        <Link to={linkTo} className="section-link">
          {linkLabel} &rarr;
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
