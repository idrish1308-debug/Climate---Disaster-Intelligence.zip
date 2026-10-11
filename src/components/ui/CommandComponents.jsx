import React from 'react';

/**
 * Core panel/card component aligned to the index.css design system
 */
export function Card({
  children,
  className = '',
  variant = 'default', // 'default' | 'critical' | 'high' | 'cyan' | 'green' | 'amber'
  hoverable = false,
  onClick,
  ...props
}) {
  const variantClass = {
    default:  'panel',
    critical: 'panel panel-critical',
    high:     'panel panel-high',
    cyan:     'panel panel-cyan',
    green:    'panel panel-green',
    amber:    'panel border border-amber-500/25 shadow-[0_0_20px_-4px_rgba(234,179,8,0.15),0_4px_24px_-2px_rgba(0,0,0,0.4)]',
  };

  return (
    <div
      className={`
        ${variantClass[variant] || 'panel'}
        ${hoverable ? 'panel-hoverable cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Status/severity badge using index.css badge classes
 */
export function Badge({
  children,
  variant = 'cyan',
  size = 'md',
  pulse = false,
  className = '',
}) {
  const variantClass = {
    cyan:     'badge-cyan',
    red:      'badge-critical',
    critical: 'badge-critical',
    amber:    'badge-moderate',
    moderate: 'badge-moderate',
    high:     'badge-high',
    green:    'badge-safe',
    safe:     'badge-safe',
    violet:   'badge-violet',
    neutral:  'badge-neutral',
  };

  const sizeClass = size === 'sm'
    ? 'text-[10px] px-2 py-0.5'
    : 'text-[11px] px-2.5 py-1';

  return (
    <span className={`badge ${variantClass[variant] || 'badge-cyan'} ${sizeClass} ${className}`}>
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
      )}
      {children}
    </span>
  );
}

/**
 * Command-center grade action button using index.css btn classes
 */
export function Button({
  children,
  variant = 'ghost', // 'danger' | 'cyan' | 'ghost' | 'outline-cyan'
  className = '',
  icon: Icon,
  size = 'md',
  type = 'button',
  disabled = false,
  ...props
}) {
  const variantClass = {
    primary:      'btn btn-danger',
    danger:       'btn btn-danger',
    cyan:         'btn btn-cyan',
    ghost:        'btn btn-ghost',
    'outline-cyan': 'btn btn-outline-cyan',
  };

  const sizeClass = size === 'sm'
    ? 'h-8 px-3 text-xs gap-1.5'
    : size === 'lg'
    ? 'h-11 px-5 text-sm'
    : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${variantClass[variant] || 'btn btn-ghost'} ${sizeClass} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
