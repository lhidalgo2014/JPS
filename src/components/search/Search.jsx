// import { getSorteos } from '../../database'
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
                console.log(this.state.prizesDetail)
            })
    } 

    updateData (data) {
        this.setState({prizesDetail: data})
    }

    getType = (prizeDetail) => {
        if(prizeDetail.length > 0) {
            return "aa"
        } else return "tipo"
    }

    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };
    
    handleClose = () => {
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
                            { this.state.currentPrize.type }
                        </Grid>

                        <Grid item xs={4}>
                            { this.state.currentPrize.date }
                        </Grid>

                        <Grid item xs={4}>
                            {
                                // this.getFormattedPrize(this.state.prizesDetail)
                            }
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
                                <Grid key={index} className="Text" container alignItems="center" spacing={3}>
                                    <Grid item xs={2}>
                                        {
                                            prizeDetail.type
                                        }
                                    </Grid>

                                    <Grid item xs={4}>
                                        {
                                            this.getFormattedDate(prizeDetail.date)
                                        }
                                    </Grid>

                                    <Grid item xs={4}>
                                        {
                                            this.getFormattedPrizeList(prizeDetail.prizeList)
                                        }
                                    </Grid>
                                </Grid>
                            ))
                        }
                    <MenuItem onClick={this.handleClose}>Profileaaaaaaaaaaaaaaaaaaaaaaa</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Search;