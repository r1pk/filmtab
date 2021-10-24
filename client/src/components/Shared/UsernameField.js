import ValidationTextField from './ValidationTextField';

const validator = (value) => {
  return value.replace(/[^a-zA-Z0-9 ]/g, '').length > 2;
};

const UsernameField = (props) => {
  return <ValidationTextField label="Username" validator={validator} {...props} />;
};

export default UsernameField;
