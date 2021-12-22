import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Box } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import normal from '../../static/normal.png';
import desert from '../../static/desert.png';
import assasing from '../../static/assasing.png';
import ultraLight from '../../static/ultraLight.png';
import useStyles, { ImageButton, ImageSrc, Image, ImageBackdrop, ImageMarked } from './styles';

const Map = ({ setTitle, styledMap, coords, places, setCoords, setBounds, setChildClicked }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  const images = [
    {
      url: normal,
      title: 'Default',
      width: '15%',
    },
    {
      url: desert,
      title: 'Desert',
      width: '15%',
    },
    {
      url: assasing,
      title: 'Assasins',
      width: '15%',
    },
    {
      url: ultraLight,
      title: 'Ultra Light',
      width: '15%',
    },
  ];

  return (
    <div className={classes.mapContainer}>
      <Box className={classes.boxStyle}>
        {images.map((image) => (
          <ImageButton focusRipple key={image.title} style={{ width: image.width }} onClick={() => setTitle(image.title)}>
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography component="span" variant="subtitle1" color="inherit" className={classes.buttonTypography}>
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: styledMap }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
