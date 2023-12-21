import React, { useState, useEffect } from 'react'
import './App.css';



export default function App() {

  const [data, setData] = useState({
    current: "",
    final: "",
    operator: "",
    prevNum: "",
    prevOp: "",
    history: 0,
    list: []
  })

  useEffect(() => {
    setData(prev => ({
      ...prev,
      final: 0,
      prevNum: "",
      current: "",
      history: "",
      list: []
    }))
  }, []

  )

  const handleClear = (e) => {
    if (e.target.innerText === "AC") {
      setData(prev => ({
        ...prev,
        current: "",
        final: 0,
        prevNum: "",
        operator: "",
        history: "",
        list: prev.list
      }))
    }

  }
  const handleOpp = (e) => {

    if (data.operator) {
      console.log(data, "top if")
      setData(prev => ({
        ...prev,
        current: "",
        operator: e.target.innerText,
        prevNum: prev.current,
        history: prev.history + e.target.innerText,
        prevOp: data.operator

      }))
      if (data.operator && data.prevNum && data.current) {
        if (data.operator === '+') {
          setData(prev => ({
            ...prev,
            current: parseFloat(data.prevNum) + parseFloat(data.current),
            operator: e.target.innerText,
            final: parseFloat(data.prevNum) + parseFloat(data.current),
            prevNum: "",
            history: data.history + e.target.innerText
          }))
        }
        if (data.operator === '*') {
          setData(prev => ({
            ...prev,
            current: parseFloat(data.prevNum) * parseFloat(data.current),
            operator: e.target.innerText,
            final: parseFloat(data.prevNum) * parseFloat(data.current),
            prevNum: "",
            history: data.history + e.target.innerText,
          }))
        } if (data.operator === '/') {
          setData(prev => ({
            ...prev,
            current: parseFloat(data.prevNum) / parseFloat(data.current),
            operator: e.target.innerText,
            final: parseFloat(data.prevNum) / parseFloat(data.current),
            prevNum: "",
            history: data.history + e.target.innerText
          }))
        }
        if (data.operator === '-') {
          console.log(e)
          setData(prev => ({
            ...prev,
            current: parseFloat(data.prevNum) - parseFloat(data.current),
            operator: e.target.innerText,
            final: parseFloat(data.prevNum) - parseFloat(data.current),
            prevNum: "",
            history: data.history + e.target.innerText
          }))
        }
      }
    }
    else if (data.final && !data.operator && !data.current && !data.prevNum) {
      console.log( e)
      setData(prev => ({
        ...prev,
        current: prev.final,
        prevNum: "",
        operator: e.target.innerText,
        final: "",
        history: data.final + e.target.innerText
      }))
    } else {
      console.log( e)
      setData(prev => ({
        ...prev,
        operator: e.target.innerText,
        prevNum: "",
        current: prev.current,
        final: "",
        history: prev.history + e.target.innerText
      }))
    }
  }


  const handleDeci = (e) => {

    if (!data.current.includes('.')) {
      setData(prev => ({
        ...prev,
        current: prev.current + e.target.innerText,
        final: "",
        history: prev.history + e.target.innerText
      }))
    }
  }



  const handleNum = (e) => {
    let pat = /[0-9]/
    if (e.target.innerText.match(pat)) {
      setData(prev => ({
        ...prev,
        current: prev.current + e.target.innerText,
        final: "",
        history: data.history ? prev.history + e.target.innerText : e.target.innerText
      }))
    }
    if (data.current && data.history && data.operator) {
      setData(prev => ({
        ...prev,
        prevNum: prev.prevNum + e.target.innerText
      }))
    }
    if (e.target.innerText.match(pat) && data.current && data.operator && data.prevNum) {
      setData(prev => ({
        ...prev,
        current: data.current + e.target.innerText,
        final: "",
        prevNum: data.prevNum,
        operator: data.operator,
        history: prev.history
      }))
    } else if (data.operator && data.current) {
      setData(prev => ({
        ...prev,
        current: e.target.innerText,
        prevNum: data.current,
        operator: data.operator,
        history: prev.history
      }))
    }
  }

  const handleComp = (e) => {
    if (e.target.innerText === "=") {
      if (data.operator === "+" && data.current && data.prevNum) {
        setData(prev => ({
          ...prev,
          current: parseFloat(data.prevNum) + parseFloat(data.current),
          operator: e.target.innerText,
          final: parseFloat(data.prevNum) + parseFloat(data.current),
          prevNum: "",
          history: data.history + e.target.innerText,
          list: [...prev.list, { operation: `${data.current} + ${data.prevNum}` }],
          result: parseFloat(data.prevNum) + parseFloat(data.current)
        }))
      }
    }
  }



  const handleEqual = (e) => {
 
    switch (data.operator) {
      case "AC":
        handleClear(e);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNum(e);
        break;
      case "/":
        setData({
          final: (parseFloat(data.prevNum) / parseFloat(data.current)).toFixed(1),
          operator: "",
          prevNum: "",
          current: "",
          history: ""
        })
        break;
      case "*":
        setData({
          final: (parseFloat(data.prevNum) * parseFloat(data.current)),
          operator: "",
          prevNum: "",
          current: "",
          history: ""
        })
        break;
      case "+":
        setData({
          final: (parseFloat(data.prevNum) + parseFloat(data.current)),
          operator: "",
          prevNum: "",
          current: "",
          history: ""
        })
        break;
      case "-":
        console.log("hitting case -")
        console.log("prevNum", data.prevNum)
        console.log("current", data.current)
        setData({
          final: (parseFloat(data.prevNum) - parseFloat(data.current)),
          operator: "",
          prevNum: "",
          current: "",
          history: ""
        })
        handleOpp(e)
        break;
      case ".":
        handleDeci(e);
        break;
      case "=":
        handleComp(e);
        break;
      default:
    }
  }

  // const input = (e) => {
  //   setData({ current: e.target.value })
  // }

  // const open = (e) => {
  //   let sib = e.target.previousSibling
  //   sib.style.widh = "250px"
  // }

  // const Close = (e) => {
  //   let parent = e.target.parentElement
  //   parent.style.width = "0px"
  // }











  return (
    <div>
      
      <div id="main" >
        <div id="display">{data.history}
          <div id="display1">{data.final}</div>
        </div>

        <div id="bottom">
          <button id="zero" value={0} className="flex num" onClick={(e) => handleNum(e)}>0</button>


          <button id="one" value={1} name="1" className="flex num" onClick={(e) => handleNum(e)}>1</button>

          <button id="two" value={2} className="flex num" onClick={(e) => handleNum(e)}>2</button>

          <button id="three" value={3} className="flex num" onClick={(e) => handleNum(e)}>3</button>

          <button id="four" value={4} className="flex num" onClick={(e) => handleNum(e)}>4</button>

          <button id="five" value={5} className="flex num" onClick={(e) => handleNum(e)}>5</button>

          <button id="six" value={6} className="flex num" onClick={(e) => handleNum(e)}>6</button>

          <button id="seven" value={7} className="flex num" onClick={(e) => handleNum(e)}>7</button>

          <button id="eight" value={8} className="flex num" onClick={(e) => handleNum(e)}>8</button>

          <button id="nine" value={9} className="flex num" onClick={(e) => handleNum(e)}>9</button>

          <button id="add" value="+" className="flex operator" onClick={(e) => handleOpp(e)}>+</button>

          <button id="subtract" value="-" className="flex operator" onClick={(e) => handleOpp(e)}>-</button>

          <button id="multiply" value="*" className="flex operator" onClick={(e) => handleOpp(e)}>*</button>

          <button id="divide" value="/" className="flex operator" onClick={(e) => handleOpp(e)}>/</button>

          <button id="decimal" value="." className="flex dot" onClick={(e) => handleDeci(e)}>.</button>

          <button id="clear" value="AC" className="flex ac" onClick={(e) => handleClear(e)}>AC</button>

          <button id="equals" value="=" className="flex result" onClick={(e) => handleEqual(e)}>=</button>



        </div>
      </div>
    </div>
  );
}


