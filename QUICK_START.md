# 🚀 KREATE FOR EVENTS - QUICK START REFERENCE

## ⏱️ EXPECTED TIME: 30 Minutes Setup + Build Time

---

## 📋 CHECKLIST BEFORE YOU START

- [ ] GitHub account created
- [ ] Vercel account created (free)
- [ ] Supabase account created (free)
- [ ] Node.js v18+ installed
- [ ] VS Code installed
- [ ] Git installed

### Verify:
```bash
node --version    # Should be v18+
npm --version     # Should be v9+
git --version     # Should be v2.40+
```

---

## 🔗 IMPORTANT LINKS

### Accounts to Create
- **GitHub:** https://github.com/signup
- **Vercel:** https://vercel.com/signup
- **Supabase:** https://supabase.com/auth/signup

### Dashboards
- **GitHub:** https://github.com/dashboard
- **Vercel:** https://vercel.com/dashboard
- **Supabase:** https://app.supabase.com/

### Documentation
- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Vercel:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## ⚡ QUICK START COMMANDS

### 1. Clone and Setup (5 min)
```bash
# Create a folder
mkdir projects && cd projects

# Clone your GitHub repo
git clone https://github.com/YOUR_USERNAME/kreate-for-events.git
cd kreate-for-events

# Install dependencies
npm install
```

### 2. Create Environment File (2 min)
```bash
# Create .env.local with your Supabase keys
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

### 3. Start Development Server (3 min)
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Make Changes
```bash
# Edit files in VS Code
# Changes auto-refresh in browser
```

### 5. Deploy to Vercel (3 min)
```bash
# Push changes to GitHub
git add .
git commit -m "Your message"
git push origin main

# Vercel auto-deploys!
# Check progress: https://vercel.com/dashboard
```

---

## 📁 FILE STRUCTURE ESSENTIALS

```
kreate-for-events/
├── app/                          # Next.js pages & API routes
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── (dashboard)/              # Protected dashboard pages
│   ├── api/                       # API endpoints
│   ├── styles/                   # CSS files
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── ui/                       # UI components (Button, Input, etc)
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   ├── workspace/                # Workspace components
│   ├── members/                  # Member components
│   ├── scripts/                  # Script components
│   └── videos/                   # Video components
├── lib/                          # Utilities and helpers
│   ├── supabase/                 # Supabase client setup
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API service functions
│   └── utils/                    # Helper functions
├── types/                        # TypeScript type definitions
├── public/                       # Static files
├── .env.local                    # Environment variables (DON'T COMMIT)
├── .env.example                  # Example env file (DO COMMIT)
├── .gitignore                    # Files to ignore
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

---

## 🎯 DEVELOPMENT WORKFLOW

### Typical Day of Development
```bash
# 1. Start the day
npm run dev

# 2. Make changes in VS Code (auto-refresh)
# 3. Test in browser
# 4. When ready to deploy
git add .
git commit -m "feat: describe what you did"
git push origin main

# 5. Vercel auto-deploys in 1-2 minutes
# 6. Check https://vercel.com/dashboard for status
```

---

## 🔑 ENVIRONMENT VARIABLES REFERENCE

```env
# These go in .env.local (NEVER commit this file)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Where to get these values:
1. Go to Supabase dashboard
2. Settings → API → Copy the URLs and keys
3. Paste into .env.local
4. Add same values to Vercel project settings

---

## 🐛 TROUBLESHOOTING QUICK FIXES

### "npm command not found"
```bash
# Reinstall Node.js from https://nodejs.org
```

### "Cannot find module X"
```bash
# Install missing package
npm install package-name
```

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
# Or kill the process on port 3000
```

### "Build fails"
```bash
# Check Next.js build
npm run build

# Clear cache
rm -rf .next
npm run build
```

### "Supabase connection error"
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Must be set correctly
```

### "GitHub push fails"
```bash
# Check git status
git status

# Set git user (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Try again
git push origin main
```

---

## 📊 DEPLOYMENT STATUS

### Check Build Status
1. Go to https://vercel.com/dashboard
2. Click your project
3. Look for "Deployments" tab
4. Green checkmark = Success ✅
5. Click deployment to see logs

### View Live Site
- After build succeeds
- Click "Visit" button
- Or go to your custom domain
- URL format: `https://kreate-for-events.vercel.app`

---

## 💡 USEFUL COMMANDS

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Check code style
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Database
# (Manage in Supabase dashboard)

# Git
git status               # See what changed
git add .                # Stage all changes
git commit -m "msg"      # Commit with message
git push origin main     # Push to GitHub
git log                  # See commit history
git pull                 # Get latest from GitHub
```

---

## ✨ KEY TIPS & TRICKS

### 1. VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Supabase Extension
- Thunder Client (API testing)
- Prettier - Code formatter

### 2. Browser DevTools (Essential)
- Network tab (check API calls)
- Console tab (see errors)
- Application tab (see cookies/storage)
- Inspector tab (inspect elements)

### 3. Git Best Practices
```bash
# Good commit messages
git commit -m "feat: add authentication pages"
git commit -m "fix: correct workspace deletion bug"
git commit -m "style: update button colors"
git commit -m "docs: add API documentation"

# Bad commit messages
git commit -m "updates"
git commit -m "fix"
git commit -m "changes"
```

### 4. Debugging Tips
```bash
// Add console logs
console.log('User:', user)
console.log('Error:', error)

// Check network requests
// DevTools → Network tab → See API calls

// Test Supabase directly
// Go to Supabase dashboard → SQL Editor
```

---

## 🎯 PHASES & MILESTONES

### Week 1: Foundation
- [x] Setup GitHub, Vercel, Supabase
- [x] Create Next.js + Tailwind project
- [ ] Build authentication (login/signup)
- [ ] Deploy to Vercel
- **Milestone:** Can sign up and log in

### Week 2: Core Features
- [ ] Workspace creation and management
- [ ] Team member management
- [ ] Dashboard
- **Milestone:** Can create workspace and add members

### Week 3: Content Management
- [ ] Script management
- [ ] Video management
- [ ] Platform integration
- **Milestone:** Can upload scripts and videos

### Week 4: Polish & Launch
- [ ] Activity logs
- [ ] Settings
- [ ] Real-time updates
- [ ] Performance optimization
- **Milestone:** Launch to users

---

## 📱 MOBILE CHECKLIST

Test on mobile:
- [ ] All buttons clickable (44px minimum)
- [ ] Text readable (no horizontal scroll)
- [ ] Forms usable with touch
- [ ] Navigation accessible
- [ ] Modals closeable
- [ ] Responsive images

Command to test:
```bash
# Use DevTools device emulation
# F12 → Toggle device toolbar (Ctrl+Shift+M)
```

---

## 🔒 SECURITY CHECKLIST

- [ ] No API keys in code (use .env.local)
- [ ] .env.local in .gitignore
- [ ] Passwords not logged or stored
- [ ] Validate all inputs (Zod)
- [ ] Use HTTPS (Vercel auto-provides)
- [ ] Row Level Security enabled on all tables
- [ ] CORS properly configured
- [ ] Rate limiting on API routes

---

## 📈 PERFORMANCE TARGETS

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Score | 90+ | Built into Vercel |
| First Load | < 2s | Vercel Analytics |
| Core Web Vitals | All Green | Google PageSpeed |
| Build Size | < 150KB gzip | npm bundle analyzer |

Check performance:
```bash
npm run build
# Look at: .next/static/chunks/

# Or check live:
# https://pagespeed.web.dev/
```

---

## 🚀 DAILY WORKFLOW TEMPLATE

### Morning
```bash
# Start fresh
git pull origin main
npm install
npm run dev
```

### During Day
```bash
# Edit files → Save → Auto-refresh → Test
# No commands needed - it's automatic!
```

### End of Day
```bash
# Push your work
git add .
git commit -m "feat: describe what you did"
git push origin main
# Check Vercel auto-deploy
```

---

## 📞 GETTING HELP

### If Something Breaks
1. Check error message in console
2. Google the error
3. Check documentation
4. Try on fresh browser (incognito)
5. Clear cache: `rm -rf .next && npm run build`
6. Restart dev server: Stop (`Ctrl+C`) and `npm run dev`

### Useful Resources
- **Next.js Discord:** https://discord.gg/nextjs
- **Supabase Docs:** https://supabase.com/docs
- **Stack Overflow:** Tag your question with relevant keywords
- **GitHub Issues:** Check if issue already reported

---

## ✅ FINAL DEPLOYMENT CHECKLIST

Before going live to users:

- [ ] All features tested locally
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Forms validated
- [ ] Database RLS enabled
- [ ] Environment variables set in Vercel
- [ ] Build succeeds on Vercel
- [ ] Live site accessible
- [ ] User authentication works
- [ ] Can create workspace
- [ ] Can add members
- [ ] Data persists after refresh
- [ ] No security issues
- [ ] Performance acceptable

---

## 🎉 YOU'RE READY!

You have:
✅ Complete design system
✅ Tech stack recommendations
✅ Step-by-step build guide
✅ Database schema
✅ Build prompt with all features
✅ Deployment instructions
✅ Troubleshooting guide

**Next Step:** Follow BUILD_AND_DEPLOY.md step by step

**Time to build:** 30 min setup + ongoing development

**Let's make Kreate for Events awesome! 🚀**

---

## 📚 DOCUMENTS CREATED FOR YOU

1. **design-system-cheatsheet.md** - Colors, fonts, quick reference
2. **kreate_design_system.md** - Complete design documentation
3. **tailwind.config.js** - Tailwind CSS configuration
4. **design-system.css** - Standalone CSS
5. **TECH_STACK.md** - Technology recommendations
6. **BUILD_AND_DEPLOY.md** - Step-by-step setup guide
7. **BUILD_PROMPT.md** - Complete feature building prompt
8. **QUICK_START.md** - This file

**Total:** 8 comprehensive documents covering everything you need!

---

*Quick Start Reference v1.0 | Created: June 25, 2026*
*Start building: Follow BUILD_AND_DEPLOY.md*
