import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {  Button, withStyles, Grid } from '@material-ui/core';
import PairList from './PairList';
import { actionCreator } from '../redux/redux';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  gridItem: {
    margin: theme.spacing.unit,
  },
});


class Main extends Component {

  handleLoadPairs = () => { 
    this.props.dispatch(actionCreator.fetchPeople());
  }

  render() {
    const { classes, fetchingPeople, people, pairs } = this.props;
    console.log(people);
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Best Pairs Finder
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={6} className={classes.gridItem}>
            <PairList fetchingPeople={fetchingPeople} people={people} pairs={pairs}/>
{/*
            <div>{JSON.stringify(people)}</div>
*/}
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" className={classes.button} onClick={this.handleLoadPairs}>
              Load Pairs
        </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fetchingPeople: state.root.fetchingPeople,
  people: state.root.people,
  pairs: state.root.pairs,
});

export default withStyles(styles)(connect(mapStateToProps)(Main));
