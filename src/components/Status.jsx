import React,{useState} from 'react'

const Status = (props) => {
  const sel = ["未処理",  "警告", "撤去完了", "自転車無し"]
  const [txt, setTxt] = useState(sel[0])
  function method(data){
    setTxt(data)
  }
  return (
    <div>
      <select
      onChange ={(e) => method(e.target.value)}
      value={txt}>
        {sel.map((data, index) => {
          return<option key={index} value={data}>{index+1}.{data}</option>
        })}
      </select>
    </div>
  )
}

export default Status