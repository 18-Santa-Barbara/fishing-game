import { Container, Typography } from '@mui/material';

const Footer = () => (
  <Container
    sx={{
      minWidth: '100%',
      p: '12px 0',
      textAlign: 'center',
      borderTop: '1px solid #c6c6c6'
    }}>
    <div>
      <Typography variant="h5">© Made By Sweaty Vikings</Typography>
    </div>
    <div>
      <Typography variant="body2">Telegram: @petagys @Krisvis @Vladbekk1</Typography>
    </div>
  </Container>
);

export default Footer;