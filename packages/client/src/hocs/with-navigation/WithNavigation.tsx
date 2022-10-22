import { ComponentClass, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

function withNavigation(Component: ComponentClass | ComponentType) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation;