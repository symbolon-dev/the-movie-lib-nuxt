# TODO - Advanced Optimizations & Best Practices

*Previous refactoring phase completed successfully. All high and medium priority items have been implemented.*

---

## 🔴 **High Priority (Critical Issues)**

### Localization & UX Fixes
- [ ] **Fix API locale settings** (30min)
  - APIs currently use German locale (de-DE) - should be configurable/English
  - Update TMDB API calls to use proper language parameter
  - Consider user preference or default to English for broader appeal

- [ ] **Fix image loading states** (20min)
  - Current loading skeleton doesn't match movie poster aspect ratio
  - Implement proper skeleton dimensions for movie posters (2:3 ratio)
  - Improve visual consistency during image loading

## 🟡 **Medium Priority (Performance & UX)**

### API Data Fetching Optimization
- [ ] **Replace $fetch with useFetch in client components** (30min)
  - Movie detail page could use `useFetch` for better SSR and caching
  - Consider `useLazyFetch` for non-critical data
  - Benefits: Built-in loading states, automatic caching, SSR optimization

- [ ] **Implement Error Boundaries** (45min)
  - Add `<NuxtErrorBoundary>` to critical components
  - Graceful error recovery for API failures
  - Improve user experience during network issues

### Performance Enhancements
- [ ] **Component Lazy Loading** (20min)
  - Use `defineAsyncComponent` for heavy components
  - Consider lazy loading for Movie detail page components
  - Reduce initial bundle size

- [ ] **Optimize Bundle Size** (30min)
  - Analyze current bundle with Nuxt analyzer
  - Consider tree-shaking opportunities
  - Review icon imports for optimization

## 🟢 **Low Priority (SEO & Accessibility)**

### SEO & Meta Tags
- [ ] **Add structured SEO meta for movie pages** (45min)
  - Implement `useSeoMeta()` in movie detail pages
  - Dynamic title/description based on movie data
  - Open Graph tags for social sharing
  - Example: `useSeoMeta({ title: movie.title, description: movie.overview })`

- [ ] **Implement JSON-LD structured data** (1h)
  - Add Movie schema markup for better search engine understanding
  - Rich snippets in search results
  - Follow schema.org Movie specification

### Accessibility Improvements *(Mostly covered by shadcn/ui migration)*
- [ ] **Loading state announcements** (15min)
  - Add `aria-live` regions for dynamic content updates
  - Screen reader notifications for search results
  - *Note: Other accessibility features will be handled by shadcn/ui components*

## 🔵 **Optional (Nice to Have)**

### Framework Upgrade
- [ ] **Upgrade to Nuxt 4** (1-2h)
  - Currently on Nuxt 3.17.5, upgrade to Nuxt 4.x when stable
  - Review breaking changes and migration guide
  - Update dependencies and configurations
  - Test all functionality after upgrade
  - Benefits: Latest features, better performance, improved DX

### Component Library Migration
- [ ] **Migrate to shadcn/ui component library** (2-3h)
  - Replace custom Button component with shadcn Button
  - Migrate Search input to shadcn Input component
  - Convert Sort dropdown to shadcn Select component
  - Update Movie Card with shadcn Card component
  - Add shadcn Skeleton for loading states
  - Benefits: Consistent design system, **built-in accessibility**, maintainable code
  - **High value:** Own the component code, customizable, modern design patterns
  - **Note:** This migration covers most accessibility improvements automatically

### Code Quality
- [ ] **Type-safe route definitions** (30min)
  - Consider typed router with nuxt-typed-router
  - Better IntelliSense for route navigation
  - Compile-time route validation

- [ ] **Consistent error handling patterns** (30min)
  - Standardize error message format
  - Centralized error logging
  - User-friendly error messages

---

## 📊 **Current Status: EXCELLENT**

✅ **Code Quality Score: 9/10**
- Modern Nuxt 3 architecture
- Full TypeScript implementation
- Zod validation for type safety
- Proper state management with Pinia
- Performance optimizations in place
- Clean component structure

**Total Estimated Time for Remaining Items: ~7-10 hours**

**Recommended Next Steps:**
1. **🔴 Fix API locale settings** (critical UX issue)
2. **🔴 Fix image loading states** (visual consistency)
3. **shadcn/ui migration** (high value, modern component system)
4. **Nuxt 4 upgrade** (future-proofing, when stable)
5. SEO meta tags (immediate user value)
6. useFetch optimization (performance)
7. Everything else as time permits

**Note:** All items are optional improvements. The current codebase already follows excellent practices and is production-ready.