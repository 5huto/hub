import React from 'react'

// type Props = {
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

const Pass = (props) => {
  return (
    <div>
      <label style={{ display: "block" }}>
        {props.label}
        <input
          type="password"  //伏字になる
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

export default Pass

// import React from 'react'

// const Pass = (props: Props) => {
//   const [value, setValue] = React.useState("");
//   return (
//     <div>
//       <label style={{ display: "block" }}>
//           {`${props.label} `} 
//             <input
//               value={value}
//               onChange={event => setValue(event.target.value)} />
//         </label>
//     </div>
//   )
// }

// export default Pass