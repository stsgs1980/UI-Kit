'use client'

import * as React from 'react'
import { cn } from '../../tokens/cn'

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar?: string
}

export interface TestimonialsSectionProps extends React.HTMLAttributes<HTMLElement> {
  testimonials: Testimonial[]
  title?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const TestimonialsSection = React.forwardRef<HTMLElement, TestimonialsSectionProps>(
  ({ testimonials, title = 'What our customers say', className, ...props }, ref) => {
    if (!testimonials.length) return null

    return (
      <section
        ref={ref}
        data-slot="testimonials-section"
        className={cn('py-16 md:py-24', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>

          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col rounded-xl border p-6"
              >
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="my-4 border-t" />

                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
                      aria-hidden
                    >
                      {getInitials(testimonial.name)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
)
TestimonialsSection.displayName = 'TestimonialsSection'

export { TestimonialsSection }
