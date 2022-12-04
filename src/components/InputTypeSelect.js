import "../App.css";

function InputTypeSelect(props) {
    return (
        <div className="InputTypeSelect">
            <form>
                <p>Please select your input type:</p>
                <input type="radio" id="origin" name="Origin" value="origin" />
                <label htmlFor="origin">Origin</label><br></br>

                <input type="radio" id="destination" name="Destination" value="destination" />
                <label htmlFor="destination">Destination</label><br></br>
                
                <input type="radio" id="obstacle" name="Obstacle" value="obstacle" />
                <label htmlFor="obstacle">Obstacle</label><br></br>
            </form>
        </div>
    );
}

export default InputTypeSelect;