interface PageHeroProps {
  title: string
  description?: string
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  )
}
