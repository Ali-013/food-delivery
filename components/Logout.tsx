'use client';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function Logout() {
    const { user, logout } = useAuth();
    if (!user) {
        return null;
    }
  return (
      <div>
          <Button text='Logout' onClick={logout} dark={false} />
    </div>
  )
}
