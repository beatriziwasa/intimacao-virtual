import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";

export default function BasicBreadcrumbs(props) {
    return (
        <div style={{ margin: "10px" }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    Início
                </Link>
                <Typography color="text.primary">{props.texto}</Typography>
            </Breadcrumbs>
        </div>
    );
}