import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Player } from '../../Leaderboard';

import '../leaderboard/styles/profile.css'

const Profiles = ({ Players }: { Players: Player[] }) => {

  return (
        <div id="profile">
            {Item(Players)}
        </div>
  )
}

function Item(data: any[]){
    return (

        <>
            {
                data.map((value) => (
                    <Card key={value.data.name} className="profile__card">
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                              { value.data.name.split('')[0]}
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                            </IconButton>
                          }
                          title={ value.data.name }
                          subheader={ value.data.date }
                        />
                        <CardContent>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Score: {value.data.score}
                          </Typography>
                        </CardContent>
                    </Card>
                    )
                )
            }
        </>

        
    )
}

export default Profiles;