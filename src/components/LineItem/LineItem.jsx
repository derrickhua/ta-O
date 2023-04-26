import './LineItem.css';

export default function LineItem({ specificClass, isPaid }) {
  console.log(specificClass)
  return (
    <div className="LineItem">
      <div>
        <span>{specificClass.name}&nbsp;&nbsp;</span>
        <span>{specificClass.price.toFixed(2)}</span>
      </div>
    </div>
  );
}