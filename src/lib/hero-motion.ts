export type HeroNavTheme = 'light' | 'dark'

export function getHeroNavTheme(progress: number): HeroNavTheme {
  return progress >= .62 ? 'dark' : 'light'
}
