import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyle = 'rounded-lg transition-all font-medium';
  const variantStyle =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
      : 'bg-green-600 text-white hover:bg-green-700';

  const sizeStyle =
    size === 'icon'
      ? 'w-10 h-10 flex items-center justify-center'
      : 'px-4 py-2';

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
