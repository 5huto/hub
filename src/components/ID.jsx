import React from 'react'

// type Props = {
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

const ID = (props) => {
  return (
    <div>
      <label style={{ display: "block" }}>
        {props.label}
        <input
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

export default ID

// import React from 'react'

// export const ID = (props: Props) => {
//     const [value, setValue] = React.useState("");
//   return (
//     <div>
//         <label style={{ display: "block" }}>
//           {`${props.label} `} 
//             <input
//               value={value}
//               onChange={event => setValue(event.target.value)} />
//         </label>
//     </div>
//   )
// }

// export default ID