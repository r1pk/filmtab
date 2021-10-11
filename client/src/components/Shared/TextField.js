import { TextField as MuiTextField } from '@mui/material';

const TextInput = (props) => {
  return <MuiTextField variant="standard" size="small" {...props} />;
};

export default TextInput;
