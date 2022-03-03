
import React from "react";
import { hot } from "react-hot-loader/root";
import { ChartDashboard } from './components/ChartDashboard'
type Props = {
   name?:
    string
}

export const App = ({name}: Props) => {
       return (
        <ChartDashboard />

    );
}

export default hot(App);
