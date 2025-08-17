import React from 'react';

const CustomCard = ({ children, onBookmark, isBookmarked, customClass = '' }) => {
  return (
    <div className={`card bg-dark-custom border-purple shadow-sm h-100 position-relative ${customClass}`}>
      {onBookmark && (
        <i
          className={`bi ${isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'} text-purple fs-4 position-absolute`}
          style={{ top: "12px", right: "12px", cursor: "pointer" }}
          title={isBookmarked ? "Bookmarked" : "Bookmark"}
          onClick={onBookmark}
        ></i>
      )}

      <div className="card-body d-flex flex-column pt-4">
        {children}
      </div>
    </div>
  );
};

export default CustomCard;
