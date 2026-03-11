# Testing Dark Mode & Keyboard Shortcuts

## Quick Test Guide

### Prerequisites
Make sure your development server is running:
```bash
cd client
npm run dev
```

---

## Test Dark Mode

### 1. Toggle Dark Mode
- [ ] Login to the application
- [ ] Look for the **Moon icon** in the top right header
- [ ] Click it - the interface should switch to dark theme
- [ ] Click again (now **Sun icon**) - should switch back to light theme

### 2. Persistence Test
- [ ] Enable dark mode
- [ ] Refresh the page (F5)
- [ ] Dark mode should still be active
- [ ] Open in a new tab - dark mode should be active there too

### 3. Visual Check
Navigate through all pages and verify dark mode works:
- [ ] Dashboard - cards, charts, stats
- [ ] Patients - table, forms
- [ ] Appointments - calendar, list
- [ ] Medical Records - forms, history
- [ ] Billing - invoices, tables

---

## Test Keyboard Shortcuts

### 1. Navigation Shortcuts
Try each shortcut (use Ctrl on Windows/Linux, Cmd on Mac):

- [ ] Press `Ctrl + D` → Should go to Dashboard
- [ ] Press `Ctrl + P` → Should go to Patients
- [ ] Press `Ctrl + A` → Should go to Appointments
- [ ] Press `Ctrl + M` → Should go to Medical Records
- [ ] Press `Ctrl + B` → Should go to Billing

### 2. Search Shortcut
- [ ] Press `Ctrl + K` → Search input should be focused
- [ ] Start typing → Should work normally

### 3. Modal Shortcuts
- [ ] Open any modal (e.g., Add Patient)
- [ ] Press `Esc` → Modal should close
- [ ] Try with different modals

### 4. Form Safety
- [ ] Click in any input field
- [ ] Press `Ctrl + P` → Should NOT navigate (should type 'p')
- [ ] Click outside input
- [ ] Press `Ctrl + P` → Should navigate to Patients

### 5. Help Panel
- [ ] Click the **Keyboard icon** (floating button, bottom right)
- [ ] Help panel should appear showing all shortcuts
- [ ] Click X or outside → Should close
- [ ] Press `?` key → Should open help panel

---

## Visual Regression Check

### Light Mode
- [ ] All text is readable
- [ ] Colors are consistent
- [ ] Buttons have proper contrast
- [ ] Tables are clear

### Dark Mode
- [ ] All text is readable (no white on white)
- [ ] Colors are appropriate for dark theme
- [ ] Buttons stand out
- [ ] Tables have good contrast
- [ ] No jarring bright colors

---

## Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if available)

---

## Mobile Testing (Optional)

- [ ] Dark mode toggle works on mobile
- [ ] Keyboard shortcuts don't interfere (they shouldn't activate)
- [ ] Help button is accessible
- [ ] Theme persists on mobile

---

## Common Issues & Solutions

### Dark Mode Not Working
1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()`
3. Hard refresh: `Ctrl + Shift + R`

### Shortcuts Not Working
1. Make sure you're not in an input field
2. Check browser console for errors
3. Try refreshing the page

### Theme Not Persisting
1. Check if localStorage is enabled in browser
2. Check browser privacy settings
3. Try incognito/private mode

---

## Performance Check

- [ ] Theme toggle is instant (no lag)
- [ ] Shortcuts respond immediately
- [ ] No console errors
- [ ] No memory leaks (check DevTools)

---

## Accessibility Check

- [ ] Tab navigation still works
- [ ] Screen readers can access toggle button
- [ ] Keyboard shortcuts don't break accessibility
- [ ] Focus indicators visible in both themes

---

## Success Criteria

All features working if:
✅ Dark mode toggles smoothly
✅ Theme persists across sessions
✅ All shortcuts navigate correctly
✅ Shortcuts don't interfere with typing
✅ Help panel displays properly
✅ No console errors
✅ Works in all major browsers

---

## Report Issues

If you find any issues, note:
1. What you were doing
2. Expected behavior
3. Actual behavior
4. Browser and version
5. Console errors (if any)
