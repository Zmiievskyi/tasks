import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/selectors';
import { ComponentType } from 'react';

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

type Props = {
    component: ComponentType<any>;
    redirectTo?: string;
};

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }: Props) => {
    const isLoggedIn = useAppSelector(state => state.auth.status.isLogin);
    return isLoggedIn ?<Navigate to={redirectTo} />: <Component />;
};
