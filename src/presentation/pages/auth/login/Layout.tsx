import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { container } from '../../../../di/container';


export default function AuthLayout() {
    const navigate = useNavigate();
    const authUseCases = container.resolve('authUseCases')
    useEffect(() => {
      validateSession()
    }, []);
    async function validateSession() {
      const authData = await authUseCases.getAuthSession.execute()
      if (!authData) {
        navigate('/');
      }
    }
    return (
        <>
            <Outlet />
        </>
    )
}
