# Kreate for Events - Complete Build & Deployment Guide

## 🎯 GOAL: Build, Test, Deploy to Vercel in 30 Minutes

---

## ✅ PRE-REQUISITES

1. **GitHub Account** (Free) - https://github.com
2. **Vercel Account** (Free) - https://vercel.com
3. **Supabase Account** (Free) - https://supabase.com
4. **VS Code** - https://code.visualstudio.com
5. **Node.js 18+** - https://nodejs.org
6. **Git** - https://git-scm.com

### Verify installations:
```bash
node --version      # Should be v18+
npm --version       # Should be v9+
git --version       # Should be v2.40+
```

---

## 🔧 STEP 1: Create GitHub Repository (5 minutes)

### 1.1 Create on GitHub
1. Go to https://github.com/new
2. Repository name: `kreate-for-events`
3. Description: "Platform for organizing scripts, logs, and social handlers for event marketing team"
4. Public or Private (your choice)
5. Initialize with README
6. Create repository

### 1.2 Clone to your computer
```bash
# Open terminal/PowerShell

# Navigate to where you want the project
cd Desktop
# or
cd ~/projects
# or any folder you prefer

# Clone the repository
git clone https://github.com/YOUR_USERNAME/kreate-for-events.git
cd kreate-for-events
```

---

## 🚀 STEP 2: Set Up Next.js Project (5 minutes)

```bash
# Inside kreate-for-events folder

# Create Next.js app with Tailwind
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --yes \
  --import-alias '@/*' \
  --skip-git

# This creates:
# - app/ (Next.js 14 app router)
# - components/
# - lib/
# - public/
# - styles/
# - tailwind.config.ts
# - tsconfig.json
# - package.json
```

### What to answer in the prompt:
- **Use TypeScript?** → Yes
- **Use ESLint?** → Yes
- **Use Tailwind CSS?** → Yes
- **Use src/ directory?** → No
- **Use App Router?** → Yes
- **Use Turbopack?** → No (optional)
- **Customize import alias?** → Yes (`@/*`)

---

## 📦 STEP 3: Install Dependencies (3 minutes)

```bash
npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  react-hook-form \
  zod \
  @hookform/resolvers \
  @tanstack/react-query \
  zustand \
  lucide-react \
  clsx \
  date-fns

# Optional: For better development experience
npm install --save-dev \
  prettier \
  prettier-plugin-tailwindcss
```

### Verify installation:
```bash
npm list @supabase/supabase-js
# Should show version number
```

---

## 🎨 STEP 4: Set Up Design System (2 minutes)

### 4.1 Copy design system files
From your design system folder, copy:
- `design-system.css` → `app/styles/design-system.css`
- `tailwind.config.js` content → Update `tailwind.config.ts`

### 4.2 Update `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import our custom design system */
@import './design-system.css';

/* Remove Next.js default styles if conflicting */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  @apply transition-colors duration-200;
}
```

### 4.3 Update `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF2FF',
          100: '#D6E4FF',
          600: '#1E40AF',
          700: '#0F2A5C',
        },
        secondary: {
          400: '#FB923C',
          500: '#F97316',
        },
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 🗄️ STEP 5: Set Up Supabase (5 minutes)

### 5.1 Create Supabase Project
1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Organization: Choose or create
5. Project name: `kreate-for-events`
6. Database password: Save it securely!
7. Region: Choose closest to your users (e.g., Asia Pacific)
8. Click "Create new project"
9. Wait 2-3 minutes for setup

### 5.2 Get Connection Keys
In Supabase dashboard:
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY) - Keep private!

### 5.3 Create Database Tables
1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy the SQL schema from TECH_STACK.md
4. Run the query
5. Verify tables created in **Table Editor**

---

## 🔑 STEP 6: Set Up Environment Variables (2 minutes)

### 6.1 Create `.env.local` file

In your project root, create a file named `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxxx

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace:
- `https://xxxxx.supabase.co` with your Supabase URL
- `eyxxxxx` with your Anon Key
- `eyxxxxx` with your Service Role Key

### 6.2 Create `.env.example` (for documentation)

```env
# This file shows what environment variables are needed
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6.3 Update `.gitignore`
```
# .gitignore
.env.local
.env.*.local
.env.production.local
```

**Never commit `.env.local` - it contains secrets!**

---

## 💻 STEP 7: Create Core Folder Structure (5 minutes)

```bash
# Create folders
mkdir -p app/styles
mkdir -p app/api/auth
mkdir -p app/api/workspaces
mkdir -p components/ui
mkdir -p components/forms
mkdir -p components/layout
mkdir -p lib/supabase
mkdir -p lib/hooks
mkdir -p lib/utils
mkdir -p types
mkdir -p public/images
```

---

## 📝 STEP 8: Create Essential Files (10 minutes)

### 8.1 Create `lib/supabase/client.ts`
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 8.2 Create `lib/supabase/server.ts`
```typescript
import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore set cookie errors
          }
        },
      },
    }
  )
}
```

### 8.3 Create `lib/hooks/useAuth.ts`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}
```

### 8.4 Create `types/database.ts`
```typescript
export type User = {
  id: string
  email: string
  created_at: string
}

export type Workspace = {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  owner_id: string
  created_at: string
  updated_at: string
}

export type WorkspaceMember = {
  id: string
  workspace_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  supply: string[] | null
  social_handlers: string[] | null
  responsibilities: string | null
  created_at: string
}

export type Event = {
  id: string
  workspace_id: string
  name: string
  description: string | null
  event_date: string | null
  location: string | null
  created_at: string
  updated_at: string
}

export type Script = {
  id: string
  event_id: string
  title: string
  content: string
  status: 'draft' | 'approved' | 'published'
  assigned_to: string | null
  created_at: string
  updated_at: string
}

export type Video = {
  id: string
  event_id: string
  title: string
  description: string | null
  video_url: string | null
  platform: 'Instagram' | 'YouTube' | 'LinkedIn' | 'X' | null
  uploaded_by: string
  status: 'draft' | 'processing' | 'published'
  created_at: string
  updated_at: string
}
```

### 8.5 Create `components/ui/Button.tsx`
```typescript
import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-danger': variant === 'danger',
          'btn-ghost': variant === 'ghost',
          'btn-sm': size === 'sm',
          'btn-lg': size === 'lg',
        },
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
```

### 8.6 Create `app/page.tsx` (Landing Page)
```typescript
'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-neutral-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white p-4">
      <div className="max-w-2xl space-y-8 text-center">
        <div>
          <h1 className="text-h1 font-bold text-primary-700">Kreate for Events</h1>
          <p className="mt-4 text-body-lg text-neutral-600">
            Platform for organizing scripts, logs, social handlers, and team coordination
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="primary" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/api/auth/logout">
                <Button variant="secondary" size="lg">
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="primary" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary" size="lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-h5 font-semibold">📝 Scripts</h3>
            <p className="mt-2 text-sm text-neutral-600">Manage event scripts and content</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-h5 font-semibold">🎥 Videos</h3>
            <p className="mt-2 text-sm text-neutral-600">Upload and organize videos</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <h3 className="text-h5 font-semibold">👥 Team</h3>
            <p className="mt-2 text-sm text-neutral-600">Coordinate with your team</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 🧪 STEP 9: Test Locally (5 minutes)

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000

# You should see the landing page
# Click "Sign Up" to test authentication
```

### Test Checklist:
- [ ] Page loads
- [ ] Can see landing page
- [ ] No console errors
- [ ] Design system styles applied
- [ ] Responsive on mobile

---

## 📤 STEP 10: Deploy to Vercel (5 minutes)

### 10.1 Push Code to GitHub
```bash
# In terminal, in your project folder

# Check status
git status

# Add all files
git add .

# Commit with message
git commit -m "feat: initial setup with Next.js, Supabase, Tailwind"

# Push to GitHub
git push origin main

# Verify on github.com - you should see your code
```

### 10.2 Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import from GitHub"
4. Select your `kreate-for-events` repository
5. Click "Import"

### 10.3 Set Environment Variables
1. In the import screen, scroll to "Environment Variables"
2. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyxxxxx
   SUPABASE_SERVICE_ROLE_KEY = eyxxxxx
   NEXT_PUBLIC_APP_URL = https://your-project.vercel.app
   ```
3. Click "Deploy"

### 10.4 Monitor Deployment
1. Wait 2-3 minutes for build to complete
2. Once done, you'll see "Congratulations!"
3. Click "Visit" to see your live site
4. Your URL will be: `https://kreate-for-events-xxxxx.vercel.app`

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] Vercel project connected
- [ ] Environment variables set in Vercel
- [ ] Supabase project created
- [ ] Database tables created
- [ ] Deployment successful
- [ ] Live site accessible
- [ ] Can sign up and login
- [ ] No errors in browser console

---

## 🔄 FUTURE DEPLOYMENTS (Automatic!)

From now on, every time you:
1. Make changes locally
2. Commit with `git commit`
3. Push with `git push origin main`

Vercel **automatically rebuilds and deploys** your site. ✨

---

## 🐛 TROUBLESHOOTING

### "Cannot find module @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### "Environment variables not working"
- Verify in Vercel dashboard → Settings → Environment Variables
- Restart build after adding variables

### "Supabase connection error"
- Check NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Verify in browser console for exact error

### "Build fails on Vercel"
- Check build logs in Vercel dashboard
- Often just missing environment variables
- Click "Redeploy" after fixing

### "404 Page Not Found"
- Ensure file is in `app/` folder with correct routing
- Use `page.tsx` for routes
- Use `layout.tsx` for layouts

---

## 📚 NEXT STEPS

1. ✅ Build and deploy basic structure (you are here)
2. Build authentication pages (login, signup)
3. Create dashboard layout
4. Build workspace management
5. Add team member management
6. Implement script/video management
7. Add real-time features
8. Deploy Phase 2

---

## 🎯 VERIFY YOUR DEPLOYMENT

After deployment to Vercel:

1. **Check live URL:** https://your-project.vercel.app
2. **Check page source:** Open DevTools (F12) → Network
3. **Check environment:** Open DevTools → Console
4. **Test authentication:** Try signup flow
5. **Check Supabase:** Logs should appear in Supabase dashboard

---

## 🚀 YOU'RE LIVE!

Congratulations! You now have:
- ✅ Next.js 14 + React 18 app
- ✅ Tailwind CSS + Design System
- ✅ Supabase database + Auth
- ✅ Vercel hosting with auto-deployments
- ✅ Professional setup with TypeScript

Time to build the features! 🎉

---

## 📞 SUPPORT RESOURCES

- **Vercel Issues:** vercel.com/help
- **Supabase Issues:** supabase.com/docs/guides
- **Next.js Issues:** nextjs.org/docs
- **GitHub Issues:** Check existing issues first

---

*Complete Build & Deployment Guide v1.0 | Created: June 25, 2026*
