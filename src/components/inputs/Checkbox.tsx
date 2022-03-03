import React from "react";
import styled from "@emotion/styled";

const StyledCheckbox = styled.div`
  label {
    display: flex;
    flex-direction: row-reverse;
    p {
      margin-top: 0;
    }
  }
`;
type CheckboxT = {
   onChangeMethod: any, 
   label: string, 
   name: string, 
   key: number, 
   [x:string]: any
}
const Checkbox = ({ onChangeMethod, label, name, key, ...props }: CheckboxT) => (
  <StyledCheckbox>
    <label key={key}>
      <p>{label}</p>
      <input type="checkbox" onChange={onChangeMethod} name={name} {...props} />
    </label>
  </StyledCheckbox>
);

export default Checkbox;
