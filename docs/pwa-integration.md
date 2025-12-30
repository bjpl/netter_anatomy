# PWA Integration Guide

## Quick Start

The PWA configuration is complete. To integrate it into your app:

### 1. Add PWA Components to App.tsx

```tsx
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';

function App() {
  return (
    <>
      {/* Your existing app content */}
      <YourAppContent />

      {/* PWA components */}
      <PWAUpdatePrompt />
      <OfflineIndicator />
    </>
  );
}
```

### 2. Add Manifest Link to index.html

Make sure your `index.html` includes:

```html
<head>
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />

  <!-- Theme color -->
  <meta name="theme-color" content="#2563EB" />

  <!-- Apple touch icon -->
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

  <!-- iOS meta tags for PWA -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="Anatomy" />
</head>
```

### 3. Create App Icons

Generate icons and place them in `/public/icons/`:

**Required sizes:**
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

**Quick way to generate icons:**
```bash
# Install sharp-cli globally
npm install -g sharp-cli

# Generate all sizes from a source image
sharp -i source-icon.png -o public/icons/icon-72x72.png resize 72 72
sharp -i source-icon.png -o public/icons/icon-96x96.png resize 96 96
sharp -i source-icon.png -o public/icons/icon-128x128.png resize 128 128
sharp -i source-icon.png -o public/icons/icon-144x144.png resize 144 144
sharp -i source-icon.png -o public/icons/icon-152x152.png resize 152 152
sharp -i source-icon.png -o public/icons/icon-192x192.png resize 192 192
sharp -i source-icon.png -o public/icons/icon-384x384.png resize 384 384
sharp -i source-icon.png -o public/icons/icon-512x512.png resize 512 512
```

### 4. Test PWA Features

#### Development
```bash
npm run dev
```

PWA features work in development mode with DevTools.

#### Production Build
```bash
npm run build
npm run preview
```

#### Test Checklist

1. **Service Worker**:
   - Open DevTools → Application → Service Workers
   - Verify service worker is registered and active

2. **Offline Mode**:
   - Disable network in DevTools
   - Refresh page - should load from cache
   - Navigate between pages - should work offline

3. **Install Prompt**:
   - Visit site (HTTPS or localhost)
   - Wait 3 seconds for install banner
   - Click "Install" to test installation

4. **Update Prompt**:
   - Make code change and rebuild
   - Reload page with old version running
   - Should see update prompt

5. **Caching**:
   - Check Application → Cache Storage
   - Verify assets are cached
   - Check Network tab for cache hits (from ServiceWorker)

## Advanced Usage

### Custom Install Button

```tsx
import { usePWA } from '@/hooks/usePWA';
import { Download } from 'lucide-react';

function CustomInstallButton() {
  const { canInstall, installApp } = usePWA();

  if (!canInstall) return null;

  return (
    <button onClick={installApp}>
      <Download className="h-4 w-4" />
      Install App
    </button>
  );
}
```

### Storage Management

```tsx
import { usePWA } from '@/hooks/usePWA';

function StorageSettings() {
  const {
    storageEstimate,
    refreshStorageEstimate,
    clearAllCaches
  } = usePWA();

  return (
    <div>
      {storageEstimate && (
        <div>
          <p>Storage Used: {(storageEstimate.usage / 1024 / 1024).toFixed(2)} MB</p>
          <p>Storage Quota: {(storageEstimate.quota / 1024 / 1024).toFixed(2)} MB</p>
          <p>Usage: {storageEstimate.percentage.toFixed(2)}%</p>
        </div>
      )}

      <button onClick={clearAllCaches}>
        Clear All Caches
      </button>

      <button onClick={refreshStorageEstimate}>
        Refresh Storage Info
      </button>
    </div>
  );
}
```

### Online/Offline Handling

```tsx
import { usePWA } from '@/hooks/usePWA';

function SyncButton() {
  const { isOnline } = usePWA();

  const syncData = async () => {
    if (!isOnline) {
      alert('Cannot sync while offline');
      return;
    }

    // Perform sync
    await fetch('/api/sync', { method: 'POST' });
  };

  return (
    <button onClick={syncData} disabled={!isOnline}>
      {isOnline ? 'Sync Now' : 'Offline - Cannot Sync'}
    </button>
  );
}
```

## Deployment Checklist

### Before Deploying

- [ ] Generate all required icon sizes
- [ ] Add screenshots to `/public/screenshots/`
- [ ] Update manifest.json with correct URLs
- [ ] Test on multiple devices/browsers
- [ ] Verify HTTPS is enabled
- [ ] Test install flow on iOS and Android
- [ ] Test offline functionality
- [ ] Verify caching strategies work correctly

### After Deploying

- [ ] Test on production URL
- [ ] Verify service worker registers
- [ ] Check Lighthouse PWA score (aim for 100)
- [ ] Test install on various devices
- [ ] Monitor service worker errors in analytics

## Troubleshooting

### Service Worker Not Updating

1. **Clear old service workers**:
   - DevTools → Application → Service Workers
   - Click "Unregister" for old versions

2. **Force update**:
   ```typescript
   // In browser console
   navigator.serviceWorker.getRegistrations().then(function(registrations) {
     for(let registration of registrations) {
       registration.unregister();
     }
   });
   ```

3. **Hard refresh**:
   - Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Check "Update on reload" in DevTools

### Install Prompt Not Showing

1. **Check criteria**:
   - Must be HTTPS (or localhost)
   - Must have valid manifest
   - Must have service worker
   - Must have icons in manifest
   - User hasn't dismissed prompt 3 times

2. **Test manually**:
   ```typescript
   // In browser console
   window.dispatchEvent(new Event('beforeinstallprompt'));
   ```

### Caching Issues

1. **Clear all caches**:
   ```typescript
   caches.keys().then(keys => {
     keys.forEach(key => caches.delete(key));
   });
   ```

2. **Check cache strategy**:
   - Review `src/sw.ts` for correct patterns
   - Verify URLs match cache patterns

## Browser Support

### Desktop
- ✅ Chrome 73+ (Full support)
- ✅ Edge 79+ (Full support)
- ⚠️ Safari 15.4+ (Partial - no install prompt)
- ⚠️ Firefox 95+ (Partial - no install prompt)

### Mobile
- ✅ Chrome Android (Full support)
- ✅ Samsung Internet (Full support)
- ⚠️ Safari iOS 15.4+ (Add to Home Screen instead)
- ⚠️ Firefox Android (Service worker only)

## Performance Metrics

Target scores (Lighthouse):
- PWA: 100
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Security Considerations

1. **HTTPS Required**: PWA features only work over HTTPS
2. **Content Security Policy**: Ensure service worker allowed
3. **Scope**: Limit service worker scope to app only
4. **Cache Validation**: Verify cached content integrity

## Next Steps

1. **Add Push Notifications**:
   - Implement push notification subscription
   - Create notification service
   - Add notification permissions UI

2. **Background Sync**:
   - Implement sync manager
   - Queue failed requests
   - Sync when online

3. **Share Target**:
   - Handle shared content
   - Process incoming shares
   - Store shared data

4. **Advanced Features**:
   - Periodic background sync
   - Badge API for unread counts
   - File handling API

## Resources

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Checklist](https://web.dev/pwa-checklist/)
