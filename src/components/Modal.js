import React from 'react';

export const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg p-8">
        <h2 className="text-2xl font-edu font-semibold mb-4">{title}</h2>
        <p className="text-lg font-edu mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#db6a59] hover:bg-[#c66152] font-edu  text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
