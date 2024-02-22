import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PurchaseProcess() {
  return (
    <section className='purchase-process-section'>
      <div className='container'>
        <div className='purchase-process-inner'>
          <div className='purchase-process-step'>
            <div className='purchase-process-step-icon'>
              <FontAwesomeIcon icon='box-open' className='icon' />
            </div>
            <div className='purchase-process-step-body'>
              <h3>Search your products</h3>
              <p>Choose from our catalog of more than 1000 products.</p>
            </div>
          </div>
          <div className='purchase-process-step'>
            <div className='purchase-process-step-icon'>
              <FontAwesomeIcon icon='credit-card' className='icon' />
            </div>
            <div className='purchase-process-step-body'>
              <h3>Choose your payment method</h3>
              <p>
                Pay securely with a card through Mercado Pago, PSE, or cash on
                delivery.
              </p>
            </div>
          </div>
          <div className='purchase-process-step'>
            <div className='purchase-process-step-icon'>
              <FontAwesomeIcon icon='truck-fast' className='icon' />
            </div>
            <div className='purchase-process-step-body'>
              <h3>Receive your order without delay</h3>
              <p>
                Receive your order in record time! Free shipping on orders of
                more than 200 thousand COP.
              </p>
            </div>
          </div>
          <div className='purchase-process-step'>
            <div className='purchase-process-step-icon'>
              <FontAwesomeIcon icon='shield' className='icon' />
            </div>
            <div className='purchase-process-step-body'>
              <h3>Protect your purchase</h3>
              <p>
                Are you not satisfied? Return it! The Jelt 360 guarantee
                guarantees your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
