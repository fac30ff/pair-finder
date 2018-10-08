import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class PairList extends Component {


    render() {
  const { fetchingPeople, people, pairs } = this.props;

        return (
            <Paper elevation={4}>
                <div>
                    {fetchingPeople ? <div>Fetching people list</div> : null}
                    <div>People: {people.length}</div>
                    <div>Pairs: {pairs.length}</div>
                    <div>Here to be the list.:
                      {pairs.length > 0 && <ul>
                        <li key={0}>{`${people[pairs[0].x].firstname} ${people[pairs[0].x].lastname} and
                        ${people[pairs[0].y].firstname} ${people[pairs[0].y].lastname} distance =
                        ${pairs[0].distance}`}</li>
                        <li key={2}>{`${people[pairs[2].x].firstname} ${people[pairs[2].x].lastname} and
                        ${people[pairs[2].y].firstname} ${people[pairs[2].y].lastname} distance =
                        ${pairs[2].distance}`}</li>
                        <li key={4}>{`${people[pairs[4].x].firstname} ${people[pairs[4].x].lastname} and
                        ${people[pairs[4].y].firstname} ${people[pairs[4].y].lastname} distance =
                        ${pairs[4].distance}`}</li>
                        <li key={6}>{`${people[pairs[6].x].firstname} ${people[pairs[6].x].lastname} and
                        ${people[pairs[6].y].firstname} ${people[pairs[6].y].lastname} distance =
                        ${pairs[6].distance}`}</li>
                        <li key={8}>{`${people[pairs[8].x].firstname} ${people[pairs[8].x].lastname} and
                        ${people[pairs[8].y].firstname} ${people[pairs[8].y].lastname} distance =
                        ${pairs[8].distance}`}</li>
                      </ul>}
                    </div>
                </div>
            </Paper>
        );
    }
}

export default PairList;
