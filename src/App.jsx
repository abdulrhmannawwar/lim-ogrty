import { useState } from "react";
import "./App.css";
import EditableText from "./EditableText";

function App() {
    const [passengers, setPassengers] = useState([
        { name: "الراكب 1", moneyToPay: "", from: "", moneyLeft: 0 },
    ]);
    const [passengersLength, setPassengersLength] = useState("");
    const [ogra, setOgra] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState("");
    const [totalDriverFare, setTotalDriverFare] = useState(0);

    const addPassenger = () => {
        const newPassenger = {
            name: `الراكب ${passengers.length + 1}`,
            moneyToPay: "",
            from: "",
            moneyLeft: 0,
        };
        setPassengers([...passengers, newPassenger]);
        //console.log(passengers);
    };

    const calculate = () => {
        if (ogra === "") {
            setError("لازم تدخل أجرة الفرد");
            return;
        }
        setError("");

        passengers.forEach((passenger) => {
            passenger.moneyLeft = passenger.from - passenger.moneyToPay * ogra;
        });

        const totalFare = ogra * passengersLength;
        setTotalDriverFare(totalFare);

        setPassengers([...passengers]);
        setShowResults(true);
        //console.log(passengers);
    };

    return (
        <>
            <div className="container">
                <div className="logo">
                    <span className="logo-1st">لم</span>{" "}
                    <span className="logo-2nd">أجرتي</span>
                    <div className="author">by Abdo Nawwar</div>
                </div>
                <div className="instructions">
                    طريقة استخدام الموقع : <br />
                    هتدخل أجرة السواق للفرد و بعدين تدخل عدد الركاب ( مش ضروري
                    عادي ) و بعدين هتدخل كل فرد دفع كام من كام, ( مثلا : محمد
                    دفع 3 أشخاص من 20 و الأجرة 3 جنيه, كدا باقي محمد 11 جنيه ) و
                    على حسب عدد الأشخاص اللي معاك تقدر تضيف ركاب و تحسبلهم
                </div>
                <div className="calcArea">
                    <div className="ogra rtl">
                        أجرة السواق للفرد :
                        <input
                            type="number"
                            className="ograInput input"
                            value={ogra}
                            onChange={(e) => {
                                setOgra(+e.target.value);
                                //console.log(e.target.value);
                            }}
                        />
                    </div>
                    <div className="passengersLength rtl">
                        عدد الركاب الكلي :
                        <input
                            type="number"
                            className="numberOfPassengers input"
                            value={passengersLength}
                            onChange={(e) => {
                                setPassengersLength(+e.target.value);
                                //console.log(e.target.value);
                            }}
                        />
                    </div>
                    <div className="passengers">
                        <button className="addPassenger" onClick={addPassenger}>
                            ضيف راكب
                        </button>
                        <div style={{ fontSize: "15px", color: "#b3b2b2" }}>
                            (ممكن تدوس على أسماء الركاب عشان تغيرهم)
                        </div>
                        {passengers.map((passenger, index) => (
                            <div className="passenger" key={index}>
                                <EditableText
                                    name={passenger.name}
                                    onChangeName={(newName) => {
                                        const newPassengers = [...passengers];
                                        newPassengers[index].name = newName;
                                        setPassengers(newPassengers);
                                        //console.log(newPassengers);
                                    }}
                                />

                                <div className="passengerInfo">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        دفع كام واحد
                                    </div>
                                    <input
                                        type="number"
                                        className="input"
                                        value={passenger.moneyToPay}
                                        onChange={(e) => {
                                            const newPassengers = [
                                                ...passengers,
                                            ];
                                            newPassengers[index].moneyToPay =
                                                e.target.value;
                                            setPassengers(newPassengers);
                                        }}
                                    />
                                    من
                                    <input
                                        type="number"
                                        className="input"
                                        value={passenger.from}
                                        onChange={(e) => {
                                            const newPassengers = [
                                                ...passengers,
                                            ];
                                            newPassengers[index].from =
                                                e.target.value;
                                            setPassengers(newPassengers);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {error && <div style={{ color: "red" }}>{error}</div>}

                    <div className="moneyLeft">
                        <button className="calculate" onClick={calculate}>
                            احسب الاجرة
                        </button>
                        {showResults && passengersLength && (
                            <div className="totalFare">
                                الاجرة الكلية للسواق : {totalDriverFare} جنيه
                            </div>
                        )}
                        {showResults && (
                            <div>
                                {passengers.map((passenger, index) => (
                                    <div className="passenger" key={index}>
                                        {passenger.name}{" "}
                                        {passenger.moneyLeft >= 0
                                            ? "له"
                                            : "عليه"}{" "}
                                        : {""}
                                        {passenger.moneyLeft >= 0
                                            ? passenger.moneyLeft
                                            : -passenger.moneyLeft}{" "}
                                        جنيه
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
