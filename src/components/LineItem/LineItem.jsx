import './LineItem.css';

export default function LineItem({ specificClass, isPaid, goToDetails }) {
  console.log(specificClass)
  return (
    <div className="LineItem">
      <div className='firstRowLineItem'>
        <span>
          <button className='notBtn' onClick={goToDetails}>{specificClass.name}</button>
        </span>
        <span> by {specificClass.username}</span>
      </div>
      <div className='secondRowLineItem'>
        <span>{specificClass.price.toFixed(2)}</span>
      </div>
    </div>
  );
}