import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface BadgeItem {
  label: string
  variant?: 'default' | 'outline'
}

interface PageHeroAction {
  label: string
  to: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
  alt?: string
  badges?: BadgeItem[]
  action?: PageHeroAction

}

export function PageHero({
  title,
  subtitle,
  description,
  image,
  alt,
  badges,
  action,
}: PageHeroProps) {

  return (
    <section className="relative flex min-h-[50vh] flex-col justify-center overflow-hidden border-b border-primary/10 py-24 sm:py-32">
      <img
        src={image}
        alt={alt ?? ''}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/80 to-background/60 lg:from-background/95 lg:via-primary/4 lg:to-background/30" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-center lg:text-left">
          {badges && badges.length > 0 && (
            <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {badges.map((badge, i) => (
                <Badge
                  key={i}
                  className={
                    badge.variant === 'outline'
                      ? 'font-sans text-xs uppercase tracking-widest'
                      : 'bg-muted/60 font-sans text-xs uppercase tracking-widest text-muted-foreground dark:bg-muted/20'
                  }
                  variant={badge.variant === 'outline' ? 'outline' : 'default'}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="font-heading text-4xl font-light uppercase tracking-wide text-foreground sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 font-sans text-base font-light leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {action && (
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="font-sans text-sm font-normal uppercase tracking-widest">
                <Link
                  href={action.to}
                >
                  {action.label}
                  <ArrowRight className="ml-2 h-4 w-4 text-secondary" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
