import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ip from '../ip.jpeg';

export default function LivroIPCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={RouterLink} to="/livro/ip">
        <CardMedia
          component="img"
          height="140"
          image={ip}
          alt="Livro IP"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cartório Virtual
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}