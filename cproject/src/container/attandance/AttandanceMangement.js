<<<<<<< HEAD
function AttandanceMangement() {
    
    return (
        <div></div>
    );
=======
import Attandance from "./Attandance";
import SearchBox from "../searchbox/SearchBox";
import { useState } from "react";

import './AttandanceMangement.css'
import { att_mng } from "../searchbox/searchData";

function AttandanceMangement() {

    return (
        <div className="att_mng">
            <SearchBox data={att_mng} />

            <div className="attandanceMainBoxs">
                <div style={{
                    width: '98%',
                    height: '100%',
                }}>
                    <Attandance />
                </div>
            </div>
        </div>

    );

>>>>>>> kso
}

export default AttandanceMangement;