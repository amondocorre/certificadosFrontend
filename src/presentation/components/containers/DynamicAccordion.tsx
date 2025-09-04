import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DynamicAccordionProps {
  childrenTitle: ReactNode;
  children?: ReactNode;
  defaultExpanded?: boolean;
   sx?: SxProps<Theme>;
   sxBody?: SxProps<Theme>;
}

const DynamicAccordion: React.FC<DynamicAccordionProps> = ({
  childrenTitle,
  children,
  defaultExpanded = false,
  sx,sxBody
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} sx={{'&.Mui-expanded': {marginTop:0.3,}}}>
      <AccordionSummary  sx={{...sx,
      padding:0,minHeight: '25px',height:{xs:'20px', md:'40px', sm:'50px'},
      '&.Mui-expanded': {minHeight: '20px',height: {xs:'25px', md:'40px', sm:'50px'},},
      '& .MuiAccordionSummary-content': {
        margin: 0,
        '&.Mui-expanded':{margin: 0,},},
      }} expandIcon={<ExpandMoreIcon sx={{color:'white', fontSize: {xs: '1,8rem',sm: '2.2rem',md: '2.5rem',},}} />}>
        {childrenTitle}
      </AccordionSummary> 
      <AccordionDetails sx={{...sxBody,padding:0,paddingLeft:0.5}}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default DynamicAccordion;
