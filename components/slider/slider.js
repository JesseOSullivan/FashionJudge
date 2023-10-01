
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';  // Import Typography for the label
const marks = [
  {
    value: 0,
    label: 'Bob Ross',
  },
  {
    value: 50,
    label: 'Standard',
  },
  {
    value: 100,
    label: 'Gordan Ramsey',
  },
];


function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function DiscreteSliderValues({ value, setValue }) {
    return (
      <Box sx={{ width: 200 }}>
<Typography gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>
    Judgement level
</Typography>
<Slider
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        
          aria-label="Restricted values"
          defaultValue={20}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          marks={marks}
          track={false}
        />
      </Box>
    );
  }
  