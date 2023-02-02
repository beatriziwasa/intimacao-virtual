import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import whatsapp from '../whatsapp.jpg';

export default function IntimacaoVirtualCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={RouterLink} to="/intimacao">
        <CardMedia
          component="img"
          height="140"
          image={whatsapp}
          alt="Intimação Virtual"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Intimação Virtual
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}