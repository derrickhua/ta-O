import './LineItem.css';

export default function LineItem({ specificClass, isPaid }) {
  console.log(specificClass)
  return (
    <div className="LineItem">
      <div>
        <span>{specificClass.name}</span>
        <span>{specificClass.price.toFixed(2)}</span>
        <span>{specificClass.buyer && specificClass.buyer.toString()}</span>
      </div>
    </div>
  );
}