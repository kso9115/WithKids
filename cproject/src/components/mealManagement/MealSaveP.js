import { useEffect, useState, useCallback } from "react";


function MealSaveP (mealData){
    const[mealDataO, setMemDataO] = useState({});
    useEffect(() => {
        setMemDataO({
            ...mealData
        });
    }, []);
    console.log(mealDataO);

    

    return (
        <div>
            <div>
                <div>아동식별번호</div>
                <div><input type='text' value={mealDataO.memSerial} disabled/></div> 

                <div>이름</div>
                <div><input type='text' value={mealDataO.memName} disabled/></div> 

                <div>입력 날짜</div>
                <div><input id ="MealDate" name="MealDate" type="date" /></div> 

                <div>조식</div>
                <div><input type="radio" id="brfMeal" name="brfMeal" value={1} checked={mealDataO.brfMeal===1} onChange={onRChange}/><label htmlFor=''>Y</label>  &nbsp;
                    <input type="radio" id="brfMeal" name="brfMeal" value={0} checked={mealDataO.brfMeal===0} onChange={onRChange}/><label htmlFor=''>N</label>
                </div>

                <div>중식</div>
                <div><input type="radio" id="lncfMeal" name="lncfMeal" value={1} checked={mealDataO.lncfMeal===1} onChange={onRChange}/><label htmlFor=''>Y</label>  &nbsp;
                    <input type="radio" id="lncfMeal" name="lncfMeal" value={0} checked={mealDataO.lncfMeal===1} onChange={onRChange}/><label htmlFor=''>N</label>
                </div>

                <div>석식</div>
                <div><input type="radio" id="dnrfMeal" name="dnrfMeal" value={1} checked={mealDataO.dnrfMeal===1} onChange={onRChange}/><label htmlFor=''>Y</label>  &nbsp;
                    <input type="radio" id="dnrfMeal" name="dnrfMeal" value={0} checked={mealDataO.dnrfMeal===1} onChange={onRChange}/><label htmlFor=''>N</label>
                </div>

                <div>간식</div>
                <div><input type="radio" id="snkfMeal" name="snkfMeal" value={1} checked={mealDataO.snkfMeal===1} onChange={onRChange}/><label htmlFor=''>Y</label>  &nbsp;
                    <input type="radio" id="snkfMeal" name="snkfMeal" value={0} checked={mealDataO.snkfMeal===1} onChange={onRChange}/><label htmlFor=''>N</label>
                </div>
            </div>
            <div>

            </div>




        </div>

        
    )
}

export default MealSaveP;