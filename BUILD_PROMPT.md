# 🚀 KREATE FOR EVENTS - COMPLETE BUILD PROMPT

## PROJECT OVERVIEW

**Goal:** Build a complete team collaboration platform for managing event marketing content, scripts, videos, and team coordination.

**Tech Stack:** Next.js 14 + React 18 + Supabase + Tailwind CSS + TypeScript
**Hosting:** Vercel
**Database:** Supabase PostgreSQL

**Features to Build:**
1. Authentication (sign up, login, logout)
2. Workspace management
3. Team member management
4. Script management
5. Video management and platform integration
6. Activity logs and dashboard
7. Real-time updates

---

## PHASE 1: AUTHENTICATION & CORE STRUCTURE (Days 1-2)

### Feature 1.1: Authentication Pages

**Build these pages:**
- `/signup` - Sign up page
- `/login` - Login page
- `/dashboard` - Protected dashboard (redirect to login if not authenticated)

**Requirements:**
- Use React Hook Form + Zod for validation
- Email/password authentication via Supabase
- Form validation with error messages
- Success feedback (toast or message)
- Redirect to dashboard after login
- Logout functionality
- Error handling with user-friendly messages

**Design:**
- Use the provided design system (buttons, inputs, cards)
- Centered form layout
- 400px max-width
- Primary blue button for submit
- Secondary gray button for alternative action
- Show password toggle
- Forgot password link (can be basic redirect for now)

**Code Files to Create:**
```
app/(auth)/
├── login/
│   └── page.tsx
├── signup/
│   └── page.tsx
└── layout.tsx

components/forms/
├── LoginForm.tsx
├── SignupForm.tsx
└── AuthLayout.tsx

lib/
├── utils/validators.ts
└── auth/
    └── helpers.ts
```

### Feature 1.2: Protected Routes & Layout

**Build:**
- Middleware to protect routes
- Navigation header with user menu
- Sidebar for navigation
- Logout functionality
- Redirect unauthenticated users to login

**Requirements:**
- Check authentication on page load
- Show user email in header
- Profile menu with logout option
- Active link highlighting
- Responsive sidebar (collapsible on mobile)

---

## PHASE 2: WORKSPACE MANAGEMENT (Days 3-4)

### Feature 2.1: Workspace Creation

**Build:**
- `/dashboard` page with list of workspaces
- Create workspace modal/form
- Card display for each workspace
- Quick actions (edit, delete, settings)

**Requirements:**
- Form fields: Name, Description, Logo (optional)
- Validation: Name required, max 255 chars
- Create new workspace in Supabase
- Show success message
- Redirect to workspace after creation
- Display owner name and member count

**Design:**
- Card grid layout
- "Create Workspace" primary button
- Hover effect on cards
- Delete confirmation modal
- Loading states

### Feature 2.2: Workspace Dashboard

**Build:**
- `/workspace/[id]` route
- Workspace header with name and details
- Navigation tabs: Overview, Members, Scripts, Videos
- Stats/metrics display
- Recent activity

**Requirements:**
- Display workspace info
- Show member count
- Show video count
- Show script count
- List recent activity (last 10 items)
- Quick actions buttons

---

## PHASE 3: TEAM MEMBER MANAGEMENT (Days 5-6)

### Feature 3.1: Add/Manage Team Members

**Build:**
- `/workspace/[id]/members` page
- List of all members with roles
- Add new member form (by email)
- Edit member role
- Remove member

**Requirements:**
- Show: Avatar, Name, Email, Role, Added Date
- Dropdown to change role (owner, admin, member)
- Add member by email (must exist in system)
- Confirmation before delete
- Invite button to send email invitation
- Pagination if many members

**Design:**
- Table or card layout
- Avatar images
- Role badge (different colors)
- Action buttons (edit, delete, +)
- Empty state with call-to-action

### Feature 3.2: Member Profiles

**Build:**
- Member detail modal/page
- Edit member info
- Assign responsibilities
- Add supply/equipment
- Add social media handlers

**Requirements:**
- Editable name and email
- Text area for responsibilities
- Multi-select for supplies
- Input for social handlers (Instagram, YouTube, LinkedIn, X)
- Save changes to Supabase
- Confirmation messages

---

## PHASE 4: EVENT & SCRIPT MANAGEMENT (Days 7-8)

### Feature 4.1: Event Management

**Build:**
- `/workspace/[id]/events` page
- Create event form
- List of events
- Event details page

**Requirements:**
- Event fields: Name, Description, Date, Location
- List all events in workspace
- Show event date in calendar format
- Link to event details
- Delete event confirmation

### Feature 4.2: Script Management

**Build:**
- `/workspace/[id]/scripts` page
- Create script form
- List of scripts
- Edit script
- Script detail page

**Requirements:**
- Script fields: Title, Content (textarea), Status (draft/approved/published), Assigned To
- Rich text editor for content (or markdown)
- Filter by status
- Search scripts
- Assign to team member
- Version history (optional)
- Status badges with colors

**Design:**
- Table layout with filters
- Status badge in different colors
- Last modified timestamp
- Quick action buttons
- Bulk actions (approve, publish)

---

## PHASE 5: VIDEO MANAGEMENT (Days 9-10)

### Feature 5.1: Video Upload & Management

**Build:**
- `/workspace/[id]/videos` page
- Upload video form
- List of videos with thumbnails
- Video detail page
- Publish to platforms

**Requirements:**
- Upload file (or link to video)
- Video metadata: Title, Description, Platform (Instagram/YouTube/LinkedIn/X)
- Progress bar for upload
- Thumbnail preview
- Status badge
- Upload date and uploader name
- File size display

**Design:**
- Grid or list layout
- Thumbnail images
- Platform badges (different colors)
- Quick action buttons
- Drag-and-drop upload area

### Feature 5.2: Platform Integration

**Build:**
- Multi-select platform checkboxes
- Metadata per platform (hashtags, description)
- Publish button
- Publish confirmation
- Status tracking

**Requirements:**
- Store platform-specific settings
- Allow scheduling (optional)
- Show published status per platform
- Provide platform-specific guidance
- Error handling for failed publishes

---

## PHASE 6: ACTIVITY & LOGS (Days 11-12)

### Feature 6.1: Activity Dashboard

**Build:**
- Activity log page
- Timeline view
- Filter by action type
- Filter by date range

**Requirements:**
- Show: Action, Actor, Time, Related Item
- Action types: Created, Updated, Deleted, Published, Member Added
- Sortable by date
- Search by action
- Pagination

### Feature 6.2: Dashboard Analytics

**Build:**
- Dashboard stats
- Charts and metrics
- Team member activity
- Content calendar

**Requirements:**
- Total videos uploaded
- Total scripts created
- Active team members
- Publish rate
- Timeline of content

---

## PHASE 7: SETTINGS & USER MANAGEMENT (Days 13-14)

### Feature 7.1: Workspace Settings

**Build:**
- `/workspace/[id]/settings` page
- Edit workspace details
- Manage integrations
- Danger zone (delete workspace)

**Requirements:**
- Edit name, description, logo
- Workspace ID copy button
- Default role for new members
- Notification settings
- Delete workspace (confirmation)

### Feature 7.2: User Profile

**Build:**
- User profile page
- Edit user settings
- Change password
- Email preferences

**Requirements:**
- Display name
- Email address
- Profile picture
- Password change form
- Email notification settings
- Two-factor authentication (optional)

---

## PHASE 8: REAL-TIME FEATURES (Days 15+)

### Feature 8.1: Real-Time Updates

**Build:**
- Supabase Realtime subscriptions
- Live member list updates
- Live video upload progress
- Live script status updates

**Requirements:**
- Subscribe to table changes
- Update UI when other users make changes
- Show online status
- Typing indicators (optional)

### Feature 8.2: Notifications

**Build:**
- In-app notifications
- Toast notifications
- Email notifications (optional)

**Requirements:**
- Member added notification
- Video uploaded notification
- Script published notification
- Team member activity notifications

---

## FILE STRUCTURE (COMPLETE)

```
kreate-for-events/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── workspace/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── members/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── scripts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [scriptId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── videos/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [videoId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── events/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── activity/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── signup/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── workspaces/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── members/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── scripts/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── videos/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── design-system.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Tabs.tsx
│   │   ├── Toast.tsx
│   │   └── Loader.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── WorkspaceForm.tsx
│   │   ├── MemberForm.tsx
│   │   ├── ScriptForm.tsx
│   │   └── VideoForm.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navigation.tsx
│   │   ├── UserMenu.tsx
│   │   └── Footer.tsx
│   ├── workspace/
│   │   ├── WorkspaceCard.tsx
│   │   ├── WorkspaceList.tsx
│   │   ├── WorkspaceHeader.tsx
│   │   └── WorkspaceTabs.tsx
│   ├── members/
│   │   ├── MemberCard.tsx
│   │   ├── MemberList.tsx
│   │   └── MemberModal.tsx
│   ├── scripts/
│   │   ├── ScriptCard.tsx
│   │   ├── ScriptList.tsx
│   │   └── ScriptEditor.tsx
│   ├── videos/
│   │   ├── VideoCard.tsx
│   │   ├── VideoList.tsx
│   │   ├── VideoUpload.tsx
│   │   └── VideoPlayer.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── EmptyState.tsx
│       ├── Breadcrumb.tsx
│       └── Pagination.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useWorkspace.ts
│   │   ├── useMembers.ts
│   │   ├── useScripts.ts
│   │   ├── useVideos.ts
│   │   └── useActivityLog.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── workspaceService.ts
│   │   ├── memberService.ts
│   │   ├── scriptService.ts
│   │   ├── videoService.ts
│   │   └── activityService.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   └── context/
│       ├── AuthContext.tsx
│       └── WorkspaceContext.tsx
├── types/
│   └── database.ts
├── public/
│   ├── images/
│   └── icons/
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## CODE EXAMPLES & PATTERNS

### Authentication Flow
1. User clicks Sign Up
2. Form validates with Zod
3. Submit to `/api/auth/signup`
4. API calls Supabase `auth.signUp()`
5. Redirect to login
6. User logs in
7. Session stored in cookies
8. Redirect to dashboard

### Workspace Creation Flow
1. User clicks "Create Workspace"
2. Modal opens with form
3. Form validates
4. API creates in Supabase
5. Add user as owner
6. Redirect to workspace
7. Toast shows success

### Member Management Flow
1. User goes to Members page
2. List shows all members
3. Click Add Member
4. Modal opens
5. Enter email of existing user
6. Select role (owner/admin/member)
7. API adds to workspace_members table
8. Real-time update to member list

### Script Management Flow
1. User goes to Scripts page
2. List shows all scripts (with filters)
3. Click Create Script
4. Form opens with editor
5. Write/paste content
6. Set status and assign member
7. Save to Supabase
8. Show in list with status badge
9. Can edit, delete, publish

### Video Upload Flow
1. User goes to Videos page
2. Click Upload Video
3. Drag or select file
4. Show progress bar
5. Upload to Supabase Storage
6. Save metadata to database
7. Show in list with status
8. Allow publishing to platforms

---

## KEY COMPONENTS TO BUILD

### UI Components (Reusable)
```typescript
// Button with loading, disabled, variants
<Button variant="primary" size="lg" isLoading={false}>
  Create Workspace
</Button>

// Input with validation
<Input 
  label="Workspace Name"
  error={errors.name}
  {...register('name')}
/>

// Modal with header/body/footer
<Modal isOpen={true} onClose={handleClose}>
  <Modal.Header>Add Member</Modal.Header>
  <Modal.Body>{...}</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>

// Card with clickable state
<Card hoverable onClick={handleNavigate}>
  <Card.Header>Workspace Name</Card.Header>
  <Card.Body>...</Card.Body>
</Card>

// Avatar with initials
<Avatar name="Harry" role="Host" size="md" />

// Badge for status
<Badge variant="success">Published</Badge>
```

### Form Patterns
```typescript
// All forms use React Hook Form + Zod
const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
})

const onSubmit = handleSubmit(async (data) => {
  try {
    const response = await api.post('/workspaces', data)
    showToast('Success')
    redirect('/dashboard')
  } catch (error) {
    showToast('Error', 'error')
  }
})
```

---

## TESTING CHECKLIST

### Phase 1
- [ ] Signup form works
- [ ] Login form works
- [ ] Logout works
- [ ] Protected routes redirect
- [ ] No console errors

### Phase 2
- [ ] Can create workspace
- [ ] Workspace appears in list
- [ ] Can navigate to workspace
- [ ] Can edit workspace
- [ ] Can delete workspace

### Phase 3
- [ ] Can add member by email
- [ ] Member appears in list
- [ ] Can change member role
- [ ] Can remove member
- [ ] Real-time updates work

### Phase 4
- [ ] Can create script
- [ ] Script appears in list
- [ ] Can edit script
- [ ] Can change status
- [ ] Can assign to member

### Phase 5
- [ ] Can upload video
- [ ] Progress bar shows
- [ ] Can select platforms
- [ ] Can publish
- [ ] Status updates

### Phase 6
- [ ] Activity log shows all actions
- [ ] Can filter by action
- [ ] Can search
- [ ] Dashboard stats accurate

---

## DEPLOYMENT REMINDERS

1. **Before each deployment:**
   - Test locally
   - Run `npm run build`
   - Check for TypeScript errors
   - Check for console errors

2. **Environment variables in Vercel:**
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_APP_URL

3. **After deployment:**
   - Test live site
   - Check network requests
   - Verify authentication
   - Test main flows

---

## SUCCESS CRITERIA

✅ All pages load without errors
✅ Authentication works (signup/login/logout)
✅ Can create and manage workspaces
✅ Can manage team members
✅ Can create and edit scripts
✅ Can upload and manage videos
✅ Real-time updates work
✅ Mobile responsive
✅ Lighthouse score 90+
✅ Deployed on Vercel
✅ Database properly configured
✅ No sensitive data in code

---

## NEXT PHASE (Future)

1. Advanced analytics dashboard
2. Video platform API integrations
3. Email notifications
4. Calendar view for events
5. Rich text editor for scripts
6. Video transcoding
7. API documentation
8. Mobile app (React Native)
9. Desktop app (Electron)
10. Admin panel

---

## SUPPORT & DEBUGGING

**Common Issues:**

1. **"Supabase client not initialized"**
   - Check environment variables
   - Verify Supabase project created

2. **"Unauthorized" error on API**
   - Check RLS policies
   - Verify user is authenticated
   - Check token in headers

3. **"Member not found" when adding**
   - User must already have account
   - Must be in auth.users table
   - Check email exactly matches

4. **"Real-time not updating"**
   - Check Realtime enabled in Supabase
   - Verify RLS allows read
   - Check subscription setup

---

**Start building! You've got this! 🚀**

*Prompt v1.0 | June 25, 2026*
