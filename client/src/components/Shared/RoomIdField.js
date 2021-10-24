import ValidationTextField from './ValidationTextField';

const validator = (value) => {
  return value.length === 9;
};

const RoomIdField = (props) => {
  return <ValidationTextField label="Room id" validator={validator} {...props} />;
};

export default RoomIdField;
