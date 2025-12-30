# PWA Configuration Guide

## Overview

This project is configured as a Progressive Web App (PWA) using `vite-plugin-pwa` and Workbox for advanced caching strategies.

## Features

### Core PWA Features
- **Offline Support**: Full offline functionality with service worker caching
- **Installable**: Can be installed on desktop and mobile devices
- **Fast Loading**: Assets cached for instant loading
- **Auto-Updates**: Service worker automatically updates when new version is deployed
- **Background Sync**: Sync data when connection is restored (planned)
- **Push Notifications**: Ready for push notification integration (planned)

### Caching Strategies

#### 1. Cache-First Strategy
Used for static assets that rarely change:
- JavaScript bundles
- CSS files
- Fonts
- Images
- 3D models (.glb, .gltf, .obj, .fbx)

#### 2. Network-First Strategy
Used for API calls and dynamic data:
- API endpoints (`/api/*`)
- User progress data
- Fresh data with fallback to cache

#### 3. Stale-While-Revalidate
Used for user data that should be fast but updated:
- User progress
- Flashcard data
- Study session data

## File Structure

```
├── public/
│   └── manifest.json              # PWA manifest (app metadata)
├── src/
│   ├── sw.ts                      # Service worker configuration
│   └── lib/pwa/
│       ├── index.ts               # PWA manager and utilities
│       └── types.ts               # TypeScript type definitions
└── vite.config.ts                 # Vite PWA plugin configuration
```

## Usage

### 1. Register Service Worker

The service worker is automatically registered when the app starts. To manually control it:

```typescript
import { pwaManager } from '@/lib/pwa';

// Register service worker
await pwaManager.register();

// Listen for updates
pwaManager.onUpdateAvailable((event) => {
  if (confirm('New version available! Reload to update?')) {
    pwaManager.skipWaiting();
  }
});
```

### 2. Install Prompt

```typescript
import { pwaManager } from '@/lib/pwa';

// Check if app can be installed
if (pwaManager.canInstall()) {
  // Show custom install button
  const button = document.getElementById('install-button');
  button.style.display = 'block';

  // Trigger install prompt
  button.addEventListener('click', async () => {
    const accepted = await pwaManager.showInstallPrompt();
    if (accepted) {
      console.log('App installed!');
    }
  });
}
```

### 3. Online/Offline Detection

```typescript
import { pwaManager } from '@/lib/pwa';

// Check current status
const online = pwaManager.isOnline();

// Listen for online events
pwaManager.onOnline(() => {
  console.log('Back online!');
  // Sync pending data
});

// Listen for offline events
pwaManager.onOffline(() => {
  console.log('Gone offline!');
  // Show offline UI
});
```

### 4. Cache Management

```typescript
import {
  clearCaches,
  getStorageEstimate,
  requestPersistentStorage
} from '@/lib/pwa';

// Get storage usage
const estimate = await getStorageEstimate();
if (estimate) {
  console.log(`Using ${estimate.usage} of ${estimate.quota} bytes`);
  console.log(`${estimate.percentage.toFixed(2)}% full`);
}

// Request persistent storage (prevents eviction)
const persisted = await requestPersistentStorage();

// Clear all caches (for debugging or settings)
await clearCaches();
```

## Configuration

### Manifest (public/manifest.json)

The manifest defines how the app appears when installed:
- **name**: "Netter's Anatomy Learning Tool"
- **theme_color**: #2563EB (blue)
- **display**: standalone (no browser UI)
- **icons**: Multiple sizes for all devices

### Service Worker (src/sw.ts)

Custom service worker with:
- Precaching of build assets
- Runtime caching strategies
- Background sync support
- Push notification handlers (ready for implementation)

### Vite Config (vite.config.ts)

PWA plugin configuration:
- `registerType: 'prompt'` - Let user decide when to update
- `strategies: 'injectManifest'` - Custom service worker
- `devOptions.enabled: true` - Test PWA in development

## Development

### Testing PWA Features

1. **Development Mode**:
   ```bash
   npm run dev
   ```
   PWA features work in dev mode for testing.

2. **Production Build**:
   ```bash
   npm run build
   npm run preview
   ```
   Test production PWA build locally.

3. **Chrome DevTools**:
   - Open DevTools → Application tab
   - Check service worker status
   - View cached files
   - Test offline mode
   - Simulate install prompt

### Debugging

1. **Service Worker Issues**:
   - Check console for service worker logs
   - Use `chrome://serviceworker-internals/`
   - Unregister and re-register if needed

2. **Cache Issues**:
   - Clear cache in DevTools → Application → Cache Storage
   - Check Network tab for cache hits/misses

3. **Install Issues**:
   - Ensure HTTPS (or localhost)
   - Check manifest is valid
   - Verify all required fields

## Best Practices

### 1. Update Strategy
- Use `prompt` registration type for user control
- Show update notification to user
- Reload only after user confirmation

### 2. Cache Management
- Set appropriate cache expiration
- Limit cache size to prevent storage issues
- Clean up old caches on activation

### 3. Network Strategy
- Use network-first for critical data
- Use cache-first for static assets
- Implement offline fallbacks

### 4. Performance
- Precache critical assets only
- Use lazy loading for non-critical assets
- Monitor cache storage usage

## Icon Requirements

Create icons in `/public/icons/` directory:

### Required Sizes
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

### Icon Design Guidelines
- Use simple, recognizable design
- Test with maskable icon support
- Provide adequate padding for maskable icons
- Use high contrast for visibility

## Screenshots

Add screenshots to `/public/screenshots/`:
- Desktop: 1280x720 (wide format)
- Mobile: 750x1334 (narrow format)

## Future Enhancements

### Planned Features
1. **Background Sync**:
   - Sync user progress when offline
   - Queue study sessions for sync
   - Retry failed uploads

2. **Push Notifications**:
   - Study reminders
   - New content alerts
   - Achievement notifications

3. **Share Target**:
   - Share anatomy terms
   - Share study notes
   - Share progress

4. **Advanced Caching**:
   - Predictive prefetching
   - Smart cache prioritization
   - Adaptive caching based on usage

## Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)

## Troubleshooting

### Common Issues

1. **Service Worker Not Registering**:
   - Check HTTPS/localhost requirement
   - Verify service worker file path
   - Check browser console for errors

2. **Install Prompt Not Showing**:
   - Ensure manifest is valid
   - Check installability criteria
   - May need user interaction first

3. **Caches Not Working**:
   - Verify cache names match
   - Check storage quota
   - Ensure proper cache strategies

4. **Updates Not Applying**:
   - Check `skipWaiting` implementation
   - Verify update detection logic
   - May need to close all tabs

### Getting Help

- Check browser console for errors
- Review service worker logs
- Use Chrome DevTools Lighthouse audit
- Test on multiple devices/browsers
