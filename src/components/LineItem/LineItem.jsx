import './LineItem.css';

export default function LineItem({ specificClass, isPaid, goToDetails, specificDate }) {
  console.log(specificDate)
  return (
    <div className="LineItem">
      <div className='firstRowLineItem'>
        <button className='notBtn' onClick={goToDetails}>{specificClass.name}</button>
        <span> by {specificClass.username}</span>
      </div>
      <div className='secondRowLineItem'>
      <span>{specificDate.toString()}</span>
        <span>${specificClass.price.toFixed(2)}</span>
      </div>
    </div>
  );
}