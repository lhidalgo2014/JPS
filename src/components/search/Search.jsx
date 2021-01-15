import Typography from '@material-ui/core/Typography';
import { db } from '../../firebase'
import React from 'react';
import './Search.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class Search extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            prizesDetail: [],
            currentPrize: {
                type: "tipo",
                date: "fecha",
                prizeList: []
            },
            anchorEl: null
        }
    }

    async componentDidMount() {
        var collRef = db.collection("sorteo").where("state", "==", "sorteando")
        await collRef.get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState({prizesDetail: data})
                if(this.state.prizesDetail.length > 0) {
                    this.setState({currentPrize: this.state.prizesDetail[0]})
                }
            })
    } 

    updateData (data) {
        this.setState({prizesDetail: data})
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };
    
    handleMenuItemClick = (event, index) => {
        this.setState({currentPrize: this.state.prizesDetail[index]})
        this.setState({anchorEl: null})
    }
    
    getFormattedDate(date) {
        return new Date(date.seconds).toDateString();
    }

    getFormattedPrizeList(prizeList) {
        if(prizeList.length > 0) {
            var cont = 1;
            var stringList = [];
            prizeList.forEach(prize => {
                stringList.push(cont.toString() + "° premio " + prize)
                stringList.push(", ")
                cont++;
            })
            stringList.pop()
            return stringList;
        } else return ""
    }


    render() {
        return (
            <div className="Search">
                <Button onClick={this.handleClick} className="Button">
                    <Grid className="Text" container alignItems="center" spacing={3}>
                        <Grid item xs={1}>
                            <IconButton aria-label="delete">
                                <SearchIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography noWrap variant="body2" gutterBottom>
                                { this.state.currentPrize.type }
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography noWrap variant="body2" gutterBottom>
                                { this.getFormattedDate(this.state.currentPrize.date) }
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography noWrap variant="body2" gutterBottom>
                                { this.getFormattedPrizeList(this.state.currentPrize.prizeList) }
                            </Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <IconButton aria-label="delete">
                                <ArrowDropDownIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Button>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}>
                        {
                            this.state.prizesDetail.map((prizeDetail, index) => (
                                <MenuItem onClick={(event) => this.handleMenuItemClick(event, index)}>
                                    <Grid key={index} className="Text" container alignItems="center" spacing={3}>
                                        <Grid item xs={4}>
                                            <Typography noWrap variant="body2" gutterBottom>
                                                { prizeDetail.type }
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography noWrap variant="body2" gutterBottom>
                                                { this.getFormattedDate(prizeDetail.date) }
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography noWrap variant="body2" gutterBottom>
                                                { this.getFormattedPrizeList(prizeDetail.prizeList) }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            ))
                        }
                </Menu>
            </div>
        )
    }
}

export default Search;