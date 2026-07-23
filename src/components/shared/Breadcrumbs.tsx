import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zaserandco.com' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://zaserandco.com${item.href}` } : {}),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          color: '#6B3828',
          marginBottom: '24px',
        }}
      >
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
          <li>
            <Link href="/" style={{ color: 'rgba(107,56,40,0.6)', textDecoration: 'none' }}>Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: 'rgba(107,56,40,0.3)' }}>/</span>
              {item.href ? (
                <Link href={item.href} style={{ color: 'rgba(107,56,40,0.6)', textDecoration: 'none' }}>{item.label}</Link>
              ) : (
                <span style={{ color: '#6B3828' }}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
