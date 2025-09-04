import React, { memo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box,Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface HeaderPageProps {
  children: React.ReactNode;
}

const ContainerFilter: React.FC<HeaderPageProps> = memo(({ children }) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Accordion expanded={expanded === 'panel'} onChange={handleChange('panel')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panela-content"
          id="panela-header"
          sx={{
            minHeight: '40px',
            maxHeight: '40px',
            '&.Mui-expanded': {
              minHeight: '40px',
              maxHeight: '40px',
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(180deg)',
            },
            boxShadow: '1px 2px 9px #918c8d',
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontFamily: 'Times New Roman' }}>
            Buscador
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ boxShadow: '1px 2px 9px #918c8d', padding:1,paddingTop:2}}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default memo(ContainerFilter);
