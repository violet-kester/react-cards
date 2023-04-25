/** Component for Button
 * 
 * Props:
 * - handleClick function, message for button
 * 
 * State:
 * - none
 * 
 * CardGame -> Button
 */

function Button({ handleClick, message }) {

  return (
    <button onClick={handleClick}>{message}</button>
  );
}

export default Button;