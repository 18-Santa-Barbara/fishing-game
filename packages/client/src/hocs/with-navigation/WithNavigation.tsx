import { ComponentClass, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

function withNavigation<TProps>(
  Component: ComponentClass<TProps> | ComponentType<TProps>
) {
  return (props: TProps) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation;