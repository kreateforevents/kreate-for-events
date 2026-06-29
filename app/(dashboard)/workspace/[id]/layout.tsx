'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface Workspace {
  id: string;
  name: string;
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      const { data: memberData } = await supabase
        .from('workspace_members')
        .select('workspaces(id, name)')
        .eq('user_id', session.user.id);

      if (memberData) {
        const workspacesList = memberData.map((m: any) => m.workspaces).filter((w: any) => w);
        setWorkspaces(workspacesList);
        if (workspacesList.length > 0) setCurrentWorkspace(workspacesList[0]);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    router.push(`/workspace/${workspace.id}`);
    setDropdownOpen(false);
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <div style={{ width: '240px', backgroundColor: '#F3F4F6', padding: '1.5rem', borderRight: '1px solid #D1D5DB' }}>
        <h2 style={{ margin: '0 0 2rem 0', fontSize: '18px', fontWeight: '600' }}>Kreate</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '0.5rem' }}>MY WORKSPACES</div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{currentWorkspace?.name || 'Select'}</span>
            <span>▼</span>
          </button>

          {dropdownOpen && (
            <div style={{ marginTop: '6px', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px' }}>
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => handleWorkspaceSelect(ws)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    backgroundColor: currentWorkspace?.id === ws.id ? '#EBF2FF' : '#FFFFFF',
                    color: currentWorkspace?.id === ws.id ? '#3B82F6' : '#1F2937',
                  }}
                >
                  {ws.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #D1D5DB' }}>
          <div style={{ fontSize: '12px', marginBottom: '0.5rem' }}>{user?.email}</div>
          <button
            onClick={() => { supabase.auth.signOut(); router.push('/'); }}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <div style={{ borderBottom: '1px solid #D1D5DB', padding: '1.5rem 2rem' }}>
          <h1 style={{ margin: '0', fontSize: '22px', fontWeight: '600' }}>{currentWorkspace?.name || 'Dashboard'}</h1>
        </div>
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}