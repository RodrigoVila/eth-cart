import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }

export const Button = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button {...rest} className={`group rounded-lg p-2 hover:bg-white transition-all duration-300 border-2 border-white ${className}`}>
            <span className='group-hover:text-slate-900'>{children}</span>
        </button>
    )
}
