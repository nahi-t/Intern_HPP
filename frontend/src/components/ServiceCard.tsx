'use client';

import React from 'react';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onClick?: (service: Service) => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, className = '' }) => {
  const { image, title, description } = service;

  const imageSrc = image ||undefined;

  const handleClick = () => {
    if (onClick) onClick(service);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: '1px solid #eaeaea',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      className={className}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Unavailable';
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            margin: '0 0 8px 0',
            lineHeight: 1.3,
            color: '#111',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: 1.6,
            margin: '0 0 16px 0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flexGrow: 1,
          }}
        >
          {description || 'No description available.'}
        </p>
        {onClick && (
          <button
            style={{
              alignSelf: 'flex-start',
              padding: '8px 20px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
          >
            Learn More →
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
