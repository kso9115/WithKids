import Attandance from "./Attandance";
import SearchBox from "../../hooks/searchbox/SearchBox";
import { useState } from "react";

import './AttandanceMangement.css'
import { att_mng } from "../../hooks/searchbox/searchData";

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

}

export default AttandanceMangement;