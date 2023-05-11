import './LineItem.css';

export default function LineItem({ specificClass, isPaid, goToDetails, specificDate }) {
  let bookingDate = new Date(specificDate)
  let month = bookingDate.getUTCMonth() + 1; 
  let day = bookingDate.getUTCDate();
  let year = bookingDate.getUTCFullYear();

  let newdate = year + "/" + month + "/" + day;
  return (
    <div className="LineItem">
      <div className='firstRowLineItem'>
        <button className='notBtn' onClick={goToDetails}>{specificClass.name}</button>
        <span> by {specificClass.username}</span>
      </div>
      <div className='secondRowLineItem'>
      <span className='somePadding'>{newdate}</span>
        <span>${specificClass.price.toFixed(2)}</span>
      </div>
    </div>
  );
}