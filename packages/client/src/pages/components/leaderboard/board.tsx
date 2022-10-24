import React, { useState } from 'react'

import '../leaderboard/styles/board.css'

import background from '../../../assets/leaderboard.jpg'

import Profiles from './profile';
import { Player } from '../../leaderboard';

import { testPlayers } from '../../leaderboard';
import { Button, ButtonProps, Container, styled, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';


export default function Board() {

  const [period, setPeriod] = useState(0);
  const handleClick = (e: React.SetStateAction<number>) => {
    setPeriod(e.target.dataset.id)
  }
  const styles = {
    leaderboardContainer: {
        backgroundImage: `url(${background})`
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      border: 0
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50])
  }));

  return (
    <div style={styles.leaderboardContainer} className="leaderboard__container">
        <Container fixed>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    
                <TableHead className="leaderboard__header">
                    <TableRow>
                        <StyledTableCell className='leaderboard__title' align="center">Leaderboard</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell align='center' className="leaderboard__duration">

                            <ColorButton className="leaderboard__button" 
                                         variant="outlined" 
                                         size="medium" 
                                         onClick={handleClick} 
                                         data-id='7'>7 Days</ColorButton>
                            <ColorButton className="leaderboard__button" 
                                         variant="outlined" 
                                         size="medium" 
                                         onClick={handleClick} 
                                         data-id='30'>30 Days</ColorButton>
                            <ColorButton className="leaderboard__button" 
                                         variant="outlined" 
                                         size="medium" 
                                         onClick={handleClick} 
                                         data-id='0'>All-Time</ColorButton>

                        </StyledTableCell>
                    </TableRow>
                </TableHead>
            
                <TableBody>
                    <TableRow>
                        <StyledTableCell align='center'>
                            <Profiles Players={between(testPlayers, period)}></Profiles>
                        </StyledTableCell>
                    </TableRow>
                </TableBody>
                
            </Table>
        </Container>
    </div>

  )
}

  function between(data: Player[], between: number){

    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between));

    const filter = data.filter((val: Record<string, unknown>) => {
        const userDate = new Date(val.data.date);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })
    console.log("FILTER: ", filter)
    return filter.sort((a: Array, b: Array) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else {
            return b.score - a.score;
        }
    })

  }
