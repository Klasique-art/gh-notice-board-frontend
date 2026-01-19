import React from 'react';
import Link from 'next/link';

// Base props common to both button and link variants
interface BaseProps {
    title?: string;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

// Props when rendering as a Link
interface LinkProps extends BaseProps {
    url: string;
    type?: never;
}

// Props when rendering as a button
interface ButtonProps extends BaseProps {
    url?: never;
    type?: 'button' | 'submit' | 'reset';
}

// Union type that allows for additional HTML attributes
type AppButtonProps = (LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) |
    (ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>);

const AppButton = ({
    url,
    title = "Button",
    onClick,
    type = "button",
    className = "",
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    ...props
}: AppButtonProps) => {
    // Variant styles - Ghana Notice Board colors
    const variantClasses = {
        primary: `
            bg-gradient-to-r from-primary to-primary-100
            text-white
            hover:from-primary-100 hover:to-primary
            focus:ring-primary
            shadow-md hover:shadow-lg
            disabled:from-slate-300 disabled:to-slate-400
        `,
        secondary: `
            bg-gradient-to-r from-secondary to-secondary/80
            text-primary
            hover:from-secondary/90 hover:to-secondary
            focus:ring-secondary
            shadow-md hover:shadow-lg
            disabled:bg-slate-50 disabled:text-slate-400
        `,
        outline: `
            bg-transparent
            text-primary
            border-2 border-primary
            hover:bg-primary hover:text-white
            focus:ring-primary
            disabled:border-slate-300 disabled:text-slate-400
        `,
        ghost: `
            bg-transparent
            text-slate-700
            hover:bg-slate-100 hover:text-primary
            focus:ring-primary
            disabled:text-slate-400
        `,
        danger: `
            bg-gradient-to-r from-accent to-accent-100
            text-white
            hover:from-accent-100 hover:to-accent
            focus:ring-accent
            shadow-md hover:shadow-lg
            disabled:from-slate-300 disabled:to-slate-400
        `,
    };

    // Size styles
    const sizeClasses = {
        sm: 'px-4 py-2 normal-text-2 min-h-[36px]',
        md: 'px-6 py-2.5 normal-text min-h-[44px]',
        lg: 'px-8 py-3.5 big-text-5 min-h-[52px]',
    };

    // Base classes
    const baseClasses = `
        relative
        inline-flex
        justify-center
        items-center
        gap-2
        ${fullWidth ? 'w-full' : 'w-max'}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-semibold
        rounded-xl
        whitespace-nowrap
        transition-all duration-300 ease-out
        cursor-pointer
        select-none
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:shadow-none
        active:scale-[0.98]
        ${loading ? 'pointer-events-none' : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    // Content with loading state and icon
    const content = (
        <>
            {loading && (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {!loading && icon && iconPosition === 'left' && (
                <span className="shrink-0">{icon}</span>
            )}
            <span>{title}</span>
            {!loading && icon && iconPosition === 'right' && (
                <span className="shrink-0">{icon}</span>
            )}
        </>
    );

    // Render as Link when url is provided
    if (url) {
        return (
            <Link
                href={url}
                className={baseClasses}
                onClick={onClick}
                role="button"
                tabIndex={0}
                aria-label={title}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </Link>
        );
    }

    // Render as button when no url is provided
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button
            className={baseClasses}
            onClick={onClick}
            type={type}
            disabled={loading || buttonProps.disabled}
            aria-label={title}
            aria-busy={loading}
            {...buttonProps}
        >
            {content}
        </button>
    );
};

export default AppButton;