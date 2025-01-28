
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Image = () => {
  return (
    <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
   
  >
    Upload Your Image
    <VisuallyHiddenInput
      type="file"
      name='image'
      onChange={(event) => console.log(event.target.files)}
      multiple
    />
  </Button>
  )
}

export default Image