import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

var styles = makeStyles({
    root: {
        maxWidth: 200
    },
})

export default function MaterialCard(props) {

    const classes = styles()

    return(
        <Card className={ classes.root }>
            <CardContent>
                <CardActionArea>
                    <CardMedia component="img" className={ classes.card } image={ props.poster } title={ props.title } />
                    <Typography gutterBottom variant="h5" component="h2">
                        { props.title }
                    </Typography>
                </CardActionArea>
            </CardContent>
        </Card>
    )
}