import Link from 'next/link'

export default function NotFound() { return <main className="not-found" data-nav-theme="dark"><span>404 / Wrong turn</span><h1 className="display display--xl">The signal ends <span className="authority">here.</span></h1><p>The page may have moved, but the route back to clarity is simple.</p><Link className="button button--paper" href="/"><span>Return home</span><span aria-hidden="true">↗</span></Link></main> }
